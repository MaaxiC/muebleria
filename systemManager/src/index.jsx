import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./context/usercontext";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Users/login";
import { NavBar } from "./components/Others/navbar";
//Users
import { NewUser } from "./components/Users/newUser";
import { UserTable } from "./components/Users/userList";
import { ConsultProduct } from "./components/e-commerce/consultProduct";
import { Dashboard } from "./components/e-commerce/dashboard";
import { Order } from "./components/e-commerce/order";
import { Category } from "./components/e-commerce/categories";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProtectedRoute } from "./components/protectedRoutes/protectedRoutes";
import { AboutUs } from "./components/e-commerce/about";
import { Params } from "./components/e-commerce/parameters";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route element={<ProtectedRoute isAllowed={localStorage.getItem('user')} />}>
              <Route
                path="/e-commerce/dashboard"
                element={
                  <>
                    <NavBar />
                    <Dashboard />
                  </>
                }
              ></Route>
              <Route
                path="/Users/newUser"
                element={
                  <>
                    <NavBar />
                    <NewUser />
                  </>
                }
              ></Route>
              <Route
                path="/Users/userList"
                element={
                  <>
                    <NavBar />
                    <UserTable />
                  </>
                }
              ></Route>
              <Route
                path="/e-commerce/consultProduct"
                element={
                  <>
                    <NavBar />
                    <ConsultProduct />
                  </>
                }
              ></Route>
              <Route
                path="/e-commerce/order"
                element={
                  <>
                    <NavBar />
                    <Order />
                  </>
                }
              ></Route>
              <Route
                path="/e-commerce/categories"
                element={
                  <>
                    <NavBar />
                    <Category />
                  </>
                }
              ></Route>
              <Route
                path="/e-commerce/about"
                element={
                  <>
                    <NavBar />
                    <AboutUs />
                  </>
                }
              ></Route>
              <Route
                path="/e-commerce/parameters"
                element={
                  <>
                    <NavBar />
                    <Params />
                  </>
                }
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  </>
);
