"use client";
import {useRef,useState,type ChangeEvent,type FormEvent} from "react";
import {useRouter} from "next/navigation";

type FormValues={name:string;company:string;email:string;serviceArea:string;priorityService:string;phone:string;website:string;message:string;privacyAccepted:boolean;websiteTrap:string};
const initial:FormValues={name:"",company:"",email:"",serviceArea:"",priorityService:"",phone:"",website:"",message:"",privacyAccepted:false,websiteTrap:""};

export function EnquiryForm({enabled}:{enabled:boolean}){
 const router=useRouter();
 const [values,setValues]=useState<FormValues>(initial);
 const [pending,setPending]=useState(false);
 const [error,setError]=useState("");
 const submissionId=useRef<string|null>(null);
 function change(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
  const target=event.target;
  const value=target.type==="checkbox"?(target as HTMLInputElement).checked:target.value;
  setValues(current=>({...current,[target.name]:value}));
  submissionId.current=null;
  if(error)setError("");
 }
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  if(!enabled||pending)return;
  setPending(true);setError("");
  const id=submissionId.current??crypto.randomUUID();
  submissionId.current=id;
  try{
   const response=await fetch("/api/enquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...values,submissionId:id,honeypot:values.websiteTrap})});
   const result=await response.json().catch(()=>({})) as {error?:string};
   if(!response.ok){setError(result.error??"Nem sikerült továbbítani a megkeresést. Kérjük, próbáld újra később.");setPending(false);return;}
   router.push("/thank-you");
  }catch{
   setError("A megkeresést most nem sikerült továbbítani. Az adataidat megtartottuk, próbáld újra.");
   setPending(false);
  }
 }
 return <div className="enquiry-panel">
  {!enabled&&<div className="form-status" role="status"><strong>Az ajánlatkérő űrlap előkészítés alatt áll.</strong><span>Az e-mail-küldés aktiválása után ezen a felületen tudod elküldeni a megkeresésedet. A mezők addig nem küldenek adatot.</span></div>}
  <form onSubmit={submit} noValidate={false}>
   <fieldset disabled={!enabled||pending}>
    <div className="form-grid">
     <div className="field"><label htmlFor="name">Név <span>*</span></label><input id="name" name="name" autoComplete="name" required minLength={2} maxLength={80} value={values.name} onChange={change} placeholder="Teljes neved"/></div>
     <div className="field"><label htmlFor="company">Cégnév <span>*</span></label><input id="company" name="company" autoComplete="organization" required minLength={2} maxLength={120} value={values.company} onChange={change} placeholder="Vállalkozás neve"/></div>
     <div className="field"><label htmlFor="email">E-mail-cím <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={change} placeholder="nev@ceg.hu"/></div>
     <div className="field"><label htmlFor="phone">Telefonszám <small>Opcionális</small></label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} value={values.phone} onChange={change} placeholder="+36 ..."/></div>
     <div className="field"><label htmlFor="serviceArea">Szolgáltatási terület <span>*</span></label><input id="serviceArea" name="serviceArea" required minLength={2} maxLength={120} value={values.serviceArea} onChange={change} placeholder="Település, megye vagy régió"/></div>
     <div className="field"><label htmlFor="priorityService">Melyik telepítést szeretnéd előtérbe helyezni? <span>*</span></label><input id="priorityService" name="priorityService" required minLength={2} maxLength={120} value={values.priorityService} onChange={change} placeholder="Például hőszivattyú, klíma"/></div>
     <div className="field field-full"><label htmlFor="website">Weboldal vagy közösségi profil <small>Opcionális</small></label><input id="website" name="website" maxLength={200} value={values.website} onChange={change} placeholder="https:// vagy @profil"/></div>
     <div className="field field-full"><label htmlFor="message">Röviden a vállalkozásodról <small>Opcionális</small></label><textarea id="message" name="message" rows={4} maxLength={1200} value={values.message} onChange={change} placeholder="Milyen munkákból szeretnél többet vállalni?"/></div>
    </div>
    <label className="privacy-consent"><input type="checkbox" name="privacyAccepted" required checked={values.privacyAccepted} onChange={change}/><span>Elolvastam az <a href="/privacy" target="_blank" rel="noreferrer">adatkezelési tájékoztatót</a>, és tudomásul vettem az ajánlatkérés kezelését. <b>*</b></span></label>
    <div className="honeypot" aria-hidden="true"><label htmlFor="websiteTrap">Ne töltsd ki ezt a mezőt</label><input id="websiteTrap" name="websiteTrap" tabIndex={-1} autoComplete="off" value={values.websiteTrap} onChange={change}/></div>
    {error&&<p className="form-error" role="alert">{error}</p>}
    <button className="btn btn-primary form-submit" type="submit" disabled={!enabled||pending}>{pending?"Küldés folyamatban…":"Beszéljünk a pilotról ↗"}</button>
    <p className="form-footnote">A *-gal jelölt mezők kitöltése kötelező. Az elküldés után Adam áttekinti a megkeresést, és egyeztet veled a pilotról.</p>
   </fieldset>
  </form>
 </div>;
}
