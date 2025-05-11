"use client";
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient';
import React, { useState, useContext, useEffect} from "react";

function Provider({ children }) {
  const [user,setUser]=useState();

  useEffect(() => {
    CreateNewuser();
  }, []);
  
  const CreateNewuser=()=>{
    supabase.auth.getUser().then(async({data:{user}})=>{

      let { data: Users, error } = await supabase
  .from('Users')
  .select('*')
  .eq('email',user?.email);
  console.log(Users);
  if(Users?.length==0)
  {
    const {data, error}= await supabase.from('Users')
    .insert([
      {
        name: user?.user_metadata?.name,
        email: user?.email,
        picture: user?.user_metadata?.picture
      }
    ])
    console.log(data);
    setUser(data);
    return;
  }
  setUser(Users[0]);

    })
  }
  

/*
  useEffect(() => {
    createOrFetchUser();
  }, []);

  const createOrFetchUser = async () => {
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

    if (authError || !authUser) {
      console.error('Authentication error:', authError);
      return;
    }

    // Check if user exists in "Users" table
    const { data: existingUsers, error: fetchError } = await supabase
      .from('Users')
      .select('*')
      .eq('email', authUser.email);

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return;
    }

    if (existingUsers?.length === 0) {
      // If not exists, insert the new user
      const { data: insertedUsers, error: insertError } = await supabase
        .from('Users')
        .insert([
          {
            name: authUser.user_metadata?.name,
            email: authUser.email,
            picture: authUser.user_metadata?.picture
          }
        ])
        .select(); // to immediately get the inserted record

      if (insertError) {
        console.error('Insert error:', insertError);
        return;
      }

      setUser(insertedUsers?.[0]); // insert returns an array
    } else {
      setUser(existingUsers?.[0]); // use existing user
    }
  };*/

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );

}
export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
