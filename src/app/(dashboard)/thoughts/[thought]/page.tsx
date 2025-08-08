"use client";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { MessagesGroupedByDateType } from "@/lib/thoughts";
import MessageCreator from "./components/MesssageCreator";
import { SkeletonLoader } from "@/components/ui";
import { getFormattedDate } from "@/utils";
import { ClockIcon } from "@/assets";
import { useCallback, useEffect, useRef } from "react";
import { AudioWaveform } from "./components";
import { useMessagesContext } from "./context";

function NotesPage() {
  const { stateMessages, isLoadingMessages,currentThought } = useMessagesContext();
  const tableScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToTableTop = useCallback(() => {
    setTimeout(() => {
      tableScrollRef.current?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }, 100);
  }, []);


  useEffect(() => {
    scrollToTableTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <>
      <DashboardLayout
        header={currentThought?.title}
        footer={<MessageCreator />}
        addHeaderArrowBack
      >
        {/* <div className="flex-1"> */}
        <div className="max-w-[MIN(340px,70vw)] mx-auto text-clip font-semibold font-sans text-center text-xs mb-9">
          <p>This is the beginning of a conversation with yourself....</p>
        </div>
        {isLoadingMessages ? (
          <div className="flex flex-col items-end gap-6 pr-4">
            {new Array(10).fill("k").map((_, index) => (
              <SkeletonLoader key={index} width="150px" height="25px" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6 pr-4">
            {(stateMessages as MessagesGroupedByDateType[])?.map(
              ({ day, messages }, index) => {
                return (
                  <ul className="" key={index}>
                    {" "}
                    <p className="bg-accent-blue py-1 px-2 rounded-md max-w-[MIN(340px,70vw)] w-fit mx-auto text-center sticky top-0 z-10 text-[0.75rem]">
                      {" "}
                      {day}{" "}
                    </p>
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
        {/* </div> */}
      </DashboardLayout>
    </>
  );
}
export default NotesPage;
