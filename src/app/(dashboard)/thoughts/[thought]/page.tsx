"use client";
import { MessagesGroupedByDateType } from "@/lib/thoughts";
import MessageCreator from "./components/MesssageCreator";
import { Badge, SkeletonLoader } from "@/components/ui";
import { getFormattedDate } from "@/utils";
import { ClockIcon } from "@/assets";
import { useCallback, useEffect, useRef } from "react";
import { AudioWaveform } from "./components";
import { useMessagesContext } from "./context";
import { twMerge } from "tailwind-merge";
import { ArrowBack } from "@/components";
import { ThemeToggle } from "@/components/molecules";

function NotesPage() {
  const { stateMessages, isLoadingMessages, currentThought, isLoadingThought } =
    useMessagesContext();
  const pagecrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToTableTop = useCallback(() => {
    setTimeout(() => {
      pagecrollRef.current?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }, 100);
  }, []);

  useEffect(() => {
    scrollToTableTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-[100dvh]">
      <header
        className={twMerge(
          `flex justify-between items-center rounded-xl shadow-sm px-4 md:px-8  py-4 left-0 right-0 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50`
        )}
      >
        <div className="flex items-center gap-4">
          {<ArrowBack />}
          <div>
            {isLoadingThought ? (
              <SkeletonLoader width="150px" height="45px" />
            ) : (
              <p className="text-2xl text-neutral-main font-bold capitalize">
                {currentThought?.title}
              </p>
            )}
            <p className="text-neutral-main text-xs sm:text-sm md:text-base mt-1"></p>
          </div>
        </div>
        <ThemeToggle />
      </header>
      {/* <div className="flex-1"> */}
      <div className="max-w-[MIN(340px,70vw)] mx-auto text-clip font-semibold font-sans text-center text-xs mb-9 mt-4">
        <p className="">
          This is the beginning of a conversation with yourself....
        </p>
      </div>
      {isLoadingMessages ? (
        <div className="flex flex-col items-end gap-6 pr-4 overflow-y-scroll flex-1">
          {new Array(30).fill("k").map((_, index) => (
            <div key={index}>
              <SkeletonLoader width="150px" height="25px" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6 pr-4  overflow-y-scroll flex-1">
          {((stateMessages && stateMessages.length < 1) || !stateMessages) && (
            <p className="text-center"> {new Date().toDateString()} </p>
          )}
          {(stateMessages as MessagesGroupedByDateType[])?.map(
            ({ day, messages }, index) => {
              return (
                <ul className="" key={index}>
                  {" "}
                  <div className="flex items-center max-w-[MIN(340px,70vw)] mx-auto  sticky top-0 z-10 ">
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>

                    <p className="bg-accent-blue py-1 px-2 rounded-md  w-fit  text-center text-[0.75rem]">
                      {" "}
                    </p>
                    <Badge
                      variant="secondary"
                      className="mx-4 px-3 py-1 text-xs"
                    >
                      {day}{" "}
                    </Badge>
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                  <li className="flex flex-col gap-6 items-end mt-6">
                    {messages.map((messages, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-primary-main rounded-md px-2 py-1 relative flex gap-2 max-w-[24rem]"
                        >
                          {messages?.body ? (
                            <p className="break-all "> {messages.body} </p>
                          ) : (
                            <div className="flex-1 min-w-[12rem]">
                              <AudioWaveform
                                audioUrl={messages.downloadURL as string}
                                canPlayAudio={Boolean(messages.createdAt)}
                              />
                              {/* <audio className="max-w-[MIN(340px,60vw)]" src={note.downloadURL} controls></audio> */}
                            </div>
                          )}
                          <div className="min-w-[1.594rem] text-[0.625rem] self-end flex justify-end">
                            {" "}
                            {messages.createdAt ? (
                              getFormattedDate(messages.createdAt).time
                            ) : (
                              <ClockIcon />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </li>
                </ul>
              );
            }
          )}
        </div>
      )}
      <div
        className={twMerge(
          ` grid items-center rounded-xl shadow-sm px-0 md:px-8 py-4 bottom-0 left-0 right-0 z-10 w-full psx-[MIN(32px,2%)]`
        )}
      >
        <MessageCreator />
      </div>
    </div>
  );
}
export default NotesPage;
