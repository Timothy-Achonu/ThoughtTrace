"use client";

import { Logo } from "@/assets";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "..";
import { signoutFirebase } from "@/lib/auth/actions";
import { signOut, useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import useToggleSidebar from "@/store/toggleSidebar";
import { useEffect, useState } from "react";
import { ThoughtType, FireStoreThoughtDataType } from "@/lib";
import { thoughtsColRef } from "@/app/firebase/config";
import { onSnapShotCollectionWrapper } from "@/lib/common";
import { cn } from "@/utils";
import { SkeletonLoader } from "../ui";

function Sidebar() {
  const { showSidebar, toggleSidebar } = useToggleSidebar();
  const { data: session } = useSession();
  const userId = session?.user.id as string;
  const [thoughsQuery, setThoughtsQuery] = useState<{
    data: ThoughtType[] | null;
    isLoading: boolean;
  }>({ data: null, isLoading: true });
  const params = useParams();
  const { thought: thoughtId } = params;
  const handleLogOut = async () => {
    await signoutFirebase();
    signOut(); //signOut next-auth
  };

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = onSnapShotCollectionWrapper<FireStoreThoughtDataType>(
      thoughtsColRef(userId),
      (snapshot) => {
        let thoughts: ThoughtType[] = [];

        snapshot.docs.forEach((doc) => {
          thoughts.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setThoughtsQuery((prev) => ({
          ...prev,
          data: [...thoughts],
          isLoading: false,
        }));
      }
    );

    return () => unsubscribe();
  }, [userId]);
  // console.log({ilO})
  return (
    <aside
      className={`md:w-[300px] sm:w-[39vw] w-screen ${
        showSidebar ? "left-0" : "left-[-100vh]"
      } flex transition-all duration-[500ms] sm:static fixed top-0 bottom-0 z-[999] flex-col py-12 sm:px-8 px-4 bg-primary-main`}
    >
      {/* <Image src={Logo} alt="Logo" height={60} width={60} /> */}
      <Logo />
      <div className="flex flex-col gap-3 mt-6 h-[50vh] overflow-y-auto py-8 pr-2">
        {thoughsQuery.isLoading &&
          new Array(10)
            .fill("k")
            .map((_, index) => (
              <SkeletonLoader
                key={index}
                width="150px"
                height="25px"
                customClassName=""
              />
            ))}
        {!thoughsQuery.isLoading &&
          thoughsQuery.data?.map((thought, index) => {
            const isActive = thought.id === thoughtId;
            return (
              <button
                key={index}
                type="button"
                onClick={() => toggleSidebar()}
                className={cn(isActive && "bg-accent-blue", "py-1 px-4 flex")}
              >
                <Link
                  href={`/thoughts/${thought.id}`}
                  className="w-full text-start"
                >
                  {" "}
                  {thought.title}{" "}
                </Link>
              </button>
            );
          })}
        {!thoughsQuery.isLoading && !thoughsQuery.data && (
          <p>No thoughts yet</p>
        )}
      </div>
      <section className="flex flex-col justify-between mt-14 flex-1">
        <Link href={`/thoughts/`} className="w-full text-start">
          {" Create Thought "}
        </Link>
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
