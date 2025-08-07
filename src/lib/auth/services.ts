
import { serverTimestamp, db, doc, setDoc, getDoc } from "@/app/firebase/config";
import { Session } from "next-auth";


export async function createUserDocument(user: Session['user']) {
  const userRef = doc(db, "users", user.id as string);


  //  Check if it exists before creating (if doing on login)
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) return;

  await setDoc(userRef, {
    email: user.email,
    createdAt: serverTimestamp(),
    // add more default fields
  });
}
