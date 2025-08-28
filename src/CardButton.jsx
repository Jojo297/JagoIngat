import React from "react";

const CardButton = ({ color, isFlipped, onClick, cardIndex, isPlayerTurn }) => {
  const displayColor = isFlipped ? color : "bg-gray-500";

  return (
    <div
      className={`w-24 h-24 rounded-lg ${
        isPlayerTurn ? "cursor-pointer" : "cursor-not-allowed"
      } transition-colors duration-300 ${displayColor}`}
      onClick={() => onClick(cardIndex)}
      disabled={isPlayerTurn}></div>
  );
};

export default CardButton;
