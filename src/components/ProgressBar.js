import React from "react";

export const ProgressBar = ({ total, currentIndex, statuses }) => {
  return (
    <div style={{ display: "flex", gap: "5px", marginBottom: "20px" }}>
      {Array.from({ length: total }).map((_, index) => {
        let bg = "#e9ecef";
        let border = "1px solid #ccc";
        if (index === currentIndex) border = "2px solid #000";
        if (statuses[index] === "correct") bg = "#28a745";
        if (statuses[index] === "wrong") bg = "#dc3545";
        if (statuses[index] === "skipped") bg = "#fd7e14";

        return (
          <div
            key={index}
            style={{
              width: "30px",
              height: "30px",
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
              background: bg,
              border: border,
              fontSize: "12px",
              fontWeight: "bold",
              borderRadius: "4px",
              color: bg !== "#e9ecef" ? "#fff" : "#000",
            }}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
};