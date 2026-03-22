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
    class: "",
    file: null
  });

  const [loading, setLoading] = useState(false);

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
        ...new Set(data.map((m) => m.class).filter(Boolean))
      ];
      setClasses(uniqueClasses);

    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFormData((prev) => ({
        ...prev,
        file: files[0]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    if (!formData.file) {
      alert("Please select a file");
      return;
    }

    setLoading(true);

    try {
      const fileName = `${Date.now()}-${formData.file.name}`;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from("materials")
        .upload(fileName, formData.file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("materials")
        .getPublicUrl(fileName);

      const fileUrl = data.publicUrl;

      // Insert into DB
      const { error } = await supabase
        .from("study_materials")
        .insert([
          {
            title: formData.title,
            description: formData.description,
            class: formData.class,
            file_url: fileUrl
          }
        ]);

      if (error) throw error;

      alert("Material uploaded successfully");

      // Reset form
      setFormData({
        title: "",
        description: "",
        class: "",
        file: null
      });

      // Reset file input manually
      document.querySelector('input[name="file"]').value = "";

      loadMaterials();

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  async function deleteMaterial(item) {
    const confirmDelete = window.confirm("Delete this material?");
    if (!confirmDelete) return;

    try {
      // Delete DB record
      const { error } = await supabase
        .from("study_materials")
        .delete()
        .eq("id", item.id);

      if (error) throw error;

      // Delete file from storage
      try {
        const fileName = item.file_url.split("/materials/")[1];
        if (fileName) {
          await supabase.storage
            .from("materials")
            .remove([fileName]);
        }
      } catch (err) {
        console.warn("Storage delete failed:", err);
      }

      loadMaterials();

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  const filteredMaterials = materials.filter((m) =>
    selectedClass === "" || m.class === selectedClass
  );

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-page"> {/* 🔥 FIXED */}

        <h1 className="page-title">Study Materials Manager</h1>

        {/* FILTER */}
        <div className="filter-bar">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
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

          {/* UPLOAD CARD */}
          <div className="upload-card">

            <h3>Upload Study Material</h3>

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
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />

              <input
                type="text"
                name="class"
                placeholder="Class (Example: 10)"
                value={formData.class}
                onChange={handleChange}
                required
              />

              <input
                type="file"
                name="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={handleChange}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Upload Material"}
              </button>

            </form>

          </div>

          {/* TABLE */}
          <div className="materials-table">

            <h3>Uploaded Materials</h3>

            <table>

              <thead>
                <tr>
                  <th>Title</th>
                  <th>Class</th>
                  <th>File</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredMaterials.length === 0 ? (

                  <tr>
                    <td colSpan="4">No materials found</td>
                  </tr>

                ) : (

                  filteredMaterials.map((item) => (

                    <tr key={item.id}>

                      <td>{item.title}</td>

                      <td>{item.class}</td>

                      <td>
                        <a
                          href={item.file_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View File
                        </a>
                      </td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteMaterial(item)}
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