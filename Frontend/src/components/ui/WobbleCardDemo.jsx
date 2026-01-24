import React from "react";

export function WobbleCardDemo({ plans }) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div
          key={plan.title}
          className="relative rounded-[32px] px-8 py-10 bg-gradient-to-br from-white/10 via-white/[0.02] to-transparent border border-white/10 shadow-[0_0_80px_rgba(88,28,135,0.4)] text-left flex flex-col justify-between min-h-[260px]"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-white">
              {plan.title}
            </h2>
            <p className="text-base text-gray-300 mb-4">
              {plan.description}
            </p>
            {plan.features && (
              <ul className="space-y-2 text-sm text-gray-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-[2px] text-emerald-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-6 text-3xl font-bold">
            <span className={plan.priceColor}>{plan.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
