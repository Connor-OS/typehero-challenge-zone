import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from "@/lib/utils";
import TimerSelector from '../components/TimerSelector';
import WordDisplay from '../components/WordDisplay';
import Results from '../components/Results';

const WORDS = [
  "a", "about", "all", "also", "and", "as", "at", "be", "because", "but", "by",
  "can", "come", "could", "day", "do", "even", "find", "first", "for", "from",
  "get", "give", "go", "have", "he", "her", "here", "him", "his", "how", "I",
  "if", "in", "into", "it", "its", "just", "know", "like", "look", "make",
  "man", "many", "me", "more", "my", "new", "no", "not", "now", "of", "on",
  "one", "only", "or", "other", "our", "out", "people", "say", "see", "she",
  "so", "some", "take", "tell", "than", "that", "the", "their", "them", "then",
  "there", "these", "they", "thing", "think", "this", "those", "time", "to",
  "two", "up", "use", "very", "want", "way", "we", "well", "what", "when",
  "which", "who", "will", "with", "would", "year", "you", "your"
];

const Index = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedTime, setSelectedTime] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [totalWords, setTotalWords] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const getRandomWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
  }, []);

  const startGame = useCallback(() => {
    setCurrentWord(getRandomWord());
    setInput("");
    setScore(0);
    setTimeLeft(selectedTime * 60);
    setIsPlaying(true);
    setGameOver(false);
    setTotalWords(0);
    inputRef.current?.focus();
  }, [selectedTime, getRandomWord]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setGameOver(true);
    }
  }, [timeLeft, isPlaying]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value === currentWord) {
      setScore((prev) => prev + 1);
      setTotalWords((prev) => prev + 1);
      setCurrentWord(getRandomWord());
      setInput("");
    }
  };

  const calculateWPM = () => {
    const minutes = selectedTime;
    return Math.round(totalWords / minutes);
  };

  if (!isPlaying && !gameOver) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-bold mb-12">TypeHero</h1>
        <TimerSelector selectedTime={selectedTime} onTimeSelect={setSelectedTime} />
        <button
          onClick={startGame}
          className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Results
          score={score}
          wpm={calculateWPM()}
          onRestart={startGame}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-xl">
        Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>
      
      <WordDisplay word={currentWord} input={input} />
      
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        className="word-input"
        autoFocus
      />
      
      <div className="mt-8 score-display">
        Score: {score}
      </div>
    </div>
  );
};

export default Index;