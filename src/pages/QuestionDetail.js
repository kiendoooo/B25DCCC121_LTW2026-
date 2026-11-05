import React from "react";
import { useParams, Link } from "react-router-dom";

export const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div>
        <h3>Không tìm thấy câu hỏi!</h3>
        <Link to="/question-bank">Quay lại Ngân hàng câu hỏi</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Chi tiết câu hỏi #{question.id}</h2>
      <p><strong>Nội dung:</strong> {question.question}</p>
      <p><strong>Mức độ:</strong> {question.level || "Dễ"} · <strong>Điểm:</strong> {question.points}</p>
      
      <h4>Các đáp án:</h4>
      <ul>
        {Object.entries(question.options).map(([key, text]) => (
          <li key={key} style={{ color: key === question.correct ? "green" : "inherit", fontWeight: key === question.correct ? "bold" : "normal" }}>
            {key}. {text} {key === question.correct && "(Đáp án đúng)"}
          </li>
        ))}
      </ul>
      <br />
      <Link to="/question-bank">← Quay lại danh sách câu hỏi</Link>
    </div>
  );
};