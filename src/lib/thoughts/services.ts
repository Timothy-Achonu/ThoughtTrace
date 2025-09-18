import { CreateMessageType, CreateThoughtType } from "./types";
import {
  serverTimestamp,
  thoughtsColRef,
  messagesColRef,
  doc,
  increment,
  thoughtsDocRef,
  writeBatch,
  db,
} from "@/app/firebase/config";
import { addDocWrapper } from "../common";

export async function createThought(
  thought: CreateThoughtType,
  userId: string
) {
  const res = await addDocWrapper<CreateThoughtType>(thoughtsColRef(userId), {
    ...thought,
    createdAt: serverTimestamp(),
  });

  return res;
}

//create message inside a thought
export async function createMessage(
  userId: string,
  thoughtId: string,
  message: CreateMessageType
) {
const batch = writeBatch(db);

  const messageDocRef = doc(messagesColRef(userId, thoughtId));
  const thoughtDocRef = thoughtsDocRef(userId, thoughtId);

  const messageWithTime = {
    ...message,
    createdAt: serverTimestamp(),
  };

  // Add the new message
  batch.set(messageDocRef, {
    ...messageWithTime,
  });

  // Update the parent thought
  batch.update(thoughtDocRef, {
    lastMessage: messageWithTime,
    numberOfMessages: increment(1), // firestore atomic increment
  });

   await batch.commit();
}
