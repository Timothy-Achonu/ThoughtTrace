import { colRef, getDocs } from "@/app/firebase/config";

 export async function handleGetDocs() {
    try {
      const snapshot = await getDocs(colRef);
      console.log('snapshot: ', snapshot)
      const todos = snapshot.docs.map((doc) => {
        console.log(doc)
        return { ...doc.data(), id: doc.id };
      });
      console.log(todos)
      return todos;
    } catch (err) {
      return err;
    }
  }