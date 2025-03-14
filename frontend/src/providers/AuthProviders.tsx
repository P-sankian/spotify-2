import { useAuth } from "@clerk/clerk-react";
import React, { useState,useEffect } from "react";
import {axiosInstance} from "../lib/axios.ts";
import {Loader2Icon as Loader} from "lucide-react"
import { useAuthStore } from "@/stores/useAuthStore.ts";

const updateApiToken =(token: string | null ) => {
    if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
    else delete axiosInstance.defaults.headers.common["Authorization"]
}

const AuthProviders = ({children} : {children : React.ReactNode}) => {
    const {getToken,} = useAuth();
    const {checkAdminStatus} = useAuthStore()
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
                if(token) {

                    
                    await checkAdminStatus();
                }

                
            } catch (error) {
                updateApiToken(null);
                console.log("error in  auth provider ",error )
            }
            finally {
                setLoading(false);
            }
        }
        initAuth();
        
        
    },[getToken])
    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center ">
            <Loader className="size-8 text-emerald-500 animate-spin" />
            
        </div>
    )
  
  
  
    return (
   
    <div>{children}</div>
  )
}

export default AuthProviders