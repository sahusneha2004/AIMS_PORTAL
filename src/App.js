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
import Landing from '../src/pages/faculty/Landing'
import Home from '../src/pages/faculty/Home';
import Help from '../src/pages/faculty/Help'
import Coursesoffered from '../src/pages/faculty/Courses/coursesOffered'
import Create from '../src/pages/faculty/Courses/Create'
import Offercourse from '../src/pages/faculty/Courses/offerCourse';
import Uploadgrade from '../src/pages/faculty/Courses/uploadGrades';
import Available from '../src/pages/faculty/Courses/Available';

import Actionpending from '../src/pages/faculty/Mywork/actionPending'
import Mycoursesoffered from '../src/pages/faculty/Mywork/myCoursesOffered';
import Mycreatedcourses from '../src/pages/faculty/Mywork/myCreatedCourses';
import Enrolledstudents from '../src/pages/faculty/Mywork/enrolledStudents'


import PendingEnrollments from "../src/pages/student/pending";
import RunningEnrollments from '../src/pages/student/running';
import Navbar from '../src/pages/student/navbar';
import EligibleCourses from '../src/pages/student/enroll'

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
                <ProtectedRoute allowedRoles={["admin", "faculty"]}>
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
            <Route path = "/landing" element ={<Landing/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/help" element={<Help />} />
            <Route path="/coursesoffered" element={<Coursesoffered />} />
            <Route path="/create" element={<Create />} />
            <Route path="/offercourse" element={<Offercourse />} />
            <Route path="/uploadgrade" element={<Uploadgrade />} />
            <Route path="/available" element={<Available />} />
            <Route path="/actionpending" element={<Actionpending />} />
            <Route path="/mycoursesoffered" element={<Mycoursesoffered />} />
            <Route path="/mycreatedcourses" element={<Mycreatedcourses />} />
            <Route path='/enrolledstudents/:id' element={<Enrolledstudents />} />

            <Route path='/student/enrollmentspending' element={<PendingEnrollments />} />
            <Route path='/student/enrollmentsrunning' element={<RunningEnrollments />} />
            <Route path='/student/home' element={< Navbar />} />
            <Route path= '/student/enroll' element={<EligibleCourses />} />
          </Routes>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;