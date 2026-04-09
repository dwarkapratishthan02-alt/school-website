import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./config/supabase";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudentLayout from "./components/StudentLayout";

/* Public Pages */
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import News from "./pages/News";
import FacilitiesPage from "./pages/FacilitiesPage";


/* Admin Pages */
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNews from "./pages/AdminNews";
import AdminStudents from "./pages/AdminStudents";
import AdminSlider from "./pages/AdminSlides";
import AdminGallery from "./pages/AdminGallery";
import AdminMaterials from "./pages/AdminMaterials";
import AdminAttendance from "./pages/AdminAttendance";
import AdminResults from "./pages/AdminResults";

/* 🔥 NEW: CONTACT MESSAGES PAGE */
import ContactMessages from "./pages/ContactMessages";

/* Student Pages */
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";

/* Student Modules */
import StudyMaterial from "./pages/student/StudyMaterial";
import Attendance from "./pages/student/Attendance";
import Results from "./pages/student/Results";
import Notices from "./pages/student/Notices";

function App() {

  const location = useLocation();

  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initAuth();
  }, []);

  async function initAuth() {

    const { data } = await supabase.auth.getSession();
    const currentSession = data?.session;

    setSession(currentSession);

    if (!currentSession) {
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", currentSession.user.id)
      .maybeSingle();

    if (profile?.role === "admin") {
      setIsAdmin(true);
    }

    setLoading(false);
  }

  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/student");

  if (loading) return null;

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />
        <Route path="/facilities" element={<FacilitiesPage />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/news" element={isAdmin ? <AdminNews /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/students" element={isAdmin ? <AdminStudents /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/materials" element={isAdmin ? <AdminMaterials /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/attendance" element={isAdmin ? <AdminAttendance /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/results" element={isAdmin ? <AdminResults /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/sliders" element={isAdmin ? <AdminSlider /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/gallery" element={isAdmin ? <AdminGallery /> : <Navigate to="/admin/login" />} />

        {/* 🔥 NEW ROUTE: CONTACT INQUIRIES */}
        <Route
          path="/admin/messages"
          element={isAdmin ? <ContactMessages /> : <Navigate to="/admin/login" />}
        />

        {/* ================= STUDENT AUTH ================= */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignup />} />

        {/* ================= STUDENT PANEL ================= */}

        <Route
          path="/student/dashboard"
          element={
            session ? (
              <StudentLayout>
                <StudentDashboard />
              </StudentLayout>
            ) : (
              <Navigate to="/student/login" />
            )
          }
        />

        <Route
          path="/student/profile"
          element={
            session ? (
              <StudentLayout>
                <StudentProfile />
              </StudentLayout>
            ) : (
              <Navigate to="/student/login" />
            )
          }
        />

        <Route
          path="/student/study-material"
          element={
            session ? (
              <StudentLayout>
                <StudyMaterial />
              </StudentLayout>
            ) : (
              <Navigate to="/student/login" />
            )
          }
        />

        <Route
          path="/student/attendance"
          element={
            session ? (
              <StudentLayout>
                <Attendance />
              </StudentLayout>
            ) : (
              <Navigate to="/student/login" />
            )
          }
        />

        <Route
          path="/student/results"
          element={
            session ? (
              <StudentLayout>
                <Results />
              </StudentLayout>
            ) : (
              <Navigate to="/student/login" />
            )
          }
        />

        <Route
          path="/student/notices"
          element={
            session ? (
              <StudentLayout>
                <Notices />
              </StudentLayout>
            ) : (
              <Navigate to="/student/login" />
            )
          }
        />

      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;