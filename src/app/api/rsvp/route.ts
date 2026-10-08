import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const schema=z.object({
  fullName:z.string().trim().min(3).max(100),
  whatsapp:z.string().min(10).max(20),
  attending:z.enum(["sim","nao"]), hasCompanions:z.boolean(),
  companions:z.array(z.object({name:z.string().trim().min(3).max(100)})).max(20),
  dietaryRestrictions:z.string().max(1000).optional(), message:z.string().max(500).optional(),
}).refine(d=>!d.hasCompanions || d.attending==="nao" || d.companions.length>0);
export async function POST(req:NextRequest){
  const url=process.env.RSVP_GOOGLE_APPS_SCRIPT_URL;
  if(!url) return NextResponse.json({success:false,error:"A confirmação de presença estará disponível em breve."},{status:503});
  try {
    const data=schema.parse(await req.json());
    const response=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data),signal:AbortSignal.timeout(15000)});
    if(!response.ok) throw new Error("Falha ao registrar");
    const result=await response.json();
    if(result.status!=="success") throw new Error("Confirmação não registrada");
    return NextResponse.json({success:true});
  } catch(error:unknown) {
    return NextResponse.json({success:false,error:error instanceof z.ZodError ? "Confira os dados informados." : "Não foi possível registrar sua resposta. Tente novamente mais tarde."},{status:error instanceof z.ZodError ? 400 : 502});
  }
}