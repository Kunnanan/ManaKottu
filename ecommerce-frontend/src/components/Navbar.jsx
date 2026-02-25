import { Link } from "react-router-dom"
import { useState } from "react"
import logo from "/logo.png"
import "./navbar.css"
import SearchBar from "./SearchBar"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/login"
  }

  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Brand Logo */}
        <Link to="/" className="logo-wrap">
          <img src={logo} alt="logo" />
          <span>ManaKottu</span>
        </Link>

        {/* Desktop Search */}
        <div className="nav-search-desktop">
          <SearchBar />
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </div>

        {/* Links Menu */}
        <div className={`nav-links ${open ? "show" : ""}`}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link to="/cart" onClick={() => setOpen(false)}>Cart</Link>

          {user?.role === "customer" && <Link to="/orders">My Orders</Link>}
          {user?.role === "seller" && <Link to="/seller/dashboard">Seller Panel</Link>}
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}

          {!token ? (
            <Link to="/login" className="login-btn">Login</Link>
          ) : (
            <span onClick={logout} className="logout">Logout</span>
          )}
        </div>
      </div>

      {/* Mobile Search (Visible only on small screens) */}
      <div className="nav-search-mobile">
        <SearchBar />
      </div>
    </nav>
  )
}
