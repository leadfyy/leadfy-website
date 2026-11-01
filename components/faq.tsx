"use client";
import {useState} from "react";
const items=[
 ["Futtattok fizetett hirdetéseket?","Nem. Ez a szolgáltatás az organikus Instagram- és Facebook-tartalmak készítésére összpontosít. Fizetett hirdetéskezelés és médiaköltés nem része a pilotnak."],
 ["Professzionális videókat kell forgatnunk?","Nem. Egy telefonnal készült, jól látható és használható felvétel is elegendő lehet. A lényeg, hogy valódi munkát mutasson be."],
 ["Ki biztosítja a fotókat és videókat?","A vállalkozás küldi a saját, valódi projektjeiről készült anyagokat és az alapvető műszaki információkat. A Leadfy ezekből készíti el a tartalmakat."],
 ["Jóvá kell hagynunk a posztokat?","Igen. A tartalmak publikálás előtt jóváhagyásra kerülnek. A műszaki állításokat a vállalkozás ellenőrzi."],
 ["Garantáltok ajánlatkéréseket?","Nem vállalunk fix számú érdeklődőt vagy értékesítést. A vállalás az egyeztetett tartalmak elkészítésére, publikálására és az eredmények követésére vonatkozik."],
 ["Hogyan mérjük az eredményeket?","Követhető linkekkel, releváns üzenetekkel, ajánlatkérésekkel és a vállalkozás által megosztott értékesítési visszajelzésekkel."],
 ["Ki válaszol az érdeklődőknek?","A műszaki kérdések, helyszíni felmérések, árajánlatok és értékesítési utánkövetés kezelése a HVAC-vállalkozás feladata."],
 ["Mi történik a pilot után?","Közösen áttekintjük az eredményeket, a munkaterhelést és az együttműködés üzleti illeszkedését, majd ez alapján döntünk a folytatásról."]
] as const;
export function FAQ(){const[active,setActive]=useState<number|null>(0);return <div className="faq-list">{items.map(([q,a],i)=><div className="faq-item" key={q}><button className="faq-question" type="button" aria-expanded={active===i} aria-controls={"faq-"+i} onClick={()=>setActive(active===i?null:i)}><span>{q}</span><span className="faq-plus" aria-hidden="true">{active===i?"−":"+"}</span></button>{active===i&&<div className="faq-answer" id={"faq-"+i}>{a}</div>}</div>)}</div>}
