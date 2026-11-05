import React from "react";

export const AnswerButton = ({ label, text, onClick, disabled, isSelected, isCorrect, isWrong, isHidden }) => {
  if (isHidden) {
    return <div className="answer-btn hidden-placeholder" style={{ visibility: "hidden" }}></div>;
  }

  let bg = "#fff";
  let color = "#000";
  if (isSelected) {
    bg = "#ffc107"; // Vàng (đang chốt)
  }
  if (isCorrect) {
    bg = "#28a745"; // Xanh lá (đúng)
    color = "#fff";
  }
  if (isWrong) {
    bg = "#dc3545"; // Đỏ (sai)
    color = "#fff";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "15px",
        fontSize: "16px",
        cursor: "pointer",
        border: "1px solid #ccc",
        borderRadius: "8px",
        background: bg,
        color: color,
        textAlign: "left",
      }}
    >
      <strong>{label}.</strong> {text}
    </button>
  );
};