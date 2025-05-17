import { Timestamp } from "@/app/firebase/config";

export type CreateNoteType = {
  body: string;
  user_id: string;
};

export type NoteType = CreateNoteType & {
  id?: string;
  createdAt?: Timestamp;// createdAt is optional because of the optimistic update. When a note is created it is first added to the UI before the network request to create the note is complete, so at that point it doesn't have a createdAt value yet.
  updatedAt?: string;
};


export type NotesGroupedByDateType = {
  day: string;
  notes: NoteType[];
};