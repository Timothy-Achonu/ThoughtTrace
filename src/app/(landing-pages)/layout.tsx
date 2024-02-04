import React from "react";
import { Navbar } from "@/components/index";

type LayoutProps = {
  children: React.ReactNode;
};

function layout({ children }: LayoutProps) {
  return (
    <section
      className=" min-h-screen
    items-center gap-3 w-full"
    >
      <header>
        <Navbar />{" "}
      </header>

      <main> {children} </main>
    </section>
  );
}
export default layout;
