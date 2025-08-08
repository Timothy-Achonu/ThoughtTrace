"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  FireStoreThoughtDataType,
  MessagesGroupedByDateType,
  MessageType,
  ThoughtType,
} from "@/lib/thoughts";
import {
  messagesColRef,
  thoughtsDocRef,
} from "@/app/firebase/config";
import { useSession } from "next-auth/react";
import { getFormattedDate } from "@/utils";
import { Timestamp } from "@/app/firebase/config";
import { useParams } from "next/navigation";
import {
  onSnapShotCollectionWrapper,
  onSnapShotDocumentWrapper,
} from "@/lib/common";

interface MessagesContextProps {
  stateMessages: MessagesGroupedByDateType[] | null;
  setMessages: React.Dispatch<
    React.SetStateAction<MessagesGroupedByDateType[] | null>
  >;
  isLoadingMessages: boolean;
  setIsLoadingMessages: React.Dispatch<React.SetStateAction<boolean>>;
  currentThought: ThoughtType | null;
}

const MessagesContext = createContext<MessagesContextProps | undefined>(
  undefined
);

interface MessagesProviderProps {
  children: ReactNode;
}

export const groupMessagesByDate = (messages: MessageType[]) => {
  const groupMap = new Map<string, MessageType[]>();
  const todayDate = new Date();
  messages.forEach((note) => {
    const createdAt = note.createdAt || todayDate;
    const currentDay = getFormattedDate(createdAt as Timestamp).day;
    if (!groupMap.has(currentDay)) {
      groupMap.set(currentDay, []);
    }
    groupMap.get(currentDay)!.push(note);
  });

  return Array.from(groupMap, ([day, messages]) => ({ day, messages }));
};

export const MessagesProvider: React.FC<MessagesProviderProps> = ({
  children,
}) => {
  const { data: session } = useSession();
  const params = useParams();
  const { thought } = params;

  const [stateMessages, setMessages] = useState<
    MessagesGroupedByDateType[] | null
  >(null);
  const [currentThought, setCurrentThought] = useState<ThoughtType | null>(
    null
  );
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) return;
    setIsLoadingMessages(true);

    let messages: MessageType[] = [];
    const unsubscribe = onSnapShotCollectionWrapper(
      messagesColRef(userId, thought as string),
      (snapshot) => {
        messages = [];
        snapshot.docs.forEach((doc) => {
          messages.push({
            body: doc.data().body,
            downloadURL: doc.data().downloadURL,
            id: doc.id,
            createdAt: doc.data().createdAt,
          });
        });
        setIsLoadingMessages(false);
        const groups = groupMessagesByDate(messages);
        // const lastGroup = groups[groups.length - 1];
        // if (lastGroup?.messages[lastGroup.messages.length - 1].createdAt) {
        setMessages(groups);
        // }
      }
    );


    const unsubThoughtDoc = onSnapShotDocumentWrapper<FireStoreThoughtDataType>(
      thoughtsDocRef(userId, thought as string),
      (snapshot) => {
        const data = snapshot.data();
        if (!data || !data.title) return;
        const thought = { ...data, id: snapshot.id };
        setCurrentThought(thought);
      }
    );
    return () => {
      unsubscribe();
      unsubThoughtDoc();
    }; // cleanup

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <MessagesContext.Provider
      value={{
        stateMessages,
        setMessages,
        isLoadingMessages,
        setIsLoadingMessages,
        currentThought,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessagesContext = (): MessagesContextProps => {
  const context = useContext(MessagesContext);

  if (!context) {
    throw new Error(
      "useMessagesContext must be used within a MessagesProvider"
    );
  }

  return context;
};
