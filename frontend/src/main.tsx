import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexPage from "./pages/indexPage";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ThemeProvider from "./components/providers/themeProvider";
import LoginPage from "./pages/auth/Login";
import AuthProvider from "./components/providers/AuthProvider";
import RegisterPage from "./pages/auth/Register";
import LoggedOutUserProvider from "./components/providers/NonAuthProvider";

declare global {
  interface Window {
    global: any;
  }
}

window.global = globalThis;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider
        ProtectedPage={<ThemeProvider MainPage={<IndexPage />}></ThemeProvider>}
      ></AuthProvider>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <LoggedOutUserProvider>
        <RegisterPage />
      </LoggedOutUserProvider>
    ),
  },
  {
    path: "/auth/login",
    element: (
      <LoggedOutUserProvider>
        <LoginPage />
      </LoggedOutUserProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <NextThemesProvider defaultTheme="system" attribute="class">
        <RouterProvider router={router}></RouterProvider>
      </NextThemesProvider>
    </NextUIProvider>
  </React.StrictMode>
);
