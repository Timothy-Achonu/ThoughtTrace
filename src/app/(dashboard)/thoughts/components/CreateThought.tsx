"use client";

import { FormEvent, useState } from "react";
import { Button, Input } from "@/components";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createThought } from "@/lib";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  MessageCircle,
  Clock,
  Moon,
  Sun,
  Settings,
  LogOut,
  BookOpen,
} from "lucide-react";

const CreateThought = () => {
  const { data: session } = useSession();
  const [inputValue, setInputValue] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const router = useRouter();

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
    router.push(`/thoughts/${response?.id}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
      {showCreate ? (
        <div className="w-full flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Enter thought title"
            className="bg-primary-main
         font-extralight border-primary-main outline-none text-neutral-main "
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            containerClassName="flex-1 !w-fit"
          />

          <Button
            intent={"primary"}
            className={`bg-black w-fit h-fit dark:bg-white dark:text-black`}
            type="submit"
          >
            Create
          </Button>
          <Button
            intent={"outline"}
            className={`!w-fit h-fit`}
            type="button"
            onClick={() => setShowCreate(false)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          intent={"primary"}
          className={``}
          type="button"
          onClick={() => setShowCreate(true)}
        >
          <Plus className="h-4 w-4" />
          Create Thought
        </Button>
      )}
    </form>
  );
};

export { CreateThought };
