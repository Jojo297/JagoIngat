// Card.js
import React from "react";

const CardButton = ({ color, isFlipped, onClick, cardIndex, isPlayerTurn }) => {
  // Tentukan warna yang ditampilkan. Jika isFlipped true, gunakan warna dari prop.
  // Jika tidak, gunakan warna abu-abu.
  const displayColor = isFlipped ? color : "bg-gray-500";

  return (
    <div
      className={`w-24 h-24 rounded-lg cursor-pointer transition-colors duration-300 ${displayColor}`}
      onClick={() => onClick(cardIndex)}
      disabled={isPlayerTurn}>
      {/* Kartu kosong, warnanya ditentukan oleh CSS */}
    </div>
  );
};

export default CardButton;
