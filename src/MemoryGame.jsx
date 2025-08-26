import React, { useState } from "react";
import Card from "./CardButton";

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-cyan-500",
  "bg-amber-950",
];

const MemoryGame = () => {
  const [sequence, setSequence] = useState([]);
  const [playerClicks, setPlayerClicks] = useState([]);
  const [score, setScore] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [cards, setCards] = useState(
    colors.map((color, index) => ({
      id: index,
      color: color,
      isFlipped: false,
      isCorrect: false,
    }))
  );

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setPlayerClicks([]);
    const resetCards = cards.map((card) => ({ ...card, isFlipped: false }));
    setCards(resetCards);

    // Langsung buat urutan pertama di sini
    const initialCardIndex = Math.floor(Math.random() * 9);
    const initialSequence = [initialCardIndex];
    setSequence(initialSequence);

    // Langsung tampilkan urutan
    displaySequence(initialSequence);
  };

  const addNextColor = () => {
    const newCardIndex = Math.floor(Math.random() * 9);
    const newSequence = [...sequence, newCardIndex];
    setSequence(newSequence);
    displaySequence(newSequence);
  };

  const displaySequence = (seq) => {
    setIsPlayerTurn(false);
    let delay = 500;
    seq.forEach((index, i) => {
      setTimeout(() => {
        const updatedCards = [...cards];
        updatedCards[index].isFlipped = true;
        setCards(updatedCards);

        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[index].isFlipped = false;
          setCards(resetCards);

          if (i === seq.length - 1) {
            setIsPlayerTurn(true);
          }
        }, 500);
      }, delay);
      delay += 1000;
    });
  };

  const handleCardClick = (clickedCardIndex) => {
    if (!isPlayerTurn || gameOver) return;

    // 1. Tampilkan warna kartu yang diklik
    const updatedCards = [...cards];
    updatedCards[clickedCardIndex].isFlipped = true;
    setCards(updatedCards);

    // 2. Sembunyikan kembali warna kartu setelah 500ms
    setTimeout(() => {
      const resetCard = [...cards];
      resetCard[clickedCardIndex].isFlipped = false;
      setCards(resetCard);
    }, 500);

    const newPlayerClicks = [...playerClicks, clickedCardIndex];
    setPlayerClicks(newPlayerClicks);

    // Cek apakah klik pemain benar
    if (sequence[newPlayerClicks.length - 1] === clickedCardIndex) {
      if (newPlayerClicks.length === sequence.length) {
        setScore(score + 1);
        setPlayerClicks([]);
        setTimeout(() => {
          const resetCards = cards.map((card) => ({
            ...card,
            isFlipped: false,
          }));
          setCards(resetCards);
          setTimeout(addNextColor, 500);
        }, 1000);
      }
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-x-10 items-center">
      <div className="grid grid-cols-3 gap-4 mt-6 ">
        {cards.map((card, index) => (
          <Card
            key={index}
            color={card.color}
            isFlipped={card.isFlipped}
            cardIndex={index}
            onClick={handleCardClick}
          />
        ))}
      </div>

      <div className="flex-col text-center">
        {/* Tombol "Mulai Game" hanya akan muncul jika game belum dimulai (sequence kosong) */}
        {sequence.length === 0 && !gameOver && (
          <button
            className="bg-blue-600 mr-4 hover:bg-blue-700  text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors"
            onClick={startGame}>
            Mulai Game
          </button>
        )}

        {/* Pesan status dan tombol "Main Lagi" */}

        <div className="gap-4">
          {gameOver ? (
            <div>
              <h2 className="mt-4 text-2xl text-red-600 font-bold">
                Game Over! Skor: {score}
              </h2>
              <button
                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors"
                onClick={startGame}>
                Main Lagi
              </button>
            </div>
          ) : (
            // Pesan status hanya akan muncul jika game sedang berjalan
            sequence.length > 0 && (
              <h2 className="mt-4 text-xl dark:text-white">
                {isPlayerTurn ? "Giliran Anda!" : "Perhatikan Urutan..."}
              </h2>
            )
          )}
        </div>
        <div className="mt-4 text-xl  dark:text-white font-semibold">
          Skor: {score}
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
