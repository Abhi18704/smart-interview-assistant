import { QUESTION_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req){

    const{jobPostion,jobDescription,duration,Interviewtype}=await req.json();
    const FINAL_PROMPT= QUESTION_PROMPT.replace("{{jobTitle}}",jobPostion).replace("{{jobDescription}}",jobDescription).replace("{{duration}}",duration).replace("{{type}}",Interviewtype);
    console.log(FINAL_PROMPT);
  try{
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  })
  const completion = await openai.chat.completions.create({
    model: "microsoft/mai-ds-r1:free",
    messages: [
      { role: "user", content: FINAL_PROMPT }
    ],
  })
  
  return NextResponse.json(completion.choices[0].message)
}
catch(e){
  console.log(e)
  return NextResponse.json({error:"Something went wrong"})
}
}