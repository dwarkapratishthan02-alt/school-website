import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./config/supabase";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import News from "./pages/News";
import AdminNews from "./pages/AdminNews";

import AdminLogin from "./pages/AdminLogin";
import StudentLogin from "./pages/StudentLogin";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentSignup from "./pages/StudentSignup";
import StudentProfile from "./pages/StudentProfile";
import AdminStudents from "./pages/AdminStudents";
function App() {
  const location = useLocation();

  const [isAdmin, setIsAdmin] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);

    if (!session) {
      setIsAdmin(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (profile?.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }

  // Hide Navbar & Footer on auth/dashboard pages
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/student");

  if (isAdmin === null) return null;

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />
          }
        />

        <Route
          path="/admin/news"
          element={isAdmin ? <AdminNews /> : <Navigate to="/admin/login" />}
        />

        {/* Student Routes */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignup />} />

        <Route
          path="/student/dashboard"
          element={
            session ? <StudentDashboard /> : <Navigate to="/student/login" />
          }
        />

        <Route
          path="/student/profile"
          element={
            session ? <StudentProfile /> : <Navigate to="/student/login" />
          }
        />
      </Routes>
          <Route
  path="/admin/students"
  element={isAdmin ? <AdminStudents /> : <Navigate to="/admin/login" />}
/>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;