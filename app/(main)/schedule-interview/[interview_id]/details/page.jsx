"use client"
import WelcomeContainer from "@/app/(main)/dashboard/_components/WelcomeContainer";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";
import CandidatList from "./_components/CandidatList";

function InterviewDetail() {
  const [InterviewDetail, setInterviewDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { interview_id } = useParams(); // 👈 dynamic route param

  useEffect(() => {
    if (interview_id) {
      GetInterviewDetail();
    }
  }, [interview_id]);

  const GetInterviewDetail = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('interviews')
      .select(`
        jobPosition,
        jobDescription,
        InterviewDuration,
        InterviewType,
        interview_id,
        questionList,
        created_at,
        interview-feedback(
          userName,
          userEmail,
          feedback
          )
      `)
      .eq('interview_id', interview_id) // 👈 filter by ID
      .single(); // get only one row

      if (error) {
        console.error("Error fetching interview:", error);
      } else {
        console.log("Fetched Interview Detail:", data); // 👈 Log to console
        setInterviewDetail(data);
      }
      setLoading(false);
  };

  return (
    <div>
      <div className="mb-5">
        <WelcomeContainer />
      </div>
      <h2 className="font-bold text-2xl">Interview Details</h2>
      {!loading && InterviewDetail ? (
        <InterviewDetailContainer InterviewDetail={InterviewDetail} />
      ) : (
        <p className="text-gray-500 mt-3">Loading interview details...</p>
      )}
      <CandidatList detail={InterviewDetail?.['interview-feedback']}/>
    </div>
  );
}

export default InterviewDetail;
