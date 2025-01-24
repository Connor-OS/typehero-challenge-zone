import React, { useState, useEffect, useCallback } from 'react';
import { cn } from "@/lib/utils";
import WordDisplay from './WordDisplay';

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

interface EndlessModeProps {
  initialWord: string;
  onGameOver: (finalScore: number) => void;
}

const EndlessMode: React.FC<EndlessModeProps> = ({ initialWord, onGameOver }) => {
  const [words, setWords] = useState<string[]>([initialWord]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [round, setRound] = useState(1);
  const [wordsInRound, setWordsInRound] = useState(0);

  const getRandomWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
  }, []);

  const generateWords = useCallback(() => {
    const newWords: string[] = [];
    for (let i = 0; i < round; i++) {
      newWords.push(getRandomWord());
    }
    return newWords;
  }, [round, getRandomWord]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      onGameOver(score);
    }
  }, [timeLeft, score, onGameOver]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value === words.join(" ")) {
      setScore((prev) => prev + words.length);
      setTimeLeft((prev) => prev + 10);
      setWordsInRound((prev) => {
        const newWordsInRound = prev + 1;
        if (newWordsInRound >= 5) {
          setRound((prevRound) => prevRound + 1);
          return 0;
        }
        return newWordsInRound;
      });
      setWords(generateWords());
      setInput("");
    }
  };

  const borderWidth = Math.min(round * 2, 12);

  return (
    <div 
      className={cn(
        "min-h-screen flex flex-col items-center justify-center p-4",
        "border border-[#ea384c]"
      )}
      style={{ borderWidth }}
    >
      <div className="mb-8 space-y-4 text-center">
        <div className="text-xl">
          Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        <div className="text-xl text-[#ea384c]">
          Round: {round}
        </div>
      </div>
      
      <WordDisplay word={words.join(" ")} input={input} />
      
      <input
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

export default EndlessMode;
