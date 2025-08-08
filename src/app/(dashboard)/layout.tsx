import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import Sidebar from "@/components/templates/Sidebar";
// import MobileNav from "@/components/templates/MobileNav";

async function layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options);

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
  // check project document
  return (
    <section className="flex flex-col h-[100dvh] overflow-hidden">
      {/* This mobileNav should be hidden when the sidebar shows on mobile */}
      {/* <MobileNav /> */}
      <div className="flex flex-1 pt-0 XXpt-10">
        <Sidebar />
        {children}
      </div>
    </section>
  );
}
  
export default layout;  
