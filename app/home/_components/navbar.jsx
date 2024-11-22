"use client";

import { Button } from "../../../components/ui/button";
import { useAuthContext } from "../../stores/authcontext";
import { NFIDProvider, signIn, signOut } from "@junobuild/core";
import { useRouter } from "next/navigation";

export const NavBar = () => {
  const {user}=useAuthContext();
  const router=useRouter();
  const handleAuth=async()=>{
    if(!user){
      await signIn({
        provider:new NFIDProvider({
          appName:"ACME",
          logoUrl:""
        })
      })
    }
  }
  const handleRoute=async()=>{
    if(!user){
      await signIn({
        provider:new NFIDProvider({
          appName:"ACME",
          logoUrl:""
        })
      });
      router.push('/home')
    };
    router.push("/home")
  }
  return (
    <div className="p-24">
      <div className="flex items-center justify-between">
        <p>ACME</p>
        <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleRoute}>Get Started</Button>
            
            {user?(
              <>
              <Button onClick={signOut}>LOGOUT</Button>
              </>
            ):(
              <>
              <Button onClick={handleAuth}>LOGIN</Button>
              </>
            )}
        
        </div>
      </div>{" "}
    </div>
  );
};
