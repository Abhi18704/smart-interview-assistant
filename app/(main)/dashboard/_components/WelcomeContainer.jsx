"use client";

import { useUser } from "@/app/provider";
import React from "react";

function WelcomeContainer() {
  const user = useUser();

  return (
    <div className="bg-white p-4 rounded-2xl flex justify-center items-center shadow-md relative">
      <div className="text-center">
        <h2 className="text-lg font-semibold">
          Welcome Back {user?.name}
        </h2>
        <p className="text-sm text-gray-500">
          AI-Driven Interviews, Hassle-Free Hiring
        </p>
      </div>
      {user?.picture ? (
        <img
          src={user.picture}
          alt="User Avatar"
          width={50}
          height={50}
          className="rounded-full object-cover absolute top-4 right-4"
        />
      ) : (
        <div className="w-[50px] h-[50px] flex items-center justify-center bg-gray-200 rounded-full text-xl absolute top-4 right-4">
          👤
        </div>
      )}
    </div>
  );
}

export default WelcomeContainer;
