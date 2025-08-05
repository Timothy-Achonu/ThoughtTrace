import { colRef, getDocs } from "@/app/firebase/config";

 export async function handleGetDocs() {
    try {
      const snapshot = await getDocs(colRef);
      const todos = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      return todos;
    } catch (err) {
      return err;
    }
  }