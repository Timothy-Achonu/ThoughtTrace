// utils/firebaseWrapper.ts

import {
  onSnapshot,
  Query,
  DocumentReference,
  Unsubscribe,
  DocumentData,
  CollectionReference,
  QuerySnapshot,
  DocumentSnapshot,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { signOut as nextAuthSignOut } from "next-auth/react";
// import { auth } from "@/firebase"; // your Firebase auth instance
import { signoutFirebase } from "@/lib";

//CollectionReference<FireStoreThoughtDataType>

//DocumentReference<any, DocumentData>
type SnapshotSource<T> = CollectionReference<T>;

export const onSnapShotCollectionWrapper = <T>(
  source: SnapshotSource<T>,
  onNext: (snapshot: QuerySnapshot<T>) => void,
  onError?: (error: any) => void
): Unsubscribe => {
  return onSnapshot(source, onNext, (error) => {
    console.error("Firestore onSnapshot error:", error);

    if (
      error.code === "permission-denied" ||
      error.code === "unauthenticated"
    ) {
      console.warn("User's session has expired. Signing out...");

      // Optional: show a toast or notification before logging out
      handleAuthError();
    }

    // Forward the error to the caller if they want it
    if (onError) onError(error);
  });
};

export const onSnapShotDocumentWrapper = <T>(
  source: DocumentReference<T, DocumentData>,
  onNext: (snapshot: DocumentSnapshot<T>) => void,
  onError?: (error: any) => void
): Unsubscribe => {
  return onSnapshot(source, onNext, (error) => {
    console.error("Firestore onSnapshot error:", error);

    if (
      error.code === "permission-denied" ||
      error.code === "unauthenticated"
    ) {
      console.warn("User's session has expired. Signing out...");

      // Optional: show a toast or notification before logging out
      handleAuthError();
    }

    // Forward the error to the caller if they want it
    if (onError) onError(error);
  });
};

// Generic wrapper for addDoc
export const addDocWrapper = async <T extends DocumentData>(
  collectionRef: CollectionReference<T>,
  data: T
): Promise<ReturnType<typeof addDoc>> => {
  try {
    return await addDoc(collectionRef, data);
  } catch (error: any) {
    console.error("Firestore addDoc error:", error);

    if (
      error.code === "permission-denied" ||
      error.code === "unauthenticated"
    ) {
      console.warn("User's session has expired. Signing out...");
      await handleAuthError();
    }

    throw error; // rethrow so the caller knows something went wrong
  }
};

// Generic wrapper for getDoc
export const getDocWrapper = async <T extends DocumentData>(
  docRef: DocumentReference<T>
): Promise<DocumentSnapshot<T>> => {
  try {
    const docSnap = await getDoc(docRef);
    return docSnap;
  } catch (error: any) {
    console.error("Firestore getDoc error:", error);

    if (
      error.code === "permission-denied" ||
      error.code === "unauthenticated"
    ) {
      console.warn("User's session has expired. Signing out...");
      await handleAuthError();
    }

    throw error;
  }
};

const handleAuthError = async () => {
  try {
    await signoutFirebase();
  } catch (err) {
    console.warn("Firebase sign-out failed:", err);
  }

  try {
    await nextAuthSignOut({ callbackUrl: "/auth/login" });
  } catch (err) {
    console.warn("NextAuth sign-out failed:", err);
  }
};
