import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Clock, Copy, Link, List, Mail, Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { toast } from 'sonner'; // To show copy success message (optional)



function InterviewLink({ interview_id, formData }) {
  
  const GetInterviewUrl = () => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id;
    return url;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(GetInterviewUrl());
    toast.success("Link copied to clipboard!"); // Optional toast
  };

  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      <Image 
        src={'/correct.png'} 
        alt='check'
        width={50} 
        height={50} 
        className='w-[50px] h-[50px]' 
      />
      <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready</h2>
      <p className='mt-3'>Share this link with your candidates to start the interview</p>

      <div className='w-full p-7 mt-6 rounded-lg bg-white'>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold'>Interview Link</h2>
          <h2 className='p-1 px-2 text-primary bg-blue-50 rounded-xl'>Valid for 30 days</h2>
        </div>

        <div className='mt-3 flex gap-2 items-center'>
          <Input defaultValue={GetInterviewUrl()} disabled={true} />
          <Button onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" /> Copy Link
          </Button>
        </div>
        <hr className='my-5' />
        <div className='flex gap-4'>
          <h2 className='text-sm text-gray-500 felx gap-2 item-center '><Clock className='h-4 w-4' />  {formData?.interviewDuration}</h2>
          <h2 className='text-sm text-gray-500 felx gap-2 item-center '><List  className='h-4 w-4' /> 10 Questions{formData?.questionList}</h2>
        </div>
      </div>
      <div className='mt-7 bg-white p-5 rounded-lg w-full'>
      <h2 className='font-bold'>Share Via</h2>
      <div className='flex gap-7 mt-3'>
      <Button variant={'outline'} ><Mail/>E-Mail</Button>
      <Button variant={'outline'} ><Mail/>slack </Button>
      <Button variant={'outline'} ><Mail/>whatsapp</Button>
      </div>
      </div>

      <div className='flex gap-5 w-full justify-between mt-6'>
        <a href='http://localhost:3000/dashboard'>
        <Button variant={'outline'}><ArrowLeft/> Back to Dashborad</Button>
        </a>
        <a href={`/interview/${interview_id}`}>
        <Button><Plus/> Crate New interview</Button>
        </a>
      </div>

    </div>
  );
}

export default InterviewLink;
