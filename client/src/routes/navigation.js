import { LoginPage } from "../pages/login-page";
import AuthContext from "../context/auth-context";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdminDashboardLanding } from "../pages/AdminDashboard/admin-dashboard-landing";
import { LandingPage } from "../pages/LandingPage/landing_page";
import { RegisterPages } from "../pages/register-page";
import { AdminDashboardUsers } from "../pages/AdminDashboard/admin-dashboard-users";
import AdminDashboardTourism from "../pages/AdminDashboard/admin-dashboard-tourism";
import EmailVerificationPage from "../pages/email-verification-page";
import ProfilePage from "../pages/Profile/profile-page";
import { ProfileContextProvider } from "../pages/Profile/components/context/profile-context";
import ChangePasswordPage from "../pages/ChangePassword/change-password-page";
export const Navigation = () => {
  const ctx = useContext(AuthContext); //call auth context
  // render loading page on loading
  if (ctx.loading) {
    return <></>;
  }
  return (
    <>
      <Router>
        {/* User Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
          <Route
            path="/admin/dashboard"
            element={
              ctx.isAdmin ? (
                <AdminDashboardLanding />
              ) : (
                <Navigate to="/" replace />
              ) //If user is admin go to dashboard else back to landing page
            }
          />
          <Route
            path="/admin/dashboard/users"
            element={
              ctx.isAdmin ? (
                <AdminDashboardUsers />
              ) : (
                <Navigate to="/" replace />
              ) //If user is admin go to dashboard else back to landing page
            }
          />
          <Route
            path="/admin/dashboard/tourism"
            element={
              ctx.isAdmin ? (
                <AdminDashboardTourism />
              ) : (
                <Navigate to="/" replace />
              ) //If user is admin go to dashboard else back to landing page
            }
          />
          <Route
            path="/email-verification"
            element={<EmailVerificationPage />}
          />
          <Route
            path="/profile"
            element={
              ctx.isLoggedIn ? (
                <ProfileContextProvider>
                  <ProfilePage />
                </ProfileContextProvider>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/edit-password"
            element={<ChangePasswordPage/> }
          />
        </Routes>
      </Router>
    </>
  );
};
