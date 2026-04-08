import { useEffect, useState } from "react";
import axios from "../api/axios";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/items");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("/api/items", {
      title,
      description,
      status,
    });

    setTitle("");
    setDescription("");
    setStatus("active");
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`/api/items/${id}`);
    fetchItems();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f4f6f9", minHeight: "100vh", padding: "20px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "#333" }}>Task Dashboard</h1>
        <button
          onClick={logout}
          style={{
            background: "#ff4d4d",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* ADD TASK CARD */}
      <div
        style={{
          background: "white",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          maxWidth: "500px"
        }}
      >
        <h2>Add Task</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={addItem}
          style={{
            width: "100%",
            background: "#4CAF50",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Add Task
        </button>
      </div>

      {/* TASK LIST */}
      <div style={{ marginTop: "30px" }}>
        <h2>Task List</h2>

        {items.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                {/* STATUS BADGE */}
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "20px",
                    color: "white",
                    background: item.status === "completed" ? "green" : "orange",
                    fontSize: "12px"
                  }}
                >
                  {item.status}
                </span>

                <br /><br />

                <button
                  onClick={() => deleteItem(item.id)}
                  style={{
                    background: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
