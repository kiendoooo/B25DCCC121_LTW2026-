import React from "react";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav style={{ marginBottom: "20px", display: "flex", gap: "20px", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
      <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "#007bff" : "#333", textDecoration: "none", fontWeight: "bold" })}>
        Trang chủ
      </NavLink>
      <NavLink to="/history" style={({ isActive }) => ({ color: isActive ? "#007bff" : "#333", textDecoration: "none", fontWeight: "bold" })}>
        Lịch sử
      </NavLink>
      <NavLink to="/question-bank" style={({ isActive }) => ({ color: isActive ? "#007bff" : "#333", textDecoration: "none", fontWeight: "bold" })}>
        Ngân hàng câu hỏi
      </NavLink>
    </nav>
  );
};