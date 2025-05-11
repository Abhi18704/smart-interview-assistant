"use client";

import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Loader2Icon, Mic, Phone, Timer } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
import TimerComponent from "./_components/TimerComponent";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState([]); // Initialize as array to accumulate messages
  const { interview_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (interviewInfo) {
      startCall();
    }
  }, [interviewInfo]);

  const startCall = () => {
    // Properly format question list
    const questionList = interviewInfo?.interviewData?.questionList
      ?.map((item) => item?.question)
      .filter(Boolean)
      .join(", ");

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPostion}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
              You are an AI voice assistant conducting interviews.
              Your job is to ask candidates provided interview questions and assess their responses.
              Begin with a friendly introduction, setting a relaxed yet professional tone.
              Example: "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPostion} interview. Let’s get started!"
              Ask one question at a time and wait for the candidate’s response.
              Questions: ${questionList}
              If the candidate struggles, offer hints or rephrase without giving the answer.
              Example: "Need a hint? Think about how React tracks component updates!"
              Provide brief, encouraging feedback after each answer.
              Example: "Nice! That’s a solid answer." or "Hmm, not quite! Want to try again?"
              Keep the conversation natural with phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
              After 5–7 questions, wrap up smoothly by summarizing performance.
              Example: "That was great! You handled some tough questions well. Keep sharpening your skills!"
              End positively: "Thanks for chatting! Hope to see you crushing projects soon!"
              ✅ Key Guidelines:
              ✅ Be friendly, engaging, and witty
              ✅ Keep responses short and natural
              ✅ Adapt based on candidate’s confidence
              ✅ Focus on React
            `.trim(),
          },
        ],
      },
    };
    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    setLoading(true);
    vapi.stop();
    GenerateFeedback();
    //setCallEnd(true);
  };

  
  useEffect(()=>{
    const handleMessage=(message)=>{
      console.log('Message:',message);
      if(message?.conversation)
      {
        const convoString=JSON.stringify(message.conversation);
        console.log('conversation string:',convoString);
        setConversation(convoString);
      }
    };
    vapi.on("message",handleMessage);
    // VAPI event handlers
  vapi.on("call-start", () => {
    console.log("Call has started.");
    toast("Call connected...");
  });

  vapi.on("speech-start", () => {
    console.log("Assistant speech has started.");
    setActiveUser(false);
  });

  vapi.on("speech-end", () => {
    console.log("Assistant speech has ended.");
    setActiveUser(true);
  });

  vapi.on("call-end", () => {
    console.log("Call has ended.");
    toast("Interview Ended...");
    GenerateFeedback();
  });
    return ()=>{
      vapi.off("message",handleMessage);
      vapi.off('call-start',()=>console.log('end'));
      vapi.off('speech-start',()=>console.log('end'));
      vapi.off('speech-end',()=>console.log('end'));
      vapi.off('call-end',()=>console.log('end'));

    };
  },[]);

  const GenerateFeedback = async () => {
    setLoading(true);
    console.log("Analyzing conversation:", conversation);
    if (!conversation) {
      console.warn("No conversation to analyze.");
      return;
    }
    const result = await axios.post("/api/ai-feedback", {
      conversation: conversation,
    });
console.log(result?.data);
    const content = result.data.content;
    const finalContent = content.replace('```json', '').replace('```', '');
    console.log(finalContent);

    const { data, error } = await supabase
      .from("interview-feedback")
      .insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id: interview_id,
          feedback:JSON.parse(finalContent),
          recommendation: false,
        },
      ])
      .select();

    console.log(data);
    router.replace('/interview/'+interview_id+'/completed');
    setLoading(false);
  };


  return (
    <div className="p-6 md:p-10 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between items-center mb-6">
        AI Interview Session
        <span className="flex gap-2 items-center text-gray-600 text-sm">
          <Timer className="h-4 w-4" />
          <TimerComponent start={true} />
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col items-center justify-center gap-4 shadow">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 w-[80px] h-[80px] rounded-full bg-blue-500 opacity-75 animate-ping z-0" />
            )}
            <Image
              src="/ai.jpg"
              alt="AI"
              width={120}
              height={120}
              className="w-[80px] h-[80px] rounded-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold">AI Recruiter</h2>
        </div>

        <div className="bg-white h-[400px] rounded-lg border p-6 shadow flex flex-col items-center justify-center gap-4">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 w-16 h-16 rounded-full bg-blue-500 opacity-75 animate-ping z-0" />
            )}
            <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
              {interviewInfo?.userName?.[0] || "U"}
            </div>
          </div>
          <h2 className="text-lg font-medium">{interviewInfo?.userName || "Username"}</h2>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-10">
        <Mic className="h-12 w-12 p-3 bg-gray-500 rounded-full text-white cursor-pointer" />
        {!loading ? (
          <Phone
            className="h-12 w-12 p-3 bg-red-500 rounded-full text-white cursor-pointer"
            onClick={stopInterview}
          />
        ) : (
          <Loader2Icon className="h-12 w-12 text-red-500 animate-spin" />
        )}
      </div>

      <h2 className="text-sm text-gray-400 text-center mt-5">Interview in Progress...</h2>
    </div>
  );
}

export default StartInterview;