import { getDocs, onSnapshot } from "@/app/firebase/config";
import { CreateMessageType, CreateThoughtType, FirestoreMessageDataType, FireStoreThoughtDataType } from "./types";
import {
  serverTimestamp,
  addDoc,
  thoughtsColRef,
  messagesColRef,
} from "@/app/firebase/config";
import { ThoughtType } from "./types";
import { addDocWrapper } from "../common";

export async function createThought(
  thought: CreateThoughtType,
  userId: string
) {
  await addDocWrapper<CreateThoughtType>(thoughtsColRef(userId), {
    ...thought,
    createdAt: serverTimestamp(),
  });
}

//create message inside a thought
export async function createMessage(
  userId: string,
  thoughtId: string,
  message: CreateMessageType
) {
  const response = await addDocWrapper<CreateMessageType>(messagesColRef(userId, thoughtId), {
    ...message,
    createdAt: serverTimestamp(),
  });
}
