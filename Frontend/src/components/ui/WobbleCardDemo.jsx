import React from "react";

export function WobbleCardDemo({ plans }) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div
          key={plan.title}
          className="relative rounded-xl px-8 py-10 bg-black border border-gray-800 text-left flex flex-col justify-between min-h-[260px] hover:bg-gray-900/50 transition-colors"
        >
          <div>
            <h2 className="text-2xl md:text-2xl font-semibold mb-3 text-white tracking-tight">
              {plan.title}
            </h2>
            <p className="text-base text-gray-400 mb-6 font-light">
              {plan.description}
            </p>
            {plan.features && (
              <ul className="space-y-3 text-sm text-gray-400">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-[2px] text-white">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-8 text-3xl font-bold tracking-tight">
            <span className={plan.priceColor}>{plan.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
