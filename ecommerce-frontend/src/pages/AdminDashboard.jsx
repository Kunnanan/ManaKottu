import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Added import
import API from "../api/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate(); // 2. Hook initialized

  useEffect(() => {
    API.get("/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!stats) return <h2>Loading dashboard...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        <Card title="Users" value={stats.users} />
        <Card title="Products" value={stats.products} />
        {/* Navigates to /admin/orders on click */}
        <Card 
          title="Orders" 
          value={stats.orders} 
          onClick={() => navigate("/admin/orders")} 
        />
        <Card title="Pending Orders" value={stats.pending} />
        <Card title="Delivered" value={stats.delivered} />
        <Card title="Revenue ₹" value={stats.revenue} />
      </div>
    </div>
  );
}

// 3. Updated Card to accept and use the onClick prop
function Card({ title, value, onClick }) {
  return (
    <div 
      onClick={onClick} // Attach the click handler here
      style={{
        border: "1px solid #ccc",
        padding: 20,
        borderRadius: 10,
        textAlign: "center",
        background: "#f9f9f9",
        cursor: onClick ? "pointer" : "default" // Add pointer cursor for clickable cards
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}
