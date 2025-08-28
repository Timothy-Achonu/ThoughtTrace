"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/utils";

const inspiringQuotes = [
  {
    quote: "In the end, we'll all become stories.",
    author: "Margaret Atwood",
  },
  {
    quote: "Writing is thinking on paper.",
    author: "William Zinsser",
  },
  {
    quote: "Every word you write changes you.",
    author: null,
  },
  {
    quote: "The blank page is a canvas for your thoughts.",
    author: null,
  },
  {
    quote:
      "I write only because there is a voice within me that will not be still.",
    author: "Sylvia Plath",
  },
  {
    quote: "Writing is the painting of the voice.",
    author: "Voltaire",
  },
  {
    quote: "Paper has more patience than people.",
    author: "Anne Frank",
  },
  {
    quote:
      "A thought unrecorded is like a butterfly unseen — it exists, but the world never knows.",
    author: null,
  },
  {
    quote:
      "Writing is how I talk to myself without the embarrassment of being overheard.",
    author: null,
  },
  {
    quote: "The faintest ink is more powerful than the strongest memory.",
    author: "Chinese proverb",
  },
  {
    quote:
      "A journal is not a book you write for the world, but a mirror in which the truth agrees to look you in the eye.",
    author: null,
  },
];

export const AuthLayoutLeftSide = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspiringQuotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full md:flex flex-col 
      justify-center place-items-center hidden bg-black px-4"
    >
      <div className="relative w-full ">
        <div className="absolute -top-4 left-4 w-8 h-8 bg-purple-200 dark:bg-purple-dark rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-4 right-4 w-12 h-12 bg-emerald-200 dark:bg-emerald-900 rounded-full opacity-40 animate-pulse delay-1000"></div>

        <div className="relative min-h-[200px] flex items-center justify-center">
          <div key={currentQuote} className="animate-fade-in">
            <blockquote className="text-h-6 text-gray-800 dark:text-gray-100 leading-relaxed text-center">
              &quot;{inspiringQuotes[currentQuote].quote}&quot;
            </blockquote>
            {inspiringQuotes[currentQuote].author && (
              <span className="text-gray-800 text-body-s">
                {" "}
                {`— ${inspiringQuotes[currentQuote].author}`}{" "}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        {inspiringQuotes.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentQuote
                ? "bg-purple-light dark:bg-purple-dark w-8"
                : "bg-gray-300 dark:bg-gray-600"
            )}
          />
        ))}
      </div>

      <div className="text-center">
        <Sparkles className="mx-auto h-8 w-8 text-purple-light dark:text-purple-dark animate-spin-slow mt-4" />
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 font-medium">
          Turn your thoughts into digital ink, and your digital ink into legacy
        </p>
      </div>
    </div>
  );
};
