"use client";
import { Logo } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../index";
import { signOut, useSession } from "next-auth/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { onAuthStateChanged, auth } from "../../app/firebase/config";
import { signoutFirebase } from "@/lib/actions/authActions";

export function Navbar() {
  const { data: session } = useSession();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const handleLogOut = async () => {
    const result = await signoutFirebase();
    signOut();
  };
  // onAuthStateChanged(auth, (user) => {
  //   console.log("user status changed:", user);
  // });

  return (
    <nav className={`flex py-8 md:px-14 px-6 justify-between items-center`}>
      <Link href="/">
        <Image
          className="h-[70px] w-[80px] md:h-[90px] md:[100px] object-contain"
          src={Logo}
          height={"75"}
          width={"67.55"}
          alt="logo"
        />
      </Link>
      <div
        className={`flex md:flex-row md:h-auto md:gap-4 md:py-0
       md:justify-start md:static h-[90vh] flex-col gap-[8vh] items-center
        bg-primary-main-trans fixed   left-0 right-0 py-7  duration-[700ms] transition-[top]
          ${
            showMobileMenu ? "top-0 bottom-0" : "top-[-200vh]"
          } text-[1.375rem]`}
      >
        <Button intent={"ghost"} isLink={true} href="/">
          Home
        </Button>
        <Button intent={"ghost"} isLink={true} href="/href">
          Daily Questions
        </Button>

        {session?.user ? (
          <Button className="" onClick={handleLogOut}>
            Sign Out
          </Button>
        ) : (
          <>
            {" "}
            <Button isLink={true} href="/signin">
              Sign in
            </Button>
            <Button isLink={true} href="/signup">
              Sign up
            </Button>
          </>
        )}
        <Button
          intent={"ghost"}
          btnType={"icon"}
          className="rounded-[0px] md:hidden font-thin mt-auto text-[5rem] hover:border-none"
          onClick={() => setShowMobileMenu((prev) => !prev)}
        >
          <MdOutlineCancel />
          {/* <span className={`w-[80px] h-[80px] rounded-[50%] flex items-center justify-center border `}>x</span> */}
        </Button>
      </div>
      <div className="md:hidden block">
        <Button
          intent={"ghost"}
          btnType={"icon"}
          className="rounded-[0px]  text-[4rem] hover:border-none"
          onClick={() => setShowMobileMenu((prev) => !prev)}
        >
          <RxHamburgerMenu />
        </Button>
      </div>

      {/* {session?.user ? (
        <Button
          isLink={true}
          href="api/auth/signout"
          className="border-[2.4px]  border-black shadow-btn-primary"
        >
          Sign Out
        </Button>
      ) : (
        <Button
          isLink={true}
          href="/about"
          className="border-[2.4px] border-black shadow-btn-primary"
        >
          Send Wishes
        </Button>
      )} */}
    </nav>
  );
}
