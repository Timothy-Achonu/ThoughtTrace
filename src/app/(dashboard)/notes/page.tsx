"use client";
import DashboardLayout from "@/components/templates/DashboardLayout";
import NoteCreator from "@/components/molecules/NoteCreator";
import { handleGetNotes } from "@/lib/services/noteServices";
import { NoteType } from "@/lib/types/notes";
import { useState, useEffect } from "react";
import { notesColRef, onSnapshot, query, where } from "@/app/firebase/config";
import { useSession } from "next-auth/react";

// onSnapshot(colRef, (snapshot) => {
//   let books = [];
//       snapshot.docs.forEach((doc) => {
//         books.push({ ...doc.data(), id: doc.id });
//       });
//       console.log(books);
// })

// async function page() {
function NotesPage() {
  const { data: session } = useSession();
  const [stateNotes, setNotes] = useState<NoteType[] | null>(null)

  const q = query(notesColRef, where("user_id", "==", session?.user.id ? session?.user?.id  : ''));
 
  useEffect(() => {
    let notes: NoteType[] = [];
    onSnapshot(q, (snapshot) => {
      notes = [];
      snapshot.docs.forEach((doc) => {
        notes.push({
          body: doc.data().body,
          user_id: doc.data().user_id,
          id: doc.id,
        });
      });
      setNotes(notes)
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const response  = await handleGetNotes()
  // console.log(response)

  return (
    <DashboardLayout header="Notes" footer={<NoteCreator />}>
      <section className="flex flex-col justify-between">
        <div>
          <p> Here, your notes will go...</p>
          <ul>
            {(stateNotes as NoteType[])?.map((note: NoteType) => {
              return <li key={note.id}> {note.body} </li>;
            })}
          </ul>
        </div>
      </section>
    </DashboardLayout>
  );
}
export default NotesPage;
