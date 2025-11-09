import { useEffect, useState } from "react";
import axios from "axios";

export default function EquipmentList() {
  const [equipment, setEquipment] = useState([]);
  const token = localStorage.getItem("token");

  // Load all equipment
  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5001/api/equipment/");
      setEquipment(res.data);
    } catch (err) {
      console.error("Failed to load equipment", err);
    }
  };

  // Borrow request (available to everyone for now)
  const requestBorrow = async (id) => {
    try {
      await axios.post(
        `http://127.0.0.1:5001/api/requests/`,
        { equipment_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Request placed!");
    } catch (err) {
      alert("Failed to place request.");
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>Equipment List</h2>
      <p>This page lists all available equipment. Click “Borrow” to request one.</p>

      <ul>
        {equipment.map((e) => (
          <li key={e.id} style={{ marginBottom: "10px" }}>
            <strong>{e.name}</strong> ({e.available_quantity} available)
            <button
              onClick={() => requestBorrow(e.id)}
              style={{ marginLeft: "10px" }}
            >
              Borrow
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

