import { Button } from "@/components/atoms/Button";
import { RxHamburgerMenu } from "react-icons/rx";
function MobileNav() {
  return (
    <nav className=" md:hidden block top-0 w-full py-1 px-3">
        <Button
          intent={"ghost"}
          btnType={"icon"}
          className="rounded-[0px] text-[1.3rem] hover:border-none block ml-auto"
          // onClick={() => setShowMobileMenu((prev) => !prev)}
        >
          <RxHamburgerMenu />
        </Button>
      </nav>
  )
}

export default MobileNav
