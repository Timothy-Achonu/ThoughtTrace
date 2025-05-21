"use client";

import { Input } from "@/components/atoms/Input";
import { IoSend } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import { FormEvent, useState } from "react";
import { createNote } from "@/lib/notes";
import { useSession } from "next-auth/react";
import { SubmitButton } from "../../../../components/atoms/SubmitButton";
import { Session } from "next-auth";
import { useNotesContext } from "../context";
import { flushSync } from "react-dom";
import { Button } from "@/components";
import dayjs from "dayjs";
import { NotesGroupedByDateType, NoteType } from "@/lib";
import { RecordVoiceNote } from "./RecordVoiceNote"
// const arrangeNotes = (
//   notesGroupByDate: NotesGroupedByDateType[] | null,
//   newNote: NoteType
// ) => {
//   const currentDay = dayjs(new Date()).format("DD MMMM YYYY");
//   console.log({ newNote });
//   notesGroupByDate
//     ?.find((group) => group.day === currentDay)
//     ?.notes.push(newNote);
//   return notesGroupByDate;
// };


function NoteCreator() {
  const { data: session } = useSession();
  const { setNotes, stateNotes } = useNotesContext();

  const [inputValue, setInputValue] = useState("");
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const newNote = {
      body: inputValue,
      user_id: (session as Session).user.id as string,
    };

    setInputValue("");
    // setNotes((prev) => {
    //   return arrangeNotes(prev, newNote);
    // });
    // });
    const response = await createNote(newNote);
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

export default NoteCreator;
