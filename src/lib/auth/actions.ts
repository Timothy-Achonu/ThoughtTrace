"use server";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  auth,
} from "@/app/firebase/config";

export async function signin(email: string, password: string) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return { res: { email: res.user.email, id: res.user.uid } };
  } catch (error) {

    return { error: (error as { code?: string })?.code };  }
}
export async function signup(email: string, password: string) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return {
      res: { email: res.user.email as string, id: res.user.uid as string },
    };
  } catch (error) {

    return { error: (error as { code?: string })?.code };
  }
}
export async function signoutFirebase() {
  try {
    const res = await signOut(auth);
    return { res };
  } catch (error) {
    return { error };
  }
}
