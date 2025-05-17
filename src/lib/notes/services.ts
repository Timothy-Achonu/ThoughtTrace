import { notesColRef, getDocs } from "@/app/firebase/config";

// onSnapshot(colRef, (snapshot) => {
//   let books = [];
//       snapshot.docs.forEach((doc) => {
//         books.push({ ...doc.data(), id: doc.id });
//       });
//       console.log(books);
// })
 export async function handleGetNotes() {
    try {
      const snapshot = await getDocs(notesColRef);
      console.log('snapshot: ', snapshot)
      const notes = snapshot.docs.map((doc) => {
        console.log(doc)
        return { ...doc.data(), id: doc.id };
      });
      console.log(notes)
      return notes;
    } catch (err) {
      return err;
    }
}