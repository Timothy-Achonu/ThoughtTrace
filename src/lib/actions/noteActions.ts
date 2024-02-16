"use server";
import { addDoc } from "@/app/firebase/config";
import { NoteType } from "../types/notes";
import { notesColRef } from "@/app/firebase/config";
import { serverTimestamp } from "@/app/firebase/config";

export async function createNote(note: NoteType) {
  const response = await addDoc(notesColRef, {
    ...note,
    createdAt: serverTimestamp(),
  });
  console.log(response);
  return "response";
}
