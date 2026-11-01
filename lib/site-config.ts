export const siteConfig = {
  name: "Leadfy", domain: "leadfy.hu", founder: "Adam", market: "Magyarország",
  intendedAudience: "1–10 fős, tulajdonos által vezetett HVAC-vállalkozások",
  pricing: { monthlyPilotEur: null as number | null, displayConfirmedPrice: false },
  enquiry: { enabled: false, destinationConfigured: false },
  contact: { publicEmail: null as string | null, publicPhone: null as string | null, businessAddress: null as string | null, legalName: null as string | null },
  socialContentPerMonth: 12, shortVideosPerMonth: 4,
} as const;
export const navigation = [{label:"Folyamat",href:"#folyamat"},{label:"Mit kapsz?",href:"#szolgaltatas"},{label:"Példák",href:"#mintak"},{label:"Pilot",href:"#pilot"},{label:"GYIK",href:"#gyik"}] as const;
