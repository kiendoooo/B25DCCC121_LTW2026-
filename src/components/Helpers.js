import React from "react";

export const Helpers = ({ onFiftyFifty, onSkip, onAddLife, fiftyUsed, skipUsed, lives, maxLives }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <button onClick={onFiftyFifty} disabled={fiftyUsed} style={{ padding: "8px 15px", cursor: "pointer" }}>
        50:50
      </button>
      <button onClick={onSkip} disabled={skipUsed} style={{ padding: "8px 15px", cursor: "pointer" }}>
        Bỏ qua
      </button>
      <button onClick={onAddLife} disabled={lives >= maxLives} style={{ padding: "8px 15px", cursor: "pointer" }}>
        Thêm 1 mạng
      </button>
    </div>
  );
};