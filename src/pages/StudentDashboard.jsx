import { useNavigate } from "react-router-dom";
import {
  useEffect,
  useState,
  useCallback,
} from "react";

import { supabase } from "../config/supabase";

import "../styles/studentDashboard.css";

import {
  FaUser,
  FaBook,
  FaPhoneAlt,
} from "react-icons/fa";

import { HiDocumentReport } from "react-icons/hi";

import { MdEmail } from "react-icons/md";

function StudentDashboard() {

  const navigate = useNavigate();

  const [student, setStudent] =
    useState(null);

  const [latestResult, setLatestResult] =
    useState(null);

  const [materialsCount, setMaterialsCount] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  /* ===================================== */
  /* FETCH RESULTS */
  /* ===================================== */
  const fetchResults = useCallback(
    async (studentId) => {

      try {

        const { data, error } =
          await supabase
            .from("results")
            .select("*")
            .eq("student_id", studentId)
            .order("created_at", {
              ascending: false,
            })
            .limit(1);

        if (error) {
          console.log(error);
          return;
        }

        setLatestResult(data?.[0] || null);

      } catch (err) {

        console.log(err);
      }
    },
    []
  );

  /* ===================================== */
  /* FETCH MATERIALS */
  /* ===================================== */
  const fetchMaterials = useCallback(
    async (studentClass) => {

      try {

        const normalizedClass =
          String(Number(studentClass));

        const { data, error } =
          await supabase
            .from("study_materials")
            .select("id")
            .eq("class", normalizedClass);

        if (error) {
          console.log(error);
          return;
        }

        setMaterialsCount(
          data?.length || 0
        );

      } catch (err) {

        console.log(err);
      }
    },
    []
  );

  /* ===================================== */
  /* INIT DASHBOARD */
  /* ===================================== */
  const initDashboard = useCallback(
    async () => {

      try {

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {

          navigate("/student/login");

          return;
        }

        console.log(
          "Logged In User:",
          user.email
        );

        /* ============================= */
        /* GET STUDENT */
        /* ============================= */
        const { data, error } =
          await supabase
            .from("students")
            .select("*")
            .eq("email", user.email);

        if (error) {

          console.log(error);

          setLoading(false);

          return;
        }

        if (
          !data ||
          data.length === 0
        ) {

          console.log(
            "No student found"
          );

          setLoading(false);

          return;
        }

        const studentData = data[0];

        console.log(
          "Student Data:",
          studentData
        );

        setStudent(studentData);

        /* ============================= */
        /* LOAD DASHBOARD DATA */
        /* ============================= */
        await Promise.all([
          fetchResults(studentData.id),

          fetchMaterials(
            studentData.class
          ),
        ]);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    },
    [
      fetchResults,
      fetchMaterials,
      navigate,
    ]
  );

  /* ===================================== */
  /* USE EFFECT */
  /* ===================================== */
  useEffect(() => {

    initDashboard();

  }, [initDashboard]);

  /* ===================================== */
  /* LOADING */
  /* ===================================== */
  if (loading) {

    return (
      <section className="student-dashboard">

        <div className="container">

          <p>
            Loading dashboard...
          </p>

        </div>

      </section>
    );
  }

  /* ===================================== */
  /* NO STUDENT */
  /* ===================================== */
  if (!student) {

    return (
      <section className="student-dashboard">

        <div className="container">

          <p>
            No student data found.
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="student-dashboard">

      <div className="container">

        {/* ===================================== */}
        {/* HEADER */}
        {/* ===================================== */}
        <div className="dashboard-header">

          <h1>
            Student Dashboard
          </h1>

          <p>
            Welcome back{" "}
            {student.name} 👋
          </p>

        </div>

        {/* ===================================== */}
        {/* PROFILE HERO */}
        {/* ===================================== */}
        <div className="dashboard-profile-hero">

          <div className="profile-left">

            <img
              src={
                student.profile_image ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Student"
              className="student-profile-img"
            />

            <div className="profile-info">

              <h2>
                {student.name}
              </h2>

              <div className="profile-detail">

                <MdEmail />

                <span>
                  {student.email}
                </span>

              </div>

              <div className="profile-detail">

                <FaPhoneAlt />

                <span>
                  {student.mobile ||
                    "No mobile number"}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ===================================== */}
        {/* DASHBOARD CARDS */}
        {/* ===================================== */}
        <div className="dashboard-grid">

          {/* MATERIALS */}
          <div
            className="dashboard-card"
            onClick={() =>
              navigate(
                "/student/study-material"
              )
            }
          >

            <div className="card-icon blue">

              <FaBook />

            </div>

            <div>

              <h3>
                {materialsCount}
              </h3>

              <p>
                Study Materials
              </p>

            </div>

          </div>

          {/* RESULTS */}
          <div
            className="dashboard-card"
            onClick={() =>
              navigate(
                "/student/results"
              )
            }
          >

            <div className="card-icon purple">

              <HiDocumentReport />

            </div>

            <div>

              <h3>
                {latestResult
                  ? "Available"
                  : "--"}
              </h3>

              <p>
                Latest Result
              </p>

            </div>

          </div>

          {/* CLASS */}
          <div
            className="dashboard-card"
          >

            <div className="card-icon green">

              <FaUser />

            </div>

            <div>

              <h3>
                Class{" "}
                {String(
                  Number(student.class)
                )}
              </h3>

              <p>
                Student Class
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default StudentDashboard;