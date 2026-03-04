import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      setAuthorized(false);
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (profile?.role === "admin") {
      setAuthorized(true);
    }

    setLoading(false);
  }

  if (loading) return <p>Loading...</p>;

  if (!authorized) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}

export default AdminRoute;