import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  Timestamp,
  orderBy,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  CollectionReference,
  FieldValue,
  DocumentReference
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { FirestoreMessageDataType, FireStoreThoughtDataType } from "@/lib";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSENGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const firebaseAuth = getAuth(app);

const colRef = collection(db, "todos");
const usersColRef = collection(db, "usersColRef");
const thoughtsColRef = (userId: string) => {
  return collection(
    db,
    "users",
    userId,
    "thoughts"
  ) as CollectionReference<FireStoreThoughtDataType>;
};
const thoughtsDocRef = (userId: string, thoughtId: string) => {
  return doc(
    db,
    "users",
    userId,
    "thoughts",
    thoughtId
  ) as DocumentReference<FireStoreThoughtDataType>;
};
const messagesColRef = (userId: string, thoughtId: string) => {
  return collection(
    db,
    "users",
    userId,
    "thoughts",
    thoughtId,
    "messages"
  ) as CollectionReference<FirestoreMessageDataType>;
};
const functions = getFunctions(app);
const getServerTime = httpsCallable<{}, { now: Timestamp }>(
  functions,
  "getServerTime"
);

export {
  app,
  auth,
  db,
  colRef,
  getDocs,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  addDoc,
  usersColRef,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  Timestamp,
  firebaseAuth,
  orderBy,
  functions,
  getServerTime,
  updateDoc,
  doc,
  setDoc,
  thoughtsColRef,
  messagesColRef,
  getDoc,
  FieldValue,
  thoughtsDocRef,
};
