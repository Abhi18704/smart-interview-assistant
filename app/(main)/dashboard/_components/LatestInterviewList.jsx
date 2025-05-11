"use client";
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import InterviewCard from './InterviewCard';
import { toast } from 'sonner';

function LatestInterviewList() {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetInterviewList();
  }, []);

  const GetInterviewList = async () => {
    setLoading(true);
    const { data: interviews, error } = await supabase
      .from('interviews')
      .select('*')
      .order('id', { ascending: false }) // correct spelling is "ascending"
      .limit(6);
  
    if (error) {
      console.error("Error fetching interviews:", error);
      toast.error("Failed to fetch interviews.");
    } else {
      setInterviewList(interviews);
    }
    setLoading(false);
  };

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl">Previously Created Interviews</h2>
      <div className="bg-white border mt-5 rounded-lg p-2 shadow-sm">
  {!loading && interviewList?.length === 0 && (
    <div className="p-5 flex flex-col gap-3 items-center mt-5">
      <Video className="h-10 w-10 text-primary" />
      <h2>You don't have any interview created!</h2>
      <Button onClick={() => window.location.href = '/dashboard/create-interview'}>
        + Create New Interview
      </Button>
    </div>
  )}
</div>


      {interviewList?.length > 0 && (
  <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {interviewList.map((interview, index) => (
    <InterviewCard interview={interview} key={index} />
  ))}
</div>
)}

    </div>
  );
}

export default LatestInterviewList;
