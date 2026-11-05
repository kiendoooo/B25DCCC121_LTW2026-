import React from "react";
import { Link } from "react-router-dom";

export const QuestionBank = ({ questions }) => {
  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>
      <ul style={{ lineHeight: "1.8" }}>
        {questions.map((q) => (
          <li key={q.id}>
            <Link to={`/question-bank/${q.id}`}>Câu {q.id}: {q.question}</Link>
          </li>
        ))}
      </ul>
      <br />
      <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>← Về trang chủ</Link>
    </div>
  );
};