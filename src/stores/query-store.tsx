import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface QueryState {
  query: string;
  isProcessing: boolean;
  setQuery: (query: string) => void;
  setIsProcessing: (processing: boolean) => void;
  clearQuery: () => void;
}

export const useQueryStore = create<QueryState>()(
  devtools(
    (set) => ({
      query: "",
      isProcessing: false,
      setQuery: (query: string) => set({ query }),
      setIsProcessing: (processing: boolean) =>
        set({ isProcessing: processing }),
      clearQuery: () => set({ query: "" }),
    }),
    {
      name: "query-store",
    }
  )
);
