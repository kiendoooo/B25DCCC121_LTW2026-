import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

export const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (!state) {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <div>
      <h2>Kết quả: {state.reason}</h2>
      <p>Người chơi: {state.name}</p>
      <p>Điểm số: {state.score}</p>
      <p>Mạng còn lại: {state.lives}</p>
      <Link to="/">Về trang chủ</Link>
    </div>
  );
};