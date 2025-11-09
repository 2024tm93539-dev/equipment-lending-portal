import { useEffect, useState } from "react";
import axios from "axios";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [equipmentMap, setEquipmentMap] = useState({});

  // 🔹 Load requests and equipment on mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    const loadData = async () => {
      try {
        const [reqRes, eqRes] = await Promise.all([
          axios.get("http://127.0.0.1:5001/api/requests/my", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://127.0.0.1:5001/api/equipment/"),
        ]);

        // map equipment id -> name
        const eqMap = {};
        eqRes.data.forEach((e) => (eqMap[e.id] = e.name));

        setEquipmentMap(eqMap);
        setRequests(reqRes.data);
      } catch {
        setRequests([]);
      }
    };

    loadData();
  }, []);

  // 🔹 Handle "Return"
  const handleReturn = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://127.0.0.1:5001/api/requests/${id}/return`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Returned successfully!");
      window.location.reload();
    } catch (err) {
      alert("❌ Unable to return equipment!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Requests</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {requests.map((r) => (
          <li
            key={r.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              {equipmentMap[r.equipment_id] || `Equipment #${r.equipment_id}`} —{" "}
              <b
                style={{
                  color:
                    r.status === "approved"
                      ? "green"
                      : r.status === "returned"
                      ? "blue"
                      : r.status === "rejected"
                      ? "red"
                      : "black",
                }}
              >
                {r.status}
              </b>
            </span>

            {/* ✅ Show Return button only if approved */}
            {r.status === "approved" && (
              <button
                onClick={() => handleReturn(r.id)}
                style={{
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Return
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

