"use client";
import { useEffect, useState } from "react";
import { CreateThought, SearchThoughts } from "./components";
import { onSnapShotCollectionWrapper } from "@/lib/common";
import { FireStoreThoughtDataType, ThoughtType } from "@/lib";
import { thoughtsColRef, query, orderBy } from "@/app/firebase/config";
import { useSession } from "next-auth/react";
import { ThoughtCard } from "./components";
import { SkeletonLoader } from "@/components/ui";
import { useQueryContext } from "@/context";
import { QUERY_KEYS } from "@/utils";
const Page = () => {
  const { data: session } = useSession();
  const userId = session?.user.id as string;
  const { getQuery, setQuery, } = useQueryContext();
  const thoughtsRes = getQuery<ThoughtType[]>(QUERY_KEYS.THOUGHTS);

  // const [thoughtsRes, setThoughtsRes] = useState<{
  //   data: ThoughtType[] | null;
  //   isLoading: boolean;
  // }>({ data: null, isLoading: true });

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!userId) return;

    const thoughtsQuery = query(
      thoughtsColRef(userId),
      orderBy("createdAt", "desc") // descending = latest first
    );

    const unsubscribe = onSnapShotCollectionWrapper<FireStoreThoughtDataType>(
      thoughtsQuery,
      (snapshot) => {
        let thoughts: ThoughtType[] = [];

        snapshot.docs.forEach((doc) => {
          thoughts.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        // setThoughtsRes((prev) => ({
        //   ...prev,
        //   data: [...thoughts],
        //   isLoading: false,
        // }));
        setQuery<ThoughtType[]>(QUERY_KEYS.THOUGHTS, {
          isLoading: false,
          data: [...thoughts],
        });
      }
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div className="h-full w-full px-[clamp(0.95rem,7.8vw,18.125rem)] xl:px-[clamp(0.95rem,18.8vw,18.125rem)]  pt-12 overflow-y-auto pb-6">
      <SearchThoughts
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <CreateThought />
      <div className="mt-6 grid gap-4 grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">
        {thoughtsRes.isLoading ? (
          <>
            {new Array(10).fill("").map((_, index) => {
              return (
                <SkeletonLoader
                  key={index}
                  height="200px"
                  width=""
                  customClassName=""
                />
              );
            })}
          </>
        ) : (
          <>
            {thoughtsRes.data
              ?.filter((thought) => thought.title.includes(searchValue))
              ?.map((thought) => {
                return <ThoughtCard key={thought.id} thought={thought} />;
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
