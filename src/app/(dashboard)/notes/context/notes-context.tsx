"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { NotesGroupedByDateType, NoteType } from "@/lib/notes";
import {
  notesColRef,
  onSnapshot,
  query,
  where,
  orderBy,
} from "@/app/firebase/config";
import { useSession } from "next-auth/react";
import { getFormattedDate } from "@/utils";
import { Timestamp } from "@/app/firebase/config";
import dayjs from "dayjs";


interface NotesContextProps {
  stateNotes: NotesGroupedByDateType[] | null;
  setNotes: React.Dispatch<
    React.SetStateAction<NotesGroupedByDateType[] | null>
  >;
  isLoadingNotes: boolean;
  setIsLoadingNotes: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotesContext = createContext<NotesContextProps | undefined>(undefined);

interface NotesProviderProps {
  children: ReactNode;
}

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const [stateNotes, setNotes] = useState<NotesGroupedByDateType[] | null>(
    null
  );
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);
  const userId = session?.user.id;

  const groupNotesByDate = (notes: NoteType[]) => {
    const groupNotes: { day: string; notes: NoteType[] }[] = [];
    for (let i = 0; i < notes.length; i++) {
      const currentNoteTimeStap = notes[i].createdAt;
      // let currentDay = currentNoteTimeStap ? getFormattedDate(currentNoteTimeStap) : dayjs(new Date()).format("DD MMMM YYYY")
      let currentDay = getFormattedDate(currentNoteTimeStap as Timestamp).day;
      groupNotes.push({ day: currentDay, notes: [] });
      notes.forEach((note) => {
        getFormattedDate(note.createdAt as Timestamp).day === currentDay &&
          groupNotes[i].notes.push(note);
      });
    }
    return groupNotes;
  };
  // [
  //   {
  //     day: Timestamp,
  //     notes: Notes[]
  //   },
  //   {
  //     day: Timestamp,
  //     notes: Notes[]
  //   },
  //   //more day chunks
  // ]

  useEffect(() => {
    if (!userId) return;
    //const q = query(notesColRef, where("user_id", "==", userId));
    const q = query(
      notesColRef,
      where("user_id", "==", userId),
      orderBy("createdAt", "asc")
    );

    // or "asc" for ascending order

    setIsLoadingNotes(true);

    let notes: NoteType[] = [];
    const unsubscribe = onSnapshot(q, (snapshot) => {
      notes = [];
      snapshot.docs.forEach((doc) => {
        notes.push({
          body: doc.data().body,
          user_id: doc.data().user_id,
          id: doc.id,
          createdAt: doc.data().createdAt,
        });
      });
      setIsLoadingNotes(false);
      console.log({ notes, group: groupNotesByDate(notes) });

      setNotes(groupNotesByDate(notes));
    });
    return () => unsubscribe(); // cleanup

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <NotesContext.Provider
      value={{ stateNotes, setNotes, isLoadingNotes, setIsLoadingNotes }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = (): NotesContextProps => {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error("useNotesContext must be used within an NotesProvider");
  }

  return context;
};
