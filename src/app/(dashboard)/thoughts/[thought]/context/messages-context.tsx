"use client";

import React, {
  createContext,
  useContext,
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
  orderBy,
  query,
  thoughtsDocRef,
} from "@/app/firebase/config";
import { useSession } from "next-auth/react";
import { getFormattedDate, QUERY_KEYS } from "@/utils";
import { Timestamp } from "@/app/firebase/config";
import { useParams } from "next/navigation";
import {
  onSnapShotCollectionWrapper,
  onSnapShotDocumentWrapper,
} from "@/lib/common";
import { useQueryContext, QueryKey } from "@/context";
import dayjs from "dayjs";

interface MessagesContextProps {
  stateMessages: MessagesGroupedByDateType[] | null;
  isLoadingMessages: boolean;
  isLoadingThought: boolean;
  currentThought: ThoughtType | null;
  messagesQueryKeys: QueryKey;
  thoughtQueryKeys: QueryKey;
  setMessages: (data: MessagesGroupedByDateType[]) => void;
  insetNewMessage: (newMessage: MessageType) => MessagesGroupedByDateType[] | null


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
  const { thought: thoughtId } = params;
  const { initQuery, setQuery } = useQueryContext();
    const messagesQueryKeys =  [
    QUERY_KEYS.MESSAGES,
    thoughtId as string,
  ]

  const messagesRes = initQuery<MessagesGroupedByDateType[]>(messagesQueryKeys);
  const { isLoading: isLoadingMessages } = messagesRes;


  const thoughtQueryKeys = [QUERY_KEYS.THOUGHT, thoughtId as string]
  const { isLoading: isLoadingThought, data: currentThought } =
    initQuery<ThoughtType>(thoughtQueryKeys);
  const userId = session?.user.id;


  useEffect(() => {
    if (!userId) return;

    const messagesQuery = query(
      messagesColRef(userId, thoughtId as string),
      orderBy("createdAt", "asc") // ascending = latest last
    );

    let messages: MessageType[] = [];
    const unsubscribe = onSnapShotCollectionWrapper(
      messagesQuery,
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
        const groups = groupMessagesByDate(messages);
        // const lastGroup = groups[groups.length - 1];
        // if (lastGroup?.messages[lastGroup.messages.length - 1].createdAt) {
        // setMessages(groups);
        setQuery<MessagesGroupedByDateType[]>(
          messagesQueryKeys,
          { isLoading: false, data: groups }
        );
        // }
      }
    );

    ///Getting current doc  
    const unsubThoughtDoc = onSnapShotDocumentWrapper<FireStoreThoughtDataType>(
      thoughtsDocRef(userId, thoughtId as string),
      (snapshot) => {
        const data = snapshot.data();
        if (!data || !data.title) return;
        const thought = { ...data, id: snapshot.id };
        setQuery<ThoughtType>(thoughtQueryKeys, {
          isLoading: false,
          data: thought,
        });
      }
    );
    return () => {
      unsubscribe();
      unsubThoughtDoc();
    }; // cleanup

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);


  const setMessages = (data: MessagesGroupedByDateType[]) => {
     setQuery<MessagesGroupedByDateType[]>(
          messagesQueryKeys,
          { ...messagesRes, data: data }
        );
  }

  const insetNewMessage = (
    newMessage: MessageType
  ) => {
    const today = dayjs().format("DD MMMM YYYY");
    const messagesGroupByDate = messagesRes.data
    const existingGroup = messagesGroupByDate?.find(
      (group) => group.day === today
    );
    if (existingGroup) {
      return (
        messagesGroupByDate?.map((group) =>
          group.day === today
            ? {
                ...group,
                messages: [...group.messages, newMessage],
              }
            : group
        ) || null
      );
    } else {
      return messagesGroupByDate
        ? [...messagesGroupByDate, { day: today, messages: [newMessage] }]
        : messagesGroupByDate;
    }
  };
  
  return (
    <MessagesContext.Provider
      value={{
        stateMessages: messagesRes.data,
        isLoadingMessages,
        currentThought,
        isLoadingThought,
        messagesQueryKeys,
        thoughtQueryKeys,
        setMessages,
        insetNewMessage,
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
