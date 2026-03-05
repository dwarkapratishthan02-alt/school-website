import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

function News() {

  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    setNews(data || []);
  }

  return (
    <div style={{ padding: "80px 0" }}>
      <div className="container">

        <h1>School News & Notices</h1>

        {news.map((item) => (
          <div key={item.id} style={{ marginBottom: "30px" }}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default News;