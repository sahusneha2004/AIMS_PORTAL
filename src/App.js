import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the OAuth provider
import Login from "./pages/login";
import LoginOptions from "./pages/loginOptions";
import AdminLogin from "./pages/admin/admin";
import CoursesOfferedForEnrollment from "./pages/admin/coursesOfferedForEnrollment";
import Departments from "./pages/admin/departments";
import CoursesOfferedForOffering from "./pages/admin/coursesOfferedForOffering";
import AcademicProfiles from "./pages/admin/academicProfiles";
import { AuthProvider} from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <GoogleOAuthProvider clientId="356670906449-op3cr5hkdf4j3ppil0l7bhsbjvanecfg.apps.googleusercontent.com">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
           
            <Route path="/login-options" element={<LoginOptions />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminLogin />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="admin/courses-offered-for-enrollment"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CoursesOfferedForEnrollment />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/courses-offered-for-offering"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CoursesOfferedForOffering />
                </ProtectedRoute>
              }
            />

            <Route
              path="admin/departments"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Departments />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/academic-profiles"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AcademicProfiles />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;