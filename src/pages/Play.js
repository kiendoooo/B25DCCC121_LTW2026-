import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { QuestionCard } from "../components/QuestionCard";
import { StatusBar } from "../components/StatusBar";
import { ProgressBar } from "../components/ProgressBar";
import { Helpers } from "../components/Helpers";

export const Play = ({ playerName, questions }) => {
  const navigate = useNavigate();

  // 1. TẤT CẢ CÁC HOOK (useState, useEffect) PHẢI ĐẶT Ở TRÊN CÙNG
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [status, setStatus] = useState("answering");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [progressStatuses, setProgressStatuses] = useState({});
  
  const [fiftyUsed, setFiftyUsed] = useState(false);
  const [skipUsed, setSkipUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState([]);

  const currentQ = questions[currentIndex] || questions[0];
  const MAX_LIVES = 3;

  useEffect(() => {
    document.title = `Câu ${currentIndex + 1}/15 – còn ${lives} mạng`;
    return () => {
      document.title = "Thử thách 3 mạng";
    };
  }, [currentIndex, lives]);

  useEffect(() => {
    if (status !== "answering") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleEndGame("Hết giờ!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (status === "locked") {
      const t1 = setTimeout(() => setStatus("revealed"), 1000);
      return () => clearTimeout(t1);
    }
    if (status === "revealed") {
      const t2 = setTimeout(() => {
        if (currentIndex + 1 >= questions.length) {
          handleEndGame(lives > 0 ? "Bạn đã trả lời đúng cả 15 câu" : "Hết mạng");
        } else {
          setCurrentIndex((prev) => prev + 1);
          setStatus("answering");
          setSelectedAnswer(null);
          setHiddenOptions([]);
        }
      }, 1000);
      return () => clearTimeout(t2);
    }
  }, [status]);

  useEffect(() => {
    const handleKey = (e) => {
      if (status !== "answering") return;
      const key = e.key.toUpperCase();
      if (["A", "B", "C", "D"].includes(key)) {
        if (currentQ?.options[key] && !hiddenOptions.includes(key)) {
          handleSelectAnswer(key);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [status, currentQ, hiddenOptions]);

  // 2. CÂU LỆNH KIỂM TRA ĐIỀU KIỆN PHẢI NẰM SAU TẤT CẢ CÁC HOOK Ở TRÊN
  if (!playerName || !playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  const handleSelectAnswer = (key) => {
    if (status !== "answering" || hiddenOptions.includes(key)) return;

    setSelectedAnswer(key);
    setStatus("locked");

    const isCorrect = key === currentQ.correct;
    let newProgress = { ...progressStatuses };

    if (isCorrect) {
      newProgress[currentIndex] = "correct";
      setScore((prev) => prev + currentQ.points);
      setCorrectStreak((prev) => prev + 1);
    } else {
      newProgress[currentIndex] = "wrong";
      setCorrectStreak(0);
      setLives((prev) => prev - 1);
    }
    setProgressStatuses(newProgress);
  };

  const handleFiftyFifty = () => {
    if (fiftyUsed || status !== "answering") return;
    const incorrectKeys = Object.keys(currentQ.options).filter((k) => k !== currentQ.correct);
    const shuffledWrong = incorrectKeys.sort(() => 0.5 - Math.random());
    setHiddenOptions(shuffledWrong.slice(0, 2));
    setFiftyUsed(true);
  };

  const handleSkip = () => {
    if (skipUsed || status !== "answering") return;
    setSkipUsed(true);

    let newProgress = { ...progressStatuses, [currentIndex]: "skipped" };
    setProgressStatuses(newProgress);

    if (currentIndex + 1 >= questions.length) {
      handleEndGame("Bạn đã hoàn thành thử thách");
    } else {
      setCurrentIndex((prev) => prev + 1);
      setStatus("answering");
      setSelectedAnswer(null);
      setHiddenOptions([]);
    }
  };

  const handleAddLife = () => {
    if (lives < MAX_LIVES) {
      setLives((prev) => Math.min(prev + 1, MAX_LIVES));
    }
  };

  const handleEndGame = (reason) => {
    const correctCount = Object.values(progressStatuses).filter((v) => v === "correct").length;
    navigate("/result", {
      replace: true,
      state: {
        name: playerName,
        score,
        correctCount,
        livesLeft: lives,
        reason,
      },
    });
  };

  if (!questions || questions.length === 0) return <div>Đang tải câu hỏi...</div>;

  return (
    <div className="play-page">
      <StatusBar timeLeft={timeLeft} lives={lives} score={score} correctStreak={correctStreak} />
      <ProgressBar total={questions.length} currentIndex={currentIndex} statuses={progressStatuses} />
      <Helpers
        onFiftyFifty={handleFiftyFifty}
        onSkip={handleSkip}
        onAddLife={handleAddLife}
        fiftyUsed={fiftyUsed}
        skipUsed={skipUsed}
        lives={lives}
        maxLives={MAX_LIVES}
      />
      <QuestionCard
        currentQuestion={currentQ}
        currentIndex={currentIndex}
        total={questions.length}
        score={score}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={selectedAnswer}
        status={status}
        hiddenOptions={hiddenOptions}
      />
    </div>
  );
};