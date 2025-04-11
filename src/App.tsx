import CssBaseline from "@mui/material/CssBaseline";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";

import Footer from "./components/Footer";
import { ContextProvider } from "./contexts/ContentProvider";
import "./index.css";
import Edit from "./pages/Edit";
import EditProfile from "./pages/EditProfile";
import Form from "./pages/Form";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import ProductList from "./pages/ProductList";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const routes = [
  {
    path: "/",
    element: (
      <>
        <CssBaseline />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />
          <ContextProvider>
            <main
              style={{
                display: "flex",
                height: "100vh",
                flexDirection: "row",
              }}
            >
              <Outlet />
            </main>
          </ContextProvider>
          <Footer />
        </div>
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "products",
            children: [
              {
                path: "all",
                element: <ProductList />,
              },
              {
                path: "add",
                element: (
                  <>
                    <Form />
                  </>
                ),
              },
              {
                path: "edit/:editID",
                element: (
                  <>
                    <Edit />
                  </>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "/login",
        children: [
          {
            path: "signup",
            element: <SignUp />,
          },
          {
            path: "signin",
            element: <SignIn />,
          },
          {
            path: "account",
            element: <EditProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
];

const router = createBrowserRouter(routes, { basename: "/app" });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
