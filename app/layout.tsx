import type { Metadata, Viewport } from "next";
import "./globals.css";
const siteUrl=process.env.NEXT_PUBLIC_SITE_URL;
export const metadata:Metadata={title:"Leadfy – Valódi munkából hasznos közösségi tartalom",description:"Instagram- és Facebook-tartalom klímaszerelő és HVAC-vállalkozásoknak. Valódi munkákból, szakmai tudásból és ügyfélkérdésekből.",applicationName:"Leadfy",metadataBase:siteUrl?new URL(siteUrl):undefined,openGraph:{type:"website",locale:"hu_HU",siteName:"Leadfy",title:"Leadfy – Mutasd meg a munkád. Építs bizalmat.",description:"Organikus Instagram- és Facebook-tartalom HVAC-vállalkozásoknak."},robots:{index:false,follow:false,googleBot:{index:false,follow:false}}};
export const viewport:Viewport={themeColor:"#142B46",colorScheme:"light"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="hu"><body>{children}</body></html>}
