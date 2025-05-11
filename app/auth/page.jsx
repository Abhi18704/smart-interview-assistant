"use client"
import { supabase } from '@/services/supabaseClient'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function Login() {
  const router = useRouter()

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: "https://smart-interview-assistant-eight.vercel.app/auth/callback"
      },
    });

    if (error) {
      console.error('Google Sign In Error:', error.message);
    }
  };

  // Automatically redirect if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        router.push('/dashboard');
      }
    };

    checkSession();
  }, [router]);
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center border rounded-2xl p-8'>
        <Image
          src='/logo.png'
          alt='logo'
          width={180}
          height={60}
          className='mb-4'
        />
        <Image
          src='/login.png'
          alt='login'
          width={400}
          height={250}
          className='rounded-2xl mb-4'
        />
        <h2 className='text-2xl font-bold text-center mb-2'>Welcome to AiCuruiter</h2>
        <p className='text-gray-500 text-center mb-6'>Sign In with Google Authentication</p>
        <Button onClick={signInWithGoogle} className='w-full'>
          Login with Google
        </Button>
      </div>
    </div>
  )
}
