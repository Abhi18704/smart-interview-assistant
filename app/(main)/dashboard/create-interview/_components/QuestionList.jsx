import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/services/supabaseClient';

function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState();
  const user=useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/ai-model', {
        ...formData
      });
      console.log(result.data.content);
      const content = result.data.content;
      const finalContent = content.replace('"```json','').replace('```','');
      const parsedContent = JSON.parse(finalContent);
  
      setQuestionList(parsedContent?.InterviewQuestions || parsedContent?.interviewQuestions || []);
      toast.success("Interview Questions Generated Successfully");
      setLoading(false);
    } catch (e) {
      console.error("Error in GenerateQuestionList:", e);
      //toast.error("Server error, please try again");
      setLoading(false);
    }
  };
  
  const onFinish = async () => {
    setSaveLoading(true);
  
    try {
      console.log('formData:', formData);
      console.log('questionList:', questionList);
      console.log('user:', user);
  
      if (!formData || !Array.isArray(questionList) || questionList.length === 0) {
        toast.error("Missing required data. Cannot finish!");
        setSaveLoading(false);
        return;
      }
  
      const interview_id = uuidv4();
  
      const { data, error } = await supabase
        .from('interviews')
        .insert([
          {
            jobPosition: String(formData.jobPosition || ''),
            jobDescription: String(formData.jobDescription || ''),
            InterviewDuration: String(formData.interviewDuration || ''),// left side is database name and right side is form data
            InterviewType: String(formData.interviewType || ''),
            questionList: questionList,
            // userEmail: user?.email || '', // Uncomment if you want to save email later
            interview_id: interview_id
          }
        ])
        .select();
  
      if (error) {
        console.error("Supabase Error:", error);
        toast.error("Failed to save interview");
      } else {
        console.log("Inserted data:", data);
        onCreateLink(interview_id);
        // toast.success("Interview created successfully!");
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setSaveLoading(false);
    }
  };
  
  
  

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-primary-100 flex gap-2 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI is crafting personalized questions based on your job position
            </p>
          </div>
        </div>
      )}
      {questionList?.length>0 &&
      <div>
        <QuestionListContainer questionList={questionList} />
            </div>
          }
          <div className='flex justify-end mt-10'>
            <Button onClick={()=>onFinish()} disabled={saveLoading}>
              {saveLoading && <Loader2Icon className="animate-spin" />}

              Create interview Link & Finish</Button>
          </div>
      </div>
  );
}

export default QuestionList;
