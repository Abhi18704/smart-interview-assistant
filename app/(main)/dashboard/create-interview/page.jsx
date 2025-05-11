"use client";
import React, { useState } from 'react';
import WelcomeContainer from '../_components/WelcomeContainer';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import FormContainer from './_components/FormContainer';
import QuestionList from './_components/QuestionList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [interviewId, setInterviewId] = useState();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
    console.log("formData", formData);
  };

  const GoToNext = () => {
    if (!formData?.jobPosition || !formData?.jobDescription || !formData?.interviewDuration || !formData?.interviewType) {
      toast("Please fill all the fields");
      return;
    }
    
    setStep(step + 1);
  };
  const onCreateLink = (interview_id) => {
    setInterviewId(interview_id);
    setStep(step + 1);
  }

  return (
    <div>
      {/* Full Width Welcome */}
      <div className="w-full">
        <WelcomeContainer />
      </div>

      {/* Page Content */}
      <div className="mt-10 px-6 md:px-24 lg:px-44 xl:px-56">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-8 h-6 cursor-pointer" onClick={() => router.back()} />
          <h2 className="font-bold text-2xl">Create New Interview</h2>
        </div>
        <Progress value={step * 33.33} className='my-5' />
        {step == 1 ? <FormContainer onHandleInputChange={onHandleInputChange} GoToNext={GoToNext} /> 
        : step == 2 ? <QuestionList formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)} /> 
        : step==3?<InterviewLink interview_id={interviewId} formData={formData}/>:null}
      </div>
    </div>
  );
}

export default CreateInterview;
