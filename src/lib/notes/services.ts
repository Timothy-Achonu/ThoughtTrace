import { notesColRef, getDocs } from "@/app/firebase/config";
import { addDoc } from "@/app/firebase/config";
import { CreateNoteType } from "./types";
import { serverTimestamp } from "@/app/firebase/config";

 export async function handleGetNotes() {
    try {
      const snapshot = await getDocs(notesColRef);
      const notes = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      return notes;
    } catch (err) {
      return err;
    }
}

export async function createNote(note: CreateNoteType) {
  const response = await addDoc(notesColRef, {
    ...note,
    createdAt: serverTimestamp(),
  });
  // return {response};
}


