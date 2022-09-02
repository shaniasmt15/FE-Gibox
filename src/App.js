import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RouteGuard } from "./RouteGuard";
import { Login, Books, RentBook, Students, NotFound } from "./pages";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <Fragment>
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
            path="/rent_book"
            element={
              <MainLayout>
                <RentBook />
              </MainLayout>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
