"use client";
import { useEffect } from "react";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Login() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    const redirectTo = process.env.NODE_ENV === "production"
      ? "https://smart-interview-assistant-eight.vercel.app"
      : "http://localhost:3000";

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });
  };

  useEffect(() => {
    const handleLogin = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Session Error:", error.message);
        return;
      }

      if (data?.session) {
        window.history.replaceState({}, document.title, window.location.pathname);
        router.push("/dashboard");
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        window.history.replaceState({}, document.title, window.location.pathname);
        router.push("/dashboard");
      }
    });

    handleLogin();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center border rounded-2xl p-8">
        <Image src="/logo.png" alt="logo" width={180} height={60} className="mb-4" />
        <Image src="/login.png" alt="login" width={400} height={250} className="rounded-2xl mb-4" />
        <h2 className="text-2xl font-bold text-center mb-2">Welcome to AiCuruiter</h2>
        <p className="text-gray-500 text-center mb-6">Sign In with Google Authentication</p>
        <Button onClick={signInWithGoogle} className="w-full">
          Login with Google
        </Button>
      </div>
    </div>
  );
}