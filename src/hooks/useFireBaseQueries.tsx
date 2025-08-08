"use client";
import {
  
  CollectionReference,
  QuerySnapshot,

} from "@/app/firebase/config";
import { useState } from "react";
type SnapshotSource<T> = CollectionReference<T>;

import { onSnapShotCollectionWrapper } from "@/lib/common";

//An attempt to abstract isLoading from components fetching collections. This is currently not in use, I might come back to it.
export const useFireBaseQueries = () => {
  const [loadingStates, setLoadingStatus] = useState({
    isLoadingCollection: false,
  });
   function fetchCollection<T>(
    source: SnapshotSource<T>,
    onNext: (snapshot: QuerySnapshot<T>) => void,
    onError?: (error: any) => void
  ) {
    setLoadingStatus((prev) => ({ ...prev, isLoadingCollection: true }));

    const unsubscribe = onSnapShotCollectionWrapper(
      source,
      (snapshot) => {
        onNext(snapshot);
        setLoadingStatus((prev) => ({ ...prev, isLoadingCollection: false }));
        console.log("who was first");
      },
      onError
    );

    return { unsubscribe, isLoading: loadingStates.isLoadingCollection };
  }
  return { fetchCollection };
};
