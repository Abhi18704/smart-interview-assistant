import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Link, Send } from "lucide-react";
import moment from "moment";
import React from "react";
import { toast } from "sonner"; // Make sure this is installed and set up

function InterviewCard({ interview,viewDetail=false }) {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_id}`;
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Link copied to clipboard!");
  }
  const onSend = () => {
    const recipient = prompt("Enter recipient email:");
    if (!recipient) return;
    const subject = encodeURIComponent("AI Recruiter Interview Link");
    const body = encodeURIComponent(`Interview Link: ${url}`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };
  
  

  return (
    <div className="p-5 bg-white rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="h-[40px] w-[40px] bg-primary rounded-full" />
        <h2 className="text-sm text-gray-500">
          {moment(interview?.created_at).format("DD MMM YYYY")}
        </h2>
      </div>
      <h2 className="font-bold text-lg">{interview?.jobPosition}</h2>
      <h3 className="text-sm text-gray-700 mt-1 flex justify-between">{interview?.InterviewDuration}
        <span className="text-green-700">{interview['interview-feedback']?.length} Candidates</span>
      </h3>
      {!viewDetail ? <div className="flex gap-3 w-full mt-5">
        <Button variant="outline" onClick={copyLink}>
          <Copy className="mr-2 h-4 w-4" /> Copy
        </Button>
        <Button onClick={onSend}>
          <Send className="mr-2 h-4 w-4" /> Send
        </Button>
      </div>
        :
        <a href={'/schedule-interview/'+interview?.interview_id+"/details"}>
        <Button className="mt-5 w-full" variant={'outline'}>View Details<ArrowRight/></Button>
        </a>
        }
    </div>
  );
}

export default InterviewCard;
