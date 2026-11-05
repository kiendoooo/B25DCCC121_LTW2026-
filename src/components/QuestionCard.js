import React from "react";
import { AnswerButton } from "./AnswerButton";

export const QuestionCard = ({ currentQuestion, currentIndex, total, onSelectAnswer, selectedAnswer, status, hiddenOptions }) => {
  if (!currentQuestion) return null;

  return (
    <div className="question-card" style={{ marginTop: "20px" }}>
      <div className="question-header" style={{ marginBottom: "10px", fontWeight: "bold", color: "#555" }}>
        <span>Câu {currentIndex + 1}/{total}</span>
        <span> · {currentQuestion.level || "Dễ"}</span>
        <span> · {currentQuestion.points} điểm</span>
      </div>
      <h3 style={{ marginBottom: "20px" }}>{currentQuestion.question}</h3>
      <div className="answers-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
        {Object.entries(currentQuestion.options).map(([key, text]) => {
          const isSelected = selectedAnswer === key;
          const isCorrect = status === "revealed" && key === currentQuestion.correct;
          const isWrong = status === "revealed" && isSelected && key !== currentQuestion.correct;
          const isHidden = hiddenOptions.includes(key);

          return (
            <AnswerButton
              key={key}
              label={key}
              text={text}
              onClick={() => onSelectAnswer(key)}
              disabled={status !== "answering"}
              isSelected={isSelected}
              isCorrect={isCorrect}
              isWrong={isWrong}
              isHidden={isHidden}
            />
          );
        })}
      </div>
    </div>
  );
};