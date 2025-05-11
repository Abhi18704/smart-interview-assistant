import React from "react";
import Image from "next/image";
import Link from "next/link";

function InterviewCompleted() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8 text-center overflow-hidden">

      {/* 🔙 Back To Dashboard Button */}
      <Link href="/dashboard" className="absolute top-4 right-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 shadow">
          Back To Dashboard
        </button>
      </Link>
      
      {/* ✔️ Green Tick Image */}
      <div className="mb-4">
        <Image
          src="/correct.png"
          alt="Correct"
          width={64}
          height={64}
          className="rounded-full object-contain"
        />
      </div>

      {/* Title & Subtitle */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">
        Interview Complete!
      </h1>
      <p className="text-gray-600 text-sm sm:text-base mt-3">
        Thank you for participating in the AI-driven interview with Alcruiter.
      </p>

      {/* 📷 Illustration */}
      <div className="max-w-md mb-6">
        <Image
          src="/interview-completed.jpg"
          alt="Interview Complete Illustration"
          width={200}
          height={150}
          className="rounded-lg object-cover w-full h-auto"
        />
      </div>

      {/* ℹ️ What's Next Section */}
      <div className="bg-gray-100 px-5 py-5 rounded-xl max-w-md w-full shadow-sm">
        <div className="flex justify-center mb-3">
          <div className="p-2">
          <Image
          src="/send.png"
          alt="Correct"
          width={64}
          height={64}
        />
          </div>
        </div>
        <h2 className="text-base font-bold text-gray-800 mb-1">What's Next?</h2>
        <p className="text-gray-600 text-sm">
          The recruiter will review your interview responses and will contact you soon regarding the next steps.
        </p>
        <p className="text-gray-400 text-xs mt-1">⏱ Response within 2–3 business days</p>
      </div>
    </div>
  );
}

export default InterviewCompleted;
