'use client'

import React from "react"
import WelcomeContainer from "../dashboard/_components/WelcomeContainer"
import { Button } from "@/components/ui/button"

function SignOut() {
  const handleSignOut = () => {
    window.location.href = "http://localhost:3000"
  }

  return (
    <div className="flex flex-col h-screen">
      <WelcomeContainer />
      <div className=" mt-30 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <Button
            onClick={handleSignOut}
            className="w-full text-white bg-primary hover:bg-primary/90 hover:cursor-pointer"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignOut
