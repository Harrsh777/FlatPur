import { Button } from '@/components/ui/button'
import React from 'react'
import image from "next/image";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-toastify';

export default function SocialBtns() {
  const supabase = createClientComponentClient()
  const githublogin = async () => {
        alert("Redirected to github")
    const {error} =await supabase.auth.signInWithOAuth({
        provider:"github",
        options:{
            redirectTo:"${location.origin}/auth/callback",
        },
        });
        if(error){
            toast.error(error.message , {theme:"colored"})
          }
    };
    const googleLogin = async () => {
      alert("Redirected to google ")
      const {error} =await supabase.auth.signInWithOAuth({
      provider:"google",
      options:{
          redirectTo:'${location.origin}/auth/callback',
      },
      });
       if(error){
          toast.error(error.message , {theme:"colored"})
     }
  };
  return (
    <div> 
        <Button variant="outline" className='w-full'
        onClick={googleLogin}>
    <img 
    src="/images/google.png"
    width={25}
    height={25}
    alt="google_logo"
    className="mr-5"
    />
      Continue with Google
       
      </Button>
      <Button variant="outline" className='w-full mt-5'
      onClick={githublogin}>
    <img 
    src="/images/github.png"
    width={25}
    height={25}
    alt="google_logo"
    className="mr-5"
    />
      Continue with Github
      </Button></div>
  )
}
