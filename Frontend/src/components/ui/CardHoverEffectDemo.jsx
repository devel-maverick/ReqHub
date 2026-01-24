import React from "react";
import { HoverEffect } from "./card-hover-effect";

export function CardHoverEffectDemo({ items }) {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={items} />
    </div>
  );
}
