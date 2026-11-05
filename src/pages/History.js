import React from "react";
import { Link } from "react-router-dom";

export const History = () => {
  return (
    <div>
      <h2>Lịch sử chơi</h2>
      <p>Bản này chưa có lịch sử lượt chơi.</p>
      <Link to="/">Về trang chủ</Link>
    </div>
  );
};