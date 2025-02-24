import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { GlobalStyled } from "./GlobalStyled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyled />
      <Router></Router>
    </QueryClientProvider>
  </React.StrictMode>
);
