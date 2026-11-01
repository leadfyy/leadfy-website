import {createHash} from "node:crypto";
import {NextRequest,NextResponse} from "next/server";
export const runtime="nodejs";
const WINDOW_MS=15*60*1000;
const MAX_REQUESTS=3;
const rateLimits=new Map<string,{count:number;resetAt:number}>();
function clean(value:unknown,max:number){return typeof value==="string"?Array.from(value).filter(char=>{const code=char.charCodeAt(0);return code>=32&&code!==127;}).join("").trim().slice(0,max):"";}
function escapeHtml(value:string){const entities:Record<string,string>={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return value.replace(/[&<>"']/g,char=>entities[char]??char);}
export async function POST(request:NextRequest){
 const apiKey=process.env.RESEND_API_KEY;
 const recipient=process.env.LEAD_NOTIFICATION_EMAIL;
 const sender=process.env.LEAD_FROM_EMAIL;
 if(!apiKey||!recipient||!sender)return NextResponse.json({error:"Az ajánlatkérő űrlap e-mail-küldése jelenleg nem aktív."},{status:503,headers:{"Cache-Control":"no-store"}});
 const contentLength=Number(request.headers.get("content-length")||0);
 if(contentLength>20000)return NextResponse.json({error:"A beküldött adatok túl nagyok."},{status:413});
 const data=await request.json().catch(()=>null) as Record<string,unknown>|null;
 if(!data)return NextResponse.json({error:"Érvénytelen beküldés."},{status:400});
 if(clean(data.honeypot,200))return NextResponse.json({error:"Érvénytelen beküldés."},{status:400});
 const name=clean(data.name,80),company=clean(data.company,120),email=clean(data.email,254);
 const serviceArea=clean(data.serviceArea,120),priorityService=clean(data.priorityService,120);
 const phone=clean(data.phone,40),website=clean(data.website,200),message=clean(data.message,1200);
 const submissionId=clean(data.submissionId,64);
 const validEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 const validId=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId);
 if(name.length<2||company.length<2||!validEmail||serviceArea.length<2||priorityService.length<2||data.privacyAccepted!==true||!validId)
  return NextResponse.json({error:"Kérjük, ellenőrizd a kötelező mezőket és az adatkezelési tájékoztató elfogadását."},{status:400});
 const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||request.headers.get("x-real-ip")||"unknown";
 const key=createHash("sha256").update(ip).digest("hex");
 const now=Date.now();
 for(const [k,v] of rateLimits)if(v.resetAt<=now)rateLimits.delete(k);
 const current=rateLimits.get(key);
 if(current&&current.resetAt>now&&current.count>=MAX_REQUESTS)return NextResponse.json({error:"Rövid időn belül túl sok beküldés érkezett. Kérjük, próbáld újra később."},{status:429,headers:{"Retry-After":String(Math.ceil((current.resetAt-now)/1000))}});
 rateLimits.set(key,current&&current.resetAt>now?{count:current.count+1,resetAt:current.resetAt}:{count:1,resetAt:now+WINDOW_MS});
 const rows=[["Név",name],["Cég",company],["E-mail",email],["Szolgáltatási terület",serviceArea],["Kiemelt szolgáltatás",priorityService],["Telefon",phone||"—"],["Weboldal / profil",website||"—"],["Üzenet",message||"—"],["Adatkezelési tájékoztató elfogadva","Igen"]];
 const html="<h2>Új Leadfy pilot megkeresés</h2><table>"+rows.map(([label,value])=>"<tr><th align=\"left\" style=\"padding:6px 12px 6px 0\">"+label+"</th><td style=\"padding:6px 0\">"+escapeHtml(value)+"</td></tr>").join("")+"</table>";
 const textBody=rows.map(([label,value])=>label+": "+value).join("\n");
 try{
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+apiKey,"Content-Type":"application/json","Idempotency-Key":submissionId},body:JSON.stringify({from:sender,to:[recipient],reply_to:email,subject:"Új Leadfy pilot megkeresés – "+company,html,text:textBody}),cache:"no-store",signal:AbortSignal.timeout(12000)});
  if(!response.ok)return NextResponse.json({error:"A megkeresést most nem sikerült továbbítani. Kérjük, próbáld újra később."},{status:502,headers:{"Cache-Control":"no-store"}});
  return NextResponse.json({ok:true},{status:200,headers:{"Cache-Control":"no-store"}});
 }catch{
  return NextResponse.json({error:"A levelezőszolgáltatás átmenetileg nem érhető el. Kérjük, próbáld újra később."},{status:502,headers:{"Cache-Control":"no-store"}});
 }
}
