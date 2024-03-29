"use client";

import { Logo } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "..";
import { signoutFirebase } from "@/lib/actions/authActions";
import { signOut, useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { twMerge } from "tailwind-merge";
import useToggleSidebar from "@/store/toggleSidebar";

const Navlinks = [
  {
    href: "/notes",
    label: "Notes",
  },

  {
    href: "/daily-questions",
    label: "Daily Questions",
  },
  {
    href: "/create",
    label: "Create",
  },
];
function Sidebar() {
  const pathname = usePathname();
  const { showSidebar } = useToggleSidebar();
  const handleLogOut = async () => {
    const result = await signoutFirebase();
    signOut();
  };
  return (
    <aside
      className={`w-[300px] ${
        showSidebar ? "left-0" : "left-[-100vh]"
      } flex transition-all duration-[500ms] md:static fixed top-0 bottom-0 z-[999] flex-col py-12 px-8 bg-primary-main`}
    >
      <Image src={Logo} alt="Logo" height={60} width={60} />
      <section className="flex flex-col justify-between mt-14 flex-1">
        <div className="flex flex-col gap-6">
          {Navlinks.map((link) => {
            return (
              <Button
                intent={"outline"}
                isLink={true}
                key={link.href}
                className={` hover:bg-accent-blue text-neutral-main 
              w-full justify-start border-none ${
                pathname.includes(link.href) ? "bg-accent-blue" : ""
              }`}
                href={link.href}
              >
                {link.label}
              </Button>
            );
          })}
        </div>

        <Button
          intent={"outline"}
          className="text-neutral-main gap-2 w-full border-none hover:bg-accent-blue justify-start"
          onClick={handleLogOut}
        >
          <CiLogout className={`text-inherit font-bold text-lg`} />
          <span>Log Out</span>
        </Button>
      </section>
    </aside>
  );
}

export default Sidebar;
