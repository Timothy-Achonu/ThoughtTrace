"use client";

import { Input } from "@/components/atoms/Input";
import { IoSend } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import { Button } from "..";
import { useState } from "react";
import { createNote } from "@/lib/actions/noteActions";
import { NoteType } from "@/lib/types/notes";
import {  useSession } from "next-auth/react";
import { SubmitButton } from "../atoms/SubmitButton";
import { serverTimestamp } from "@/app/firebase/config";

function NoteCreator() {
  const { data: session } = useSession();
  const [inputValue, setInputValue] = useState("");
  async function onSubmit() {
    console.log({
      body: inputValue,
      user_id: session?.user?.id ? session?.user?.id : "",
    })
    const response = await createNote({
      body: inputValue,
      user_id: session?.user.id ? session?.user?.id : "",
    });
    console.log(response)
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
      <SubmitButton className="flex items-center bg-transparent w-fit px-0  min-w-0">
        {inputValue ? (
          <IoSend className="text-accent-blue text-[3rem]" />
        ) : (
          <MdKeyboardVoice className="text-accent-blue text-[3rem]" />
        )}
      </SubmitButton>
    </form>
  );
}

export default NoteCreator;
