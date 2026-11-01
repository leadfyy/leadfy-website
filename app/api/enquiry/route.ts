import {NextResponse} from "next/server";
export async function POST(){return NextResponse.json({error:"Az ajánlatkérő űrlap jelenleg nem elérhető. Kérjük, próbáld meg később."},{status:503,headers:{"Cache-Control":"no-store"}})}
