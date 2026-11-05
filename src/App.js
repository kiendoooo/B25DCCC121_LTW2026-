import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Play } from "./pages/Play";
import { Result } from "./pages/Result";
import { History } from "./pages/History";
import { QuestionBank } from "./pages/QuestionBank";
import { QuestionDetail } from "./pages/QuestionDetail";
import { NotFound } from "./pages/NotFound";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [questions, setQuestions] = useState([]);
  
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("ltw_3mang_history");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("ltw_3mang_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    fetch("/data/questions.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Lỗi tải câu hỏi:", err));
  }, []);

  const addHistoryRecord = (record) => {
    setHistory((prev) => [record, ...prev]);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("ltw_3mang_history");
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Home playerName={playerName} setPlayerName={setPlayerName} history={history} />}
        />
        <Route
          path="play"
          element={<Play playerName={playerName} questions={questions} />}
        />
        <Route
          path="result"
          element={<Result addHistoryRecord={addHistoryRecord} />}
        />
        <Route
          path="history"
          element={<History history={history} onClearHistory={handleClearHistory} />}
        />
        <Route 
          path="question-bank" 
          element={<QuestionBank questions={questions} />} 
        />
        <Route 
          path="question-bank/:id" 
          element={<QuestionDetail questions={questions} />} 
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;