import { Button } from "@/components/ui/button";
import moment from "moment";
import React from "react";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

function CandidatList({ detail }) {
  const calculateAverageScore = (feedback) => {
    if (typeof feedback === "string") {
      try {
        feedback = JSON.parse(feedback);
      } catch {
        return "N/A";
      }
    }
    const rating = feedback?.rating;
    const scores = [
      rating?.technicalSkills,
      rating?.communication,
      rating?.problemSolving,
      rating?.experience,
    ];
    const validScores = scores.filter((score) => typeof score === "number");
    return validScores.length
      ? (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(1)
      : "N/A";
  };

  return (
    <div>
      <h2 className="font-bold my-5">Candidates ({detail?.length})</h2>
      {detail?.length === 0 && <p className="text-sm text-gray-500">No candidates found.</p>}
      {detail?.map((candidate, index) => {
        const averageScore = calculateAverageScore(candidate?.feedback?.feedback);
        const scoreColor =
          averageScore === "N/A"
            ? "text-gray-400"
            : parseFloat(averageScore) >= 7
            ? "text-green-700"
            : "text-red-600";

        return (
          <div
            key={index}
            className="p-5 flex gap-3 items-center bg-white rounded-lg justify-between"
          >
            <div className="flex items-center gap-5">
              <h2 className="bg-primary p-3 px-4.5 font-bold text-white rounded-full">
                {candidate.userName?.[0] || "?"}
              </h2>
              <div>
                <h2 className="font-bold">{candidate?.userName}</h2>
                <h2 className="text-sm text-gray-500">
                  Completed On: {moment(candidate?.created_at).format("MMM DD yyyy")}
                </h2>
              </div>
            </div>
            <div className="flex gap-3">
              <h2 className={`${scoreColor}`}>{averageScore}/10</h2>
              <CandidateFeedbackDialog candidate={candidate} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CandidatList;
