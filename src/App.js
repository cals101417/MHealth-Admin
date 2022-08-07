import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { ForgotPassword } from "./components/ForgotPassword";
import { Home } from "./pages/Home";
import { Patients } from "./pages/Patients";
import { Chats } from "./pages/Chats";
import { Document } from "./pages/Document";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UnprotectedRoute } from "./components/UnprotectedRoute";
import { AuthProvider } from "./context/UserAuthContext";
import { Counsellingpending } from "./pages/Bookings/Counsellingpending";
import { Counsellingapproved } from "./pages/Bookings/Counsellingapproved";
import { Counsellingcancelled } from "./pages/Bookings/Counsellingcancelled";
import { Assesmentapprove } from "./pages/Bookings/Assesmentapprove";
import { Assesmentcancelled } from "./pages/Bookings/Assesmentcancelled";
import { Assesmentpending } from "./pages/Bookings/Assesmentpending";
import { Seminarapprove } from "./pages/Bookings/Seminarapprove";
import { Seminarpending } from "./pages/Bookings/Seminarpending";
import { Seminarcancelled } from "./pages/Bookings/Seminarcancelled";
import { Medhistory } from "./pages/Medhistory";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Patients"
          exact
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Counsellingpending"
          exact
          element={
            <ProtectedRoute>
              <Counsellingpending />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Counsellingapproved"
          exact
          element={
            <ProtectedRoute>
              <Counsellingapproved />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Counsellingcancelled"
          exact
          element={
            <ProtectedRoute>
              <Counsellingcancelled />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Assesmentapprove"
          exact
          element={
            <ProtectedRoute>
              <Assesmentapprove />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Assesmentpending"
          exact
          element={
            <ProtectedRoute>
              <Assesmentpending />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Assesmentcancelled"
          exact
          element={
            <ProtectedRoute>
              <Assesmentcancelled />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Seminarapprove"
          exact
          element={
            <ProtectedRoute>
              <Seminarapprove />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Seminarpending"
          exact
          element={
            <ProtectedRoute>
              <Seminarpending />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Seminarcancelled"
          exact
          element={
            <ProtectedRoute>
              <Seminarcancelled />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Chats"
          exact
          element={
            <ProtectedRoute>
              <Chats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Document"
          exact
          element={
            <ProtectedRoute>
              <Document />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Medhistory"
          exact
          element={
            <ProtectedRoute>
              <Medhistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Login"
          exact
          element={
            <UnprotectedRoute>
              <Login />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/Signup"
          exact
          element={
            <UnprotectedRoute>
              <Signup />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/ForgotPassword"
          exact
          element={
            <UnprotectedRoute>
              <ForgotPassword />
            </UnprotectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
