"use client";
import { Button } from "@/components/atoms/Button";
import { RxHamburgerMenu } from "react-icons/rx";
import useToggleSidebar from "@/store/toggleSidebar";
function MobileNav() {
  const { setShowsidebar } = useToggleSidebar();
  return (
    <nav className="md:hidden block w-full py-1 px-3 fixed top-0 bg-primary-main">
      {/* This mobileNav should be hidden when the sidebar shows on mobile */}
      <Button
        intent={"ghost"}
        btnType={"icon"}
        className="rounded-[0px] text-[1.3rem] hover:border-none block ml-auto"
        onClick={() => setShowsidebar()}
      >
        <RxHamburgerMenu />
      </Button>
    </nav>
  );
}

export default MobileNav;
