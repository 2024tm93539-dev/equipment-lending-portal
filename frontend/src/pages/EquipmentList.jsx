import { useEffect, useState } from "react";
import axios from "axios";

export default function EquipmentList() {
  const [equipment, setEquipment] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // Load all equipment
  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    const res = await axios.get("http://127.0.0.1:5001/api/equipment/");
    setEquipment(res.data);
  };

  // Borrow request (students only)
  const requestBorrow = async (id) => {
    try {
      await axios.post(
        `http://127.0.0.1:5001/api/requests/`,
        { equipment_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Request placed!");
    } catch {
      alert("❌ Failed to place request!");
    }
  };

  // Admin: Add new equipment
  const addEquipment = async () => {
    const name = prompt("Enter equipment name:");
    if (!name) return;
    const category = prompt("Enter category:");
    const description = prompt("Enter condition/description:");
    const quantity = parseInt(prompt("Enter total quantity:"), 10);

    if (!quantity || quantity < 1) return alert("Invalid quantity!");

    try {
      await axios.post(
        "http://127.0.0.1:5001/api/equipment/",
        {
          name,
          category,
          description,
          quantity,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Equipment added!");
      loadEquipment();
    } catch {
      alert("❌ Failed to add equipment!");
    }
  };

  // Admin: Edit existing equipment
  const editEquipment = async (id, current) => {
    const name = prompt("Edit name:", current.name);
    const category = prompt("Edit category:", current.category);
    const description = prompt("Edit condition:", current.description);
    const quantity = parseInt(
      prompt("Edit quantity:", current.quantity),
      10
    );

    if (!name || !quantity) return;

    try {
      await axios.put(
        `http://127.0.0.1:5001/api/equipment/${id}`,
        { name, category, description, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Equipment updated!");
      loadEquipment();
    } catch {
      alert("❌ Failed to update equipment!");
    }
  };

  // Admin: Delete equipment
  const deleteEquipment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this equipment?"))
      return;
    try {
      await axios.delete(`http://127.0.0.1:5001/api/equipment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Deleted successfully!");
      loadEquipment();
    } catch {
      alert("❌ Failed to delete equipment!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Equipment List</h2>

      {/* ✅ Admin Add Button */}
      {role === "admin" && (
        <button
          onClick={addEquipment}
          style={{
            background: "#28a745",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            marginBottom: "15px",
            cursor: "pointer",
          }}
        >
          ➕ Add Equipment
        </button>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {equipment.map((e) => (
          <li
            key={e.id}
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
              <b>{e.name}</b> — {e.category} ({e.available_quantity} available)
            </span>

            <div style={{ display: "flex", gap: "8px" }}>
              {/* ✅ Student Borrow */}
              {role === "student" && (
                <button
                  onClick={() => requestBorrow(e.id)}
                  style={{
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                >
                  Borrow
                </button>
              )}

              {/* ✅ Admin Edit/Delete */}
              {role === "admin" && (
                <>
                  <button
                    onClick={() => editEquipment(e.id, e)}
                    style={{
                      background: "#ffc107",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteEquipment(e.id)}
                    style={{
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

