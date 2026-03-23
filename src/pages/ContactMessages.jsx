import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminContact.css";

function ContactMessages() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setMessages(data);
  }

  async function deleteMessage(id) {
    const confirmDelete = window.confirm("Delete this inquiry?");
    if (!confirmDelete) return;

    await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-page">
        <h1 className="page-title">Contact Inquiries</h1>

        <div className="messages-list">

          {messages.length === 0 && (
            <p>No inquiries yet.</p>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className="message-card">

              <div className="message-content">
                <h3>{msg.name}</h3>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Phone:</strong> {msg.phone}</p>
                <p>{msg.message}</p>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteMessage(msg.id)}
              >
                Delete
              </button>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default ContactMessages;