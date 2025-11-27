import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Dashboard } from "@/components/Dashboard";
import BriefingGenerator from "@/components/BriefingGenerator";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";
import PublicLayout from "./pages/PublicLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthenticatedLayout from "./pages/AuthenticatedLayout";

// export const API_ENDPOINT = "http://localhost:3000";
export const API_ENDPOINT = "https://ignite-briefs-api.vercel.app";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route element={<AuthenticatedLayout />}>
                <Route
                  path="/dashboard"
                  element={
                      <Dashboard />
                  }
                />
                <Route path="/dashboard/new/:step?" element={<BriefingGenerator onBack={() => {}} />} />
              </Route>
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
