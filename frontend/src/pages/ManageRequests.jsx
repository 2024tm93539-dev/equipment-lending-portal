import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5001/api/requests/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to load requests", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://127.0.0.1:5001/api/requests/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Status updated!");
      loadRequests();
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>Manage Borrow Requests</h2>
      <p>View all requests and approve or reject as needed.</p>

      <table border="1" width="100%" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Equipment ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.user_id}</td>
              <td>{r.equipment_id}</td>
              <td>{r.status}</td>
              <td>
                {r.status === "requested" && (
                  <>
                    <button onClick={() => updateStatus(r.id, "approved")}>
                      Approve
                    </button>
                    <button onClick={() => updateStatus(r.id, "rejected")}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

