import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import { Navbar } from "@/components";

async function layout({children} : {children: React.ReactNode}) {
    const session = await getServerSession(options);
    console.log({session}) 
  const user = session?.user;
  if (!session || !user) {
    permanentRedirect(`/signin`);
  }
  if (!user) {
    permanentRedirect(`/signin`);
  }
  return (
    <>
    <Navbar/>
      {children}
    </>
  )
}

export default layout
