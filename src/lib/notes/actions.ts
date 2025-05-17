"use server";
import { addDoc } from "@/app/firebase/config";
import { CreateNoteType } from "./types";
import { notesColRef } from "@/app/firebase/config";
import { serverTimestamp } from "@/app/firebase/config";

export async function createNote(note: CreateNoteType) {
  console.log({ timeStamp: serverTimestamp() });
  const response = await addDoc(notesColRef, {
    ...note,
    createdAt: serverTimestamp(),
  });
  console.log({ response });
  // return {response};
}
