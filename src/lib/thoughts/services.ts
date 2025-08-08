import { CreateMessageType, CreateThoughtType, } from "./types";
import {
  serverTimestamp,
  thoughtsColRef,
  messagesColRef,
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
  const response = await addDocWrapper<CreateMessageType>(messagesColRef(userId, thoughtId), {
    ...message,
    createdAt: serverTimestamp(),
  });
  return response;
}
