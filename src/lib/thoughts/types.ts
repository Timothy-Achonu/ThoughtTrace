import { Timestamp, FieldValue } from "@/app/firebase/config";

type BaseMessageType = {
  body?: string;
  downloadURL?: string;
};

export type CreateMessageType = BaseMessageType & {
  createdAt?: FieldValue;
};

//The reason for this separate firestore typing is because firestore doesn't return the id of a document in the same place it returns the rest of the of other properties: doc.data() doesn't contain id.
export type FirestoreMessageDataType = CreateMessageType & {
  createdAt?: Timestamp; // createdAt is optional because of the optimistic update. When a message is created it is first added to the UI before the network request to create the message is complete, so at that point it doesn't have a createdAt value yet.
  updatedAt?: string;
};

export type MessageType = FirestoreMessageDataType & { id: string };

export type MessagesGroupedByDateType = {
  day: string;
  messages: MessageType[];
};

 type BaseThoughtType = {
  title: string;
};
export type CreateThoughtType = BaseThoughtType & {
  createdAt?: FieldValue;
};

export type FireStoreThoughtDataType = CreateThoughtType & {
  messages?: MessageType[];
  createdAt?: Timestamp;
};
export type ThoughtType = FireStoreThoughtDataType & {
  id: string;
};
