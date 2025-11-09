import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const [equipmentMap, setEquipmentMap] = useState({});
  const [userMap, setUserMap] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadRequests();
  }, []);
  const loadRequests = async () => {
    const [reqRes, eqRes, userRes] = await Promise.all([
      axios.get("http://127.0.0.1:5001/api/requests/all", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("http://127.0.0.1:5001/api/equipment/"),
      axios.get("http://127.0.0.1:5001/api/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    // Build quick lookup maps
    const eqMap = {};
    eqRes.data.forEach((e) => (eqMap[e.id] = e.name));
    const usrMap = {};
    userRes.data.forEach((u) => (usrMap[u.id] = u.name));

    setEquipmentMap(eqMap);
    setUserMap(usrMap);
    setRequests(reqRes.data);
  };


  const updateStatus = async (id, status) => {
    await axios.put(
      `http://127.0.0.1:5001/api/requests/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadRequests();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Borrow Requests</h2>
      <table border="1" width="100%" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Equipment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{userMap[r.user_id] || r.user_id}</td>
              <td>{equipmentMap[r.equipment_id] || r.equipment_id}</td>
              <td>{r.status}</td>
              <td>
                {r.status === "requested" && (
                  <>
                    <button onClick={() => updateStatus(r.id, "approved")}>Approve</button>
                    <button onClick={() => updateStatus(r.id, "rejected")}>Reject</button>
                  </>
                )}
                {r.status !== "requested" && <i>No actions available</i>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

