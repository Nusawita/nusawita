import "./App.css";
import { AdminLoginPage } from "./pages/admin/admin-login-page";
import AuthContext from "./context/auth-context";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdminDashboard } from "./pages/admin/admin-dashboard";

function App() {
  const ctx = useContext(AuthContext)
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              ctx.isLoggedIn ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              ctx.isLoggedIn ? (
                <AdminDashboard/>
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
          <Route
            path="/admin/login"
            element={
              ctx.isLoggedIn ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AdminLoginPage />
              )
            }
          />
        </Routes>
      </Router>
      {/* <AdminLoginPage /> */}
    </>
  );
}

export default App;
