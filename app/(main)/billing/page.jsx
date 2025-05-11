"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/services/supabaseClient"
import WelcomeContainer from "../dashboard/_components/WelcomeContainer"
import { Button } from "@/components/ui/button"
import { CheckIcon, IndianRupeeIcon } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: 500,
    interviews: 20,
    features: ["Basic interview templates", "Email support"],
  },
  {
    name: "Standard",
    price: 900,
    interviews: 50,
    features: [
      "All interview templates",
      "Priority support",
      "Basic analytics",
    ],
  },
  {
    name: "Pro",
    price: 2000,
    interviews: 120,
    features: ["All interview templates", "24/7 support", "Advanced analytics"],
  },
]

export default function Credits() {
  const router = useRouter()
  const [purchasedPlan, setPurchasedPlan] = useState(null)
  const [loadingPlan, setLoadingPlan] = useState(null)
  const [totalCredits, setTotalCredits] = useState(0)



  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/login")
    })
  }, [router])

  const handlePurchase = async (plan) => {
  setLoadingPlan(plan.name)

  setTimeout(() => {
    setLoadingPlan(null)
    setTotalCredits(prev => prev + plan.interviews)
    setPurchasedPlan(plan)
  }, 2000)
}


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <WelcomeContainer />
      {totalCredits > 0 && (
  <div className="w-full text-center mt-6">
    <p className="text-xl font-semibold text-green-600">
       You have {totalCredits} interview credits available.
    </p>
  </div>
)}


      <section className="flex-grow flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-5xl text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Purchase Credits
          </h1>
          <p className="text-gray-600 text-lg">
            Add more interview credits to your account
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h2>
                <div className="text-3xl font-bold text-gray-900 mb-1 flex items-center">
                  <IndianRupeeIcon className="w-5 h-5 mr-1" />
                  {plan.price}
                </div>
                <p className="text-gray-600 mb-4">
                  {plan.interviews} interviews
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckIcon className="text-blue-600 w-4 h-4 mr-2 mt-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
            onClick={() => handlePurchase(plan)}
          disabled={loadingPlan === plan.name}
        className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700"
          >
          {loadingPlan === plan.name ? "Processing..." : "Purchase Credits"}
          </Button>

            </div>
          ))}
        </div>

        {purchasedPlan && (
          <div className="mt-12 text-center bg-green-100 border border-green-300 rounded-xl p-6 shadow-sm w-full max-w-xl">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">
              Payment Successful!
            </h2>
            <p className="text-green-700">
              You have purchased the <strong>{purchasedPlan.name}</strong> plan
              with <strong>{purchasedPlan.interviews}</strong> interviews for ₹
              {purchasedPlan.price}.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
