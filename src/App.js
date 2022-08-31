import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RouteGuard } from "./utils/RouteGuard";
import { Login, Books, Students, Rent, NotFound } from "./pages";
import MainLayout from "./Components/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RouteGuard />}>
          <Route
            path="/books"
            element={
              <MainLayout>
                <Books />
              </MainLayout>
            }
          />
          <Route
            path="/students"
            element={
              <MainLayout>
                <Students />
              </MainLayout>
            }
          />
          <Route
            path="/rent"
            element={
              <MainLayout>
                <Rent />
              </MainLayout>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
