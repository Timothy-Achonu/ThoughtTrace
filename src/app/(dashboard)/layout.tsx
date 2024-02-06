import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import Sidebar from "@/components/templates/Sidebar";

async function layout({children} : {children: React.ReactNode}) {
    const session = await getServerSession(options);
    console.log({session}) 
    /*
    The user object I'm returning from logging in or signing has and id property, but when I console.log session, the user property doesn't
    have an id property.
    */
  const user = session?.user;
  if (!session || !user) {
    permanentRedirect(`/signin`);
  }
  if (!user) {
    permanentRedirect(`/signin`);
  }
  return (
    <section className="flex">
        <Sidebar/> 
      {children}
    </section>
  )
}

export default layout
