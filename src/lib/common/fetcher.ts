import { getServerSession } from "next-auth";
// import { options } from "../api/auth/[...nextauth]/options";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { signOut } from "next-auth/react";
// import { signOut } from "firebase/auth";



export async function fetcher<T>(fn: () => void) {

    const session = await getServerSession(options);

    
  
}