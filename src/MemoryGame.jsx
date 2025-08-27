import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import CardButton from "./CardButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GameOver from "@/assets/GameOver.jpg";
import GoodJob from "@/assets/GoodJob.jpg";

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
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const storedBestScore = localStorage.getItem("bestScore");
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore));
    }
  }, []);

  useEffect(() => {
    if (gameOver) {
      if (score > bestScore) {
        localStorage.setItem("bestScore", score.toString());
        setBestScore(score);
      }
    }
  }, [gameOver, score]);

  console.log(score, bestScore);
  const handleCloseDialog = () => {
    setGameOver(false);
    setSequence([]);
    setPlayerClicks([]);
    setScore(0);
    setLevel(1);
    const resetCards = colors.map((color, index) => ({
      id: index,
      color: color,
      isFlipped: false,
      isCorrect: false,
    }));
    setCards(resetCards);
    setIsPlayerTurn(false);
  };

  const [cards, setCards] = useState(
    colors.map((color, index) => ({
      id: index,
      color: color,
      isFlipped: false,
      isCorrect: false,
    }))
  );

  const startGame = () => {
    setIsGameStarted(true);
    setScore(0);
    setLevel(1);
    setGameOver(false);
    setPlayerClicks([]);
    const resetCards = cards.map((card) => ({ ...card, isFlipped: false }));
    setCards(resetCards);

    const initialCardIndex = Math.floor(Math.random() * 9);
    const initialSequence = [initialCardIndex];
    setSequence(initialSequence);
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

    const updatedCards = [...cards];
    updatedCards[clickedCardIndex].isFlipped = true;
    setCards(updatedCards);

    setTimeout(() => {
      const resetCard = [...cards];
      resetCard[clickedCardIndex].isFlipped = false;
      setCards(resetCard);
    }, 500);

    const newPlayerClicks = [...playerClicks, clickedCardIndex];
    setPlayerClicks(newPlayerClicks);

    if (sequence[newPlayerClicks.length - 1] === clickedCardIndex) {
      if (newPlayerClicks.length === sequence.length) {
        setScore(score + 5);
        setLevel(level + 1);
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
    <div className="flex flex-col justify-center">
      <div className="flex-col w-full self-center items-center justify-center text-center">
        {bestScore > 0 ? (
          <Card className="w-full mt-2 px-6 py-4 text-center border-2 rounded-lg border-primary/20 bg-card/50 backdrop-blur-sm">
            <div>
              <div className="text-2xl font-bold text-primary">{bestScore}</div>
              <div className="text-sm text-muted-foreground">
                Score Terbaik Kamu
              </div>
            </div>
          </Card>
        ) : null}

        <div className="flex space-x-4 w-full justify-center">
          <Card className="mt-4 mb-4 px-6 py-4 text-center border-2 rounded-lg border-primary/20 bg-card/50 backdrop-blur-sm">
            <div>
              <div className="text-2xl font-bold text-primary">{score}</div>
              <div className="text-sm text-muted-foreground">Skor</div>
            </div>
          </Card>
          <Card className="mt-4 mb-4 px-6 py-4 text-center border-2 rounded-lg border-primary/20 bg-card/50 backdrop-blur-sm">
            <div>
              <div className="text-2xl font-bold text-primary">{level}</div>
              <div className="text-sm text-muted-foreground">Level</div>
            </div>
          </Card>
        </div>
      </div>

      <div className="gap-4">
        {!isGameStarted
          ? null
          : sequence.length > 0 && (
              <h2 className="mt-4 mb-2 text-xl text-center dark:text-white">
                {isPlayerTurn ? "Giliran Anda!" : "Perhatikan Urutan.."}
              </h2>
            )}
      </div>

      <Card className="p-8 border-2 border-border/20 bg-card/80 backdrop-blur-sm shadow-2xl">
        <div className="grid grid-cols-3 gap-4 p-4">
          {cards.map((card, index) => (
            <CardButton
              key={index}
              color={card.color}
              isFlipped={card.isFlipped}
              cardIndex={index}
              isPlayerTurn={isPlayerTurn}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </Card>

      {sequence.length === 0 && !gameOver && (
        <button
          className="bg-primary mt-4 hover:shadow-xl hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 text-white font-bold py-2 px-6 rounded-lg shadow-md "
          onClick={startGame}>
          Mulai Game
        </button>
      )}

      <AlertDialog open={gameOver}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle
              className={`mt-4 text-2xl text-center ${
                score >= bestScore ? "text-green-600" : "text-red-600"
              } font-bold`}>
              {score >= bestScore ? `Score Baru: ${score}` : "Game Over!"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {score >= bestScore ? (
                <img src={GoodJob} />
              ) : (
                <img src={GameOver} />
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDialog}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className=" text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors"
              onClick={startGame}>
              Main Lagi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MemoryGame;
