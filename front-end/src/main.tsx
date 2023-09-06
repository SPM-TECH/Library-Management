import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalContextProvider from "./context/GlobalContext.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/router.tsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </GlobalContextProvider>
  </React.StrictMode>
);
