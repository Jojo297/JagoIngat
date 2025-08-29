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

// Colors for the game cards as an array for random selection
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
  const [sequence, setSequence] = useState([]); // Stores the sequence of card flips
  const [playerClicks, setPlayerClicks] = useState([]); // Stores indices of player's clicked cards
  const [score, setScore] = useState(0); // Current score of the player
  const [isPlayerTurn, setIsPlayerTurn] = useState(false); // Indicates whose turn it is
  const [isGameStarted, setIsGameStarted] = useState(false); // Indicates if the game has started
  const [level, setLevel] = useState(1); // Indicates the current level of the game
  const [gameOver, setGameOver] = useState(false); // Indicates if the game is over
  const [bestScore, setBestScore] = useState(0); // Best score achieved by the player

  // Load best score from local storage when the component mounts
  useEffect(() => {
    const storedBestScore = localStorage.getItem("bestScore");
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore));
    }
  }, []);

  // Update best score in local storage if the current score exceeds it
  useEffect(() => {
    if (gameOver) {
      if (score > bestScore) {
        localStorage.setItem("bestScore", score.toString());
        setBestScore(score);
      }
    }
  }, [gameOver, score]);

  // Function to handle closing the game over alert dialog
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

  // Initial array of cards
  const [cards, setCards] = useState(
    colors.map((color, index) => ({
      id: index,
      color: color,
      isFlipped: false,
      isCorrect: false,
    }))
  );

  // Start the game when called, initializing game state
  const startGame = () => {
    setIsGameStarted(true);
    setScore(0);
    setLevel(1);
    setGameOver(false);
    setPlayerClicks([]);
    // Reset card states
    const resetCards = cards.map((card) => ({ ...card, isFlipped: false }));
    setCards(resetCards);

    // Generate initial card sequence for the game
    const initialCardIndex = Math.floor(Math.random() * 9);
    const initialSequence = [initialCardIndex];
    setSequence(initialSequence);
    displaySequence(initialSequence);
  };

  // Add a new card color to the sequence when required
  const addNextColor = () => {
    const newCardIndex = Math.floor(Math.random() * 9);
    const newSequence = [...sequence, newCardIndex];
    setSequence(newSequence);
    displaySequence(newSequence);
  };

  // Display cards in the sequence order, setting their flipped state
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

          // Advance the player's turn if it's the last card in the sequence

          if (i === seq.length - 1) {
            setIsPlayerTurn(true);
          }
        }, 500);
      }, delay);
      delay += 1000;
    });
  };

  // Handle card click event
  const handleCardClick = (clickedCardIndex) => {
    if (!isPlayerTurn || gameOver) return; // Exit if not on player's turn or game is over

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

    // Check if player's click matches the sequence; if so, update score and level
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
      setGameOver(true); // Game over if the clicked card is not in sequence
    }
  };

  return (
    <div className="flex flex-col p-4 justify-center lg:flex-row lg:gap-16 lg:w-full lg:px-36">
      <div className="flex-col w-full self-center items-center justify-center text-center">
        {bestScore > 0 ? (
          <Card className="bg-white w-full mt-2 px-6 py-4 text-center border-2 rounded-lg border-primary/20 bg-card/50 backdrop-blur-sm">
            <div>
              <div className="text-2xl font-bold text-primary">{bestScore}</div>
              <div className="text-sm text-muted-foreground">
                Score Terbaik Kamu
              </div>
            </div>
          </Card>
        ) : null}

        <div className="flex space-x-4 w-full justify-center">
          <Card className="bg-white mt-4 mb-4 px-6 py-4 w-full text-center border-2 rounded-lg border-primary/20 bg-card/50 backdrop-blur-sm">
            <div>
              <div className="text-2xl font-bold text-primary">{score}</div>
              <div className="text-sm text-muted-foreground">Skor</div>
            </div>
          </Card>
          <Card className="bg-white mt-4 mb-4 px-6 py-4 w-full text-center border-2 rounded-lg border-primary/20 bg-card/50 backdrop-blur-sm">
            <div>
              <div className="text-2xl font-bold text-primary">{level}</div>
              <div className="text-sm text-muted-foreground">Level</div>
            </div>
          </Card>
        </div>
        <div className="hidden lg:block lg:w-full">
          {sequence.length === 0 && !gameOver && (
            <button
              className="bg-primary w-full hover:shadow-xl hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 text-white font-bold py-2 px-6 rounded-lg shadow-md "
              onClick={startGame}>
              Mulai Game
            </button>
          )}
        </div>
      </div>

      <div className="lg:flex lg:flex-col lg:w-full lg:mt-4">
        <div className="gap-4">
          {!isGameStarted
            ? null
            : sequence.length > 0 && (
                <h2 className="mt-4 lg:mt-0 mb-2 text-xl text-center dark:text-white">
                  {isPlayerTurn ? "Giliran Anda!" : "Perhatikan Urutan.."}
                </h2>
              )}
        </div>
        <Card className="bg-white border-2 border-border/20 bg-card/80 backdrop-blur-sm shadow-2xl lg:p-4 lg:justify-center ">
          <div className="grid grid-cols-3 gap-4 p-4 lg:p-4 lg:gap-4 lg:place-items-center">
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

        <div className="lg:hidden">
          {sequence.length === 0 && !gameOver && (
            <button
              className="bg-primary mt-4 w-full hover:shadow-xl hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 text-white font-bold py-2 px-6 rounded-lg shadow-md "
              onClick={startGame}>
              Mulai Game
            </button>
          )}
        </div>
      </div>

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
              Gak mau😜
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
