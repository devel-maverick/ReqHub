import React from "react";
import { InfiniteMovingCards } from "./infinite-moving-cards";

const testimonials = [
  {
    quote: "Best API tool ever! Blazing fast and beautiful UI.",
    name: "Sarah",
    title: "Backend Dev",
  },
  {
    quote: "Faster than Postman and so much easier to use.",
    name: "Alex",
    title: "Fullstack",
  },
  {
    quote: "Beautiful UI & UX. Love the glassmorphism!",
    name: "Priya",
    title: "Frontend",
  },
  {
    quote: "The only API client I use now. Highly recommended!",
    name: "Chris",
    title: "DevOps",
  },
  {
    quote: "The infinite testimonials are so cool!",
    name: "Taylor",
    title: "Designer",
  },
];

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
