import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";

function StudentDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkStudent = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/student/login");
      }
    };

    checkStudent();
  }, [navigate]);

  return (
    <div style={{ padding: "80px 0" }}>
      <div className="container">
        <h1>Student Dashboard</h1>
        <p>Welcome Student 👋</p>

        <ul>
          <li>View Notices</li>
          <li>Download Study Material</li>
          <li>Check Attendance</li>
          <li>View Results</li>
        </ul>
      </div>
    </div>
  );
}

export default StudentDashboard;