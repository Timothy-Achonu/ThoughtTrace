import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
// import Sidebar from "@/components/templates/Sidebar";
// import MobileNav from "@/components/templates/MobileNav";
import { ThoughtsNavbar } from "@/components/templates";

async function layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options);

  const user = session?.user;
  if (!session || !user) {
    permanentRedirect(`/signin`);
  }
  if (!user) {
    permanentRedirect(`/signin`);
  }
  return (
    <section className="flex flex-col h-[100dvh] overflow-hidden bg-body-light dark:bg-body-dark">
      <ThoughtsNavbar />

      <div className=" flex-1 pt-0 overflow-y-auto ">{children}</div>
    </section>
  );
}

export default layout;
