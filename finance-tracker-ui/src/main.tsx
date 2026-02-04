import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/*"
            element={
              <QueryClientProvider client={queryClient}>
                <App />{" "}
              </QueryClientProvider>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
