import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./Signup.jsx";
import { Signin } from "./Signin.jsx";
import { Dashboard } from "./Dashboard.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";


export function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    },
  });
  
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

