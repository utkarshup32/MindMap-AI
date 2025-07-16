import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{ padding: "1rem", background: "#333", color: "white" }}>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/" style={{ color: "white" }}>Home</Link>
        <Link to="/mindmap" style={{ color: "white" }}>MindMap</Link>
        <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
        <Link to="/login" style={{ color: "white" }}>Login</Link>
        <Link to="/register" style={{ color: "white" }}>Register</Link>
        <Link to="/contact" style={{ color: "white" }}>Contact</Link>
        <Link to="/about" style={{ color: "white" }}>About</Link>
        <Link to="/faq" style={{ color: "white" }}>FAQ</Link>
      </nav>
    </header>
  );
}

export default Header;
