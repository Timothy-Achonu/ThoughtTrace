"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Type of a single query state
export type QueryState<T = unknown> = {
  isLoading: boolean;
  data: T | null;
};

// Key type (array of strings/numbers, like React Query)
export type QueryKey = (string | number)[];

// Context value type
type QueryContextValue = {
  queries: Map<string, QueryState>;
  setQuery: <T>(key: QueryKey, state: QueryState<T>) => void;
  getQuery: <T>(key: QueryKey) => QueryState<T> | undefined;
  initQuery: <T>(key: QueryKey, initial?: QueryState<T>) => QueryState<T>;
};

// 🔑 A helper to generate a stable key string
const makeKey = (key: QueryKey): string => key.join("::");

// Reducer for queries
type Action<T = unknown> = {
  type: "SET_QUERY";
  key: string;
  state: QueryState<T>;
};

function queriesReducer(state: Map<string, QueryState>, action: Action) {
  const newState = new Map(state);
  switch (action.type) {
    case "SET_QUERY":
      newState.set(action.key, action.state);
      return newState;
    default:
      return state;
  }
}

// Create Context
const QueryContext = createContext<QueryContextValue | undefined>(undefined);

// Provider component
export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queries, dispatch] = useReducer(queriesReducer, new Map());

  const setQuery = <T,>(key: QueryKey, state: QueryState<T>) => {
    dispatch({ type: "SET_QUERY", key: makeKey(key), state });
  };

  const getQuery = <T,>(key: QueryKey): QueryState<T> | undefined => {
    return queries.get(makeKey(key)) as QueryState<T> | undefined;
  };

  const initQuery = <T,>(
    key: QueryKey,
    initial: QueryState<T> = { isLoading: true, data: null }
  ): QueryState<T> => {
    const k = makeKey(key);
    const existing = queries.get(k) as QueryState<T> | undefined;
    if (existing) return existing;
    dispatch({ type: "SET_QUERY", key: k, state: initial });
    return initial;
  };

  return (
    <QueryContext.Provider value={{ queries, setQuery, getQuery, initQuery }}>
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
