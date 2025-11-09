import { useEffect, useState } from "react";
import axios from "axios";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loadRequests = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5001/api/requests/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to load requests", err);
      }
    };
    loadRequests();
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <h2>My Requests</h2>
      <p>Below are your submitted equipment requests.</p>

      <ul>
        {requests.map((r) => (
          <li key={r.id}>
            Equipment #{r.equipment_id} — Status: {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

