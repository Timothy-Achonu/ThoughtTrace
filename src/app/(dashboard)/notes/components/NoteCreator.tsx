"use client";

import { Input } from "@/components/atoms/Input";
import { IoSend } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import { useState } from "react";
import { createNote } from "@/lib/notes/actions";
import { useSession } from "next-auth/react";
import { SubmitButton } from "../../../../components/atoms/SubmitButton";
import { Session } from "next-auth";
import { useNotesContext } from "../context";
import { flushSync } from "react-dom";
import { Button } from "@/components";
import dayjs from "dayjs";

function NoteCreator() {
  const { data: session } = useSession();
  const { setNotes } = useNotesContext();

  const [inputValue, setInputValue] = useState("");
  async function onSubmit() {
    const newNote = {
      body: inputValue,
      user_id: (session as Session).user.id as string,
    };
    //updates state immediately, stops state updates batching
    const currentDay = dayjs(new Date()).format("DD MMMM YYYY");
    flushSync(() => {
      setInputValue("");
      setNotes((prev) =>
        prev
          ? [...prev, { day: currentDay, notes: [newNote] }]
          : [{ day: currentDay, notes: [newNote] }]
      );
    });
    // setInputValue("");
    // setNotes((prev) => (prev ? [...prev, newNote] : [newNote]));
    const response = await createNote(newNote);
  }
  return (
    <form
      action={onSubmit}
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
        <SubmitButton
          className="flex items-center bg-transparent w-fit px-0 min-w-0"
          shouldUsePending={false}
        >
          <IoSend className="text-accent-blue text-[3rem]" />
        </SubmitButton>
      ) : (
        <Button type="button" intent={"outline"} className="border-none">
          {" "}
          <MdKeyboardVoice className="text-accent-blue text-[3rem]" />{" "}
        </Button>
      )}
    </form>
  );
}

export default NoteCreator;
