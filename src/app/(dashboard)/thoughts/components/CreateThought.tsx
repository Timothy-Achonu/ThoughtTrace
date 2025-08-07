"use client";

import { FormEvent, useState } from "react";
import { Button, Input } from "@/components";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createThought } from "@/lib";

const CreateThought = () => {
  const { data: session } = useSession();
  const [inputValue, setInputValue] = useState("");


  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const userId = (session as Session).user.id as string;
   
    const newThought = {
      title: inputValue,
    };

    setInputValue("");  
    // setNotes((prev) => {
    //   return arrangeNotes(prev, newMessage);
    // });
    // });
    const response = await createThought(newThought, userId);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Enter thought title"
        className="bg-primary-main
         font-extralight border-primary-main outline-none text-neutral-main"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        intent={"outline"}
        className={` text-neutral-main   bg-accent-blue
              w-full justify-start border-none `}
        type="submit"
      >
        Create Thought
      </Button>
    </form>
  );
};

export { CreateThought };
