import React from "react";

export const StatusBar = ({ timeLeft, lives, score, correctStreak }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 15px", background: "#e9ecef", borderRadius: "8px", marginBottom: "15px", fontSize: "15px", fontWeight: "bold" }}>
      <span style={{ color: timeLeft <= 15 ? "red" : "inherit" }}>Thời gian: {timeLeft} giây</span>
      <span>Mạng: {lives} {Array.from({ length: lives }).map(() => "❤").join(" ")}</span>
      <span>Điểm: {score.toLocaleString("vi-VN")} điểm</span>
      <span>Chuỗi đúng: {correctStreak}</span>
    </div>
  );
};