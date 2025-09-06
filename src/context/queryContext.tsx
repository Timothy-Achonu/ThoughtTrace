'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";
import { QUERY_KEYS } from "@/utils";

// Type of a single query state
type QueryState<T = any> = {
  isLoading: boolean;
  data: T | null;
};

// Type of the queries object (keys can be any string)
type QueriesState = {
  [key: string]: QueryState;
};

// Context value type
type QueryContextValue = {
  queries: QueriesState;
  setQuery: <T = any>(key: string, state: QueryState<T>) => void;
  getQuery: <T>(key: string) => QueryState<T>;
};

// Build initial state automatically from QUERY_KEYS
const buildInitialQueriesState = (): QueriesState => {
  return Object.keys(QUERY_KEYS).reduce((acc, key) => {
    acc[key as keyof typeof QUERY_KEYS] = { isLoading: true, data: null };
    return acc;
  }, {} as QueriesState);
};

// Create Context
const QueryContext = createContext<QueryContextValue | undefined>(undefined);

// Provider component
export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queries, setQueries] = useState<QueriesState>(buildInitialQueriesState());
 const getQuery = <T,>(key:string) : QueryState<T> => {
      return queries[key]
 }
  const setQuery = <T,>(key: string, state: QueryState<T>) => {
    setQueries((prev) => ({
      ...prev,
      [key]: state,
    }));
  };


  return (
    <QueryContext.Provider value={{ queries, setQuery, getQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

// Custom hook for consuming
export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error("useQueryContext must be used within a QueryProvider");
  }
  return context;
};
