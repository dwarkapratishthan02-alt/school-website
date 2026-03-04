import { Routes, Route, useLocation } from "react-router-dom";

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

// NEW AUTH PAGES
import AdminLogin from "./pages/AdminLogin";
import StudentLogin from "./pages/StudentLogin";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentSignup from "./pages/StudentSignup";
function App() {
  const location = useLocation();

  // Hide Navbar & Footer on auth/dashboard pages
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/student");

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
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/news" element={<AdminNews />} />

        {/* Student Routes */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/signup" element={<StudentSignup />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;