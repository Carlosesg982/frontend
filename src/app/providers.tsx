"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/src/lib/store";

export default function Providers({ children }: { children: ReactNode }) {
  const store: AppStore = makeStore();

  return <Provider store={store}>{children}</Provider>;
}
