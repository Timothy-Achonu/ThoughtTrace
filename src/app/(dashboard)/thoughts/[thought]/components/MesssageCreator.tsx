"use client";

import { Input } from "@/components/atoms/Input";
import { IoSend } from "react-icons/io5";
import { FormEvent, useState } from "react";
import { createMessage } from "@/lib/thoughts";
import { useSession } from "next-auth/react";
// import { useMessagesContext } from "../context";
import { Button } from "@/components";
import { RecordVoiceNote } from "./RecordVoiceNote";
import { useParams } from "next/navigation";
// const arrangeNotes = (
//   notesGroupByDate: NotesGroupedByDateType[] | null,
//   newNote: NoteType
// ) => {
//   const currentDay = dayjs(new Date()).format("DD MMMM YYYY");
//   notesGroupByDate
//     ?.find((group) => group.day === currentDay)
//     ?.notes.push(newNote);
//   return notesGroupByDate;
// };

function MessageCreator() {
  const { data: session } = useSession();
  // const { setMessages, stateMessages } = useMessagesContext();
  const userId = session?.user.id ;
  const params = useParams();
  const { thought } = params;
  const [inputValue, setInputValue] = useState("");
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const newMessage = {
      body: inputValue,
      user_id: userId,
    };

    setInputValue("");
    // setNotes((prev) => {
    //   return arrangeNotes(prev, newNote);
    // });
    // });

    await createMessage(
      userId as string,
      thought as string,
      newMessage
    );
  }
  return (
    <form
      onSubmit={onSubmit}
      className="sticky bottom-0 flex items-center gap-1 md:gap-3"
    >
      <Input
        type="text"
        placeholder="type a note"
        className="bg-primary-main
         font-extralight border-primary-main outline-none text-neutral-main"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue ? (
        <Button
          className="flex items-center bg-transparent w-fit px-0 min-w-0"
          // shouldUsePending={false}
          type="submit"
        >
          <IoSend className="text-accent-blue text-[3rem]" />
        </Button>
      ) : (
        <RecordVoiceNote />
      )}
    </form>
  );
}

export default MessageCreator;
