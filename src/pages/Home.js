import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = ({ playerName, setPlayerName }) => {
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      navigate("/play");
    }
  };

  return (
    <div>
      <h2>GAME THỬ THÁCH 3 MẠNG</h2>
      <form onSubmit={handleStart}>
        <input
          type="text"
          placeholder="Nhập tên người chơi..."
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button type="submit" disabled={!playerName.trim()}>
          Bắt đầu
        </button>
      </form>
    </div>
  );
};