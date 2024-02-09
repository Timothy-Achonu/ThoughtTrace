"use client";

import { Input } from "@/components/atoms/Input";
import { IoSend } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import { Button } from "..";
import { useState } from "react";
function NoteCreator() {
  const [inputValue, setInputValue] = useState("");
  return (
    <section className="sticky bottom-0 flex items-center gap-1 md:gap-3">
      <Input
        type="text"
        placeholder="type a note"
        className="bg-primary-main
         font-extralight border-primary-main outline-none text-neutral-main"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button className="flex items-center bg-transparent w-fit px-0  min-w-0">
        {inputValue ? (
          <IoSend className="text-accent-blue text-[3rem]" />
        ) : (
          <MdKeyboardVoice className="text-accent-blue text-[3rem]" />
        )}
      </Button>
    </section>
  );
}

export default NoteCreator;
