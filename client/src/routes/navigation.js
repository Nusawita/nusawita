import {LoginPage} from "../pages/login-page"
import AuthContext from "../context/auth-context";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {AdminDashboard} from "../pages/admin-dashboard"
import { LandingPage } from "../pages/landing_page";
import { RegisterPages } from "../pages/register-page";
export const Navigation = () => {
  const ctx = useContext(AuthContext); //call auth context
  // render loading page on loading
  if (ctx.loading) {
    return <></>;
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/admin/dashboard"
            element={
              ctx.isAdmin ? <AdminDashboard /> : <Navigate to="/" replace /> //If user is admin go to dashboard else back to landing page
            }
          />
          <Route
            path="/login"
            element={
              ctx.isLoggedIn ? <Navigate to="/" replace /> : <LoginPage /> //If user is logged in, redirect to landing page
            }
          />
          <Route
            path="/register"
            element={
              ctx.isLoggedIn ? <Navigate to="/" replace /> : <RegisterPages /> //If user is logged in, redirect to landing page
            }
          />
        </Routes>
      </Router>
    </>
  );
};
