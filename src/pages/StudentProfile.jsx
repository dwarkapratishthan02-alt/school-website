import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

function StudentProfile() {
  const [profile, setProfile] = useState({
    name: "",
    roll: "",
    class: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (!error && data) {
      setProfile(data);
    }

    setLoading(false);
  }

  function handleChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  async function updateProfile(e) {
    e.preventDefault();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { error } = await supabase
      .from("students")
      .update({
        name: profile.name,
        roll: profile.roll,
        class: profile.class,
      })
      .eq("id", session.user.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile updated successfully");
  }

  if (loading) return <p style={{ padding: "80px" }}>Loading...</p>;

  return (
    <div style={{ padding: "80px 0" }}>
      <div className="container">
        <h1>Student Profile</h1>

        <form
          onSubmit={updateProfile}
          style={{
            maxWidth: "500px",
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name || ""}
            onChange={handleChange}
          />

          <input
            type="text"
            name="roll"
            placeholder="Roll Number"
            value={profile.roll || ""}
            onChange={handleChange}
          />

          <input
            type="text"
            name="class"
            placeholder="Class"
            value={profile.class || ""}
            onChange={handleChange}
          />

          <input
            type="email"
            value={profile.email || ""}
            disabled
          />

          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default StudentProfile;