import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminMaterials.css";

function AdminMaterials() {

  const [materials, setMaterials] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    class: "",
    type: "book",
    file: null,
    link: "",
  });

  const [loading, setLoading] = useState(false);

  const classOptions = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  /* ============================= */
  /* LOAD MATERIALS */
  /* ============================= */
  useEffect(() => {
    loadMaterials();
  }, []);

  async function loadMaterials() {

    try {

      const { data, error } = await supabase
        .from("study_materials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setMaterials(data || []);

      const uniqueClasses = [
        ...new Set(
          (data || [])
            .map((m) => String(m.class).trim())
            .filter(Boolean)
        ),
      ];

      setClasses(uniqueClasses);

    } catch (err) {
      console.log(err);
    }
  }

  /* ============================= */
  /* HANDLE CHANGE */
  /* ============================= */
  function handleChange(e) {

    const { name, value, files } = e.target;

    if (name === "file") {

      setFormData((prev) => ({
        ...prev,
        file: files[0],
      }));

    } else {

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  /* ============================= */
  /* HANDLE SUBMIT */
  /* ============================= */
  async function handleSubmit(e) {

    e.preventDefault();

    if (loading) return;

    if (!formData.title) {
      alert("Please enter title");
      return;
    }

    if (!formData.class) {
      alert("Please select class");
      return;
    }

    if (!formData.subject) {
      alert("Please enter subject");
      return;
    }

    if (formData.type === "book" && !formData.file) {
      alert("Please upload PDF file");
      return;
    }

    if (formData.type === "video" && !formData.link) {
      alert("Please enter video link");
      return;
    }

    setLoading(true);

    try {

      let fileUrl = "";

      /* ============================= */
      /* PDF UPLOAD */
      /* ============================= */
      if (formData.type === "book") {

        const fileName = `${Date.now()}-${formData.file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("materials")
          .upload(fileName, formData.file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("materials")
          .getPublicUrl(fileName);

        fileUrl = data.publicUrl;
      }

      /* ============================= */
      /* VIDEO LINK */
      /* ============================= */
      if (formData.type === "video") {
        fileUrl = formData.link;
      }

      /* ============================= */
      /* INSERT INTO DATABASE */
      /* ============================= */
      const { error } = await supabase
        .from("study_materials")
        .insert([
          {
            title: formData.title,
            description: formData.description,
            subject: formData.subject,
            class: String(formData.class).trim(),
            type: formData.type,
            file_url: fileUrl,
          },
        ]);

      if (error) throw error;

      alert("Material uploaded successfully");

      /* RESET FORM */
      setFormData({
        title: "",
        description: "",
        subject: "",
        class: "",
        type: "book",
        file: null,
        link: "",
      });

      const fileInput = document.querySelector(
        'input[name="file"]'
      );

      if (fileInput) {
        fileInput.value = "";
      }

      loadMaterials();

    } catch (err) {
      console.log(err);
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  /* ============================= */
  /* DELETE MATERIAL */
  /* ============================= */
  async function deleteMaterial(item) {

    const confirmDelete = window.confirm(
      "Delete this material?"
    );

    if (!confirmDelete) return;

    try {

      const { error } = await supabase
        .from("study_materials")
        .delete()
        .eq("id", item.id);

      if (error) throw error;

      /* DELETE STORAGE FILE */
      if (item.type === "book") {

        try {

          const fileName =
            item.file_url.split("/materials/")[1];

          if (fileName) {
            await supabase.storage
              .from("materials")
              .remove([fileName]);
          }

        } catch (err) {
          console.log(err);
        }
      }

      loadMaterials();

    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  }

  /* ============================= */
  /* FILTER */
  /* ============================= */
  const filteredMaterials = materials.filter(
    (m) =>
      selectedClass === "" ||
      String(m.class).trim() === selectedClass
  );

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-page">

        <h1 className="page-title">
          📚 Study Materials Manager
        </h1>

        {/* ============================= */}
        {/* FILTER */}
        {/* ============================= */}
        <div className="filter-bar">

          <select
            value={selectedClass}
            onChange={(e) =>
              setSelectedClass(e.target.value)
            }
          >
            <option value="">All Classes</option>

            {classes.map((cls, index) => (
              <option key={index} value={cls}>
                Class {cls}
              </option>
            ))}
          </select>

        </div>

        <div className="materials-container">

          {/* ============================= */}
          {/* UPLOAD CARD */}
          {/* ============================= */}
          <div className="upload-card">

            <h3>Add Material</h3>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="title"
                placeholder="Material Title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />

              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Class
                </option>

                {classOptions.map((cls) => (
                  <option key={cls} value={cls}>
                    Class {cls}
                  </option>
                ))}
              </select>

              {/* TYPE */}
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="book">
                  PDF / Book
                </option>

                <option value="video">
                  Video Link
                </option>
              </select>

              {/* CONDITIONAL */}
              {formData.type === "book" ? (

                <input
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={handleChange}
                />

              ) : (

                <input
                  type="text"
                  name="link"
                  placeholder="YouTube Video Link"
                  value={formData.link}
                  onChange={handleChange}
                />

              )}

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Uploading..."
                  : "Add Material"}
              </button>

            </form>

          </div>

          {/* ============================= */}
          {/* TABLE */}
          {/* ============================= */}
          <div className="materials-table">

            <h3>Uploaded Materials</h3>

            <table>

              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Type</th>
                  <th>Open</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredMaterials.length === 0 ? (

                  <tr>
                    <td colSpan="6">
                      No materials found
                    </td>
                  </tr>

                ) : (

                  filteredMaterials.map((item) => (

                    <tr key={item.id}>

                      <td>{item.title}</td>

                      <td>
                        {item.subject || "--"}
                      </td>

                      <td>
                        Class {item.class}
                      </td>

                      <td>
                        {item.type}
                      </td>

                      <td>
                        <a
                          href={item.file_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open
                        </a>
                      </td>

                      <td>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteMaterial(item)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminMaterials;