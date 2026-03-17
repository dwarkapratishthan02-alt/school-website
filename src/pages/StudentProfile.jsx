import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import "../styles/studentProfile.css";

function StudentProfile() {

  const [profile, setProfile] = useState({
    full_name: "",
    roll_number: "",
    class: "",
    email: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {

    try {

      const { data: { session }, error } =
        await supabase.auth.getSession();

      if (error || !session) {
        console.error("No session found");
        return;
      }

      const userId = session.user.id;

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Profile load error:", profileError.message);
        return;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || "",
          roll_number: data.roll_number || "",
          class: data.class || "",
          email: data.email || session.user.email
        });
      }

    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }

  }

  function handleChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  }

  async function updateProfile(e) {

    e.preventDefault();

    if (!profile.full_name || !profile.class) {
      alert("Name and class are required");
      return;
    }

    setSaving(true);

    try {

      const { data: { session } } =
        await supabase.auth.getSession();

      if (!session) return;

      const userId = session.user.id;

      // 🔥 Update profile table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          roll_number: profile.roll_number,
          class: profile.class,
          updated_at: new Date()
        })
        .eq("id", userId);

      if (profileError) {
        alert("Failed to update profile");
        return;
      }

      // 🔥 SYNC WITH STUDENTS TABLE (IMPORTANT)
      const { data: existingStudent } = await supabase
        .from("students")
        .select("id")
        .eq("email", profile.email)
        .single();

      if (existingStudent) {

        await supabase
          .from("students")
          .update({
            name: profile.full_name,
            roll: profile.roll_number,
            class: profile.class
          })
          .eq("email", profile.email);

      } else {

        // 🔥 Create student if not exists
        await supabase
          .from("students")
          .insert([
            {
              name: profile.full_name,
              roll: profile.roll_number,
              class: profile.class,
              email: profile.email
            }
          ]);

      }

      alert("Profile updated successfully!");

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }

  }

  if (loading) {
    return (
      <section className="student-profile">
        <div className="container">
          <p>Loading profile...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="student-profile">

      <div className="container">

        <h1>Student Profile</h1>

        <div className="profile-card">

          <div className="profile-avatar">
            👨‍🎓
          </div>

          <form onSubmit={updateProfile}>

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={profile.full_name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="roll_number"
              placeholder="Roll Number"
              value={profile.roll_number}
              onChange={handleChange}
            />

            <input
              type="text"
              name="class"
              placeholder="Class"
              value={profile.class}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              value={profile.email}
              disabled
            />

            <button type="submit" disabled={saving}>
              {saving ? "Updating..." : "Update Profile"}
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default StudentProfile;