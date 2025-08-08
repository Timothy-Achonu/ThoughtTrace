// utils/firebaseWrapper.ts

import {
  onSnapshot,
  DocumentReference,
  Unsubscribe,
  DocumentData,
  CollectionReference,
  QuerySnapshot,
  DocumentSnapshot,
  addDoc,
  getDoc,
} from "@/app/firebase/config";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { signoutFirebase } from "@/lib";

type SnapshotSource<T> = CollectionReference<T>;

export const onSnapShotCollectionWrapper = <T>(
  source: SnapshotSource<T>,
  onNext: (snapshot: QuerySnapshot<T>) => void,
  onError?: (error: any) => void
): Unsubscribe => {
  return onSnapshot(source, onNext, (error) => handleError(error, onError));
};

export const onSnapShotDocumentWrapper = <T>(
  source: DocumentReference<T, DocumentData>,
  onNext: (snapshot: DocumentSnapshot<T>) => void,
  onError?: (error: any) => void
): Unsubscribe => {
  return onSnapshot(source, onNext, (error) => handleError(error, onError));
};

// Generic wrapper for addDoc
export const addDocWrapper = async <T extends DocumentData>(
  collectionRef: CollectionReference<T>,
  data: T
): Promise<ReturnType<typeof addDoc> | undefined> => {
  try {
    return await addDoc(collectionRef, data);
  } catch (error: any) {
       handleError(error);

  }
};

// Generic wrapper for getDoc
export const getDocWrapper = async <T extends DocumentData>(
  docRef: DocumentReference<T>
): Promise<DocumentSnapshot<T> | undefined> => {
  try {
    const docSnap = await getDoc(docRef);
    return docSnap;
  } catch (error: any) {
    handleError(error);
  }
};

const handleError = (error: any, onError?: (error: any) => void) => {
  console.error("Firestore onSnapshot error:", error);

  if (error.code === "permission-denied" || error.code === "unauthenticated") {
    console.warn("User's session has expired. Signing out...");

    // Optional: show a toast or notification before logging out
    handleAuthError();
  }

  // Forward the error to the caller if they want it
  if (onError) onError(error);
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
