import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from '@/services/Constants';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

function FormContainer({ onHandleInputChange, GoToNext }) {
  const [interviewType, setInterviewType] = useState([]);

  useEffect(() => {
    if (interviewType.length > 0) {
      onHandleInputChange('interviewType', interviewType);
    }
  }, [interviewType]);

  const AddInterviewType = (type) => {
    const alreadySelected = interviewType.includes(type);
    if (alreadySelected) {
      const result = interviewType.filter(item => item !== type);
      setInterviewType(result);
    } else {
      setInterviewType(prev => [...prev, type]);
    }
  };

  return (
    <div className="p-5 bg-white rounded-2xl">

      {/* Job Position */}
      <div>
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input
          placeholder="e.g. Full Stack Developer"
          className="mt-2"
          onChange={(event) => onHandleInputChange('jobPosition', event.target.value)}
        />
      </div>

      {/* Job Description */}
      <div className="mt-5">
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea
          placeholder="Enter your job details"
          className="mt-2 h-[200px]"
          onChange={(event) => onHandleInputChange('jobDescription', event.target.value)}
        />
      </div>

      {/* Interview Duration */}
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select onValueChange={(value) => onHandleInputChange('interviewDuration', value)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Min</SelectItem>
            <SelectItem value="15 Min">15 Min</SelectItem>
            <SelectItem value="30 Min">30 Min</SelectItem>
            <SelectItem value="45 Min">45 Min</SelectItem>
            <SelectItem value="60 Min">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Type</h2>
        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`flex items-center cursor-pointer gap-2 p-1 px-3 rounded-2xl border 
              border-gray-300 hover:bg-secondary transition
              ${interviewType.includes(type.title) && 'bg-blue-100 text-primary'}`}
              onClick={() => AddInterviewType(type.title)}
            >
              <type.icon className="w-4 h-4" />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-7 flex justify-end" onClick={()=>GoToNext()}>
        <Button>
          Generate Questions
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

    </div>
  );
}

export default FormContainer;
