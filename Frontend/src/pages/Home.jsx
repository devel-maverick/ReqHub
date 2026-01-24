import { motion } from "framer-motion";
import FAQ from "../components/Faq";
import { SparklesPreview } from "../components/ui/SparklesPreview";
import { CardHoverEffectDemo } from "../components/ui/CardHoverEffectDemo";
import { WobbleCardDemo } from "../components/ui/WobbleCardDemo";
import { InfiniteMovingCardsDemo } from "../components/ui/InfiniteMovingCardsDemo";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6">
        <div className="relative w-full max-w-3xl mx-auto z-10 flex flex-col items-center justify-center">
          <p className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 text-sm relative z-20">
            Trusted by <span className="text-purple-400 font-bold">10k+</span> developers
          </p>
          <div className="relative w-full flex flex-col items-center justify-center">
            {/* Sparkles cosmic effect behind headline */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <SparklesPreview headline="" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 relative z-10">
              Build APIs <span className="text-purple-500">Faster.</span>
            </h1>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-400 mb-8 text-lg relative z-20">
            The OLED-dark, ultra-fast API client for HTTP & WebSockets. Zero-friction testing, beautiful UI, and pro features.
          </motion.p>
          <div className="flex justify-center gap-4 mb-8 relative z-20">
            <a href="/tester" className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 font-semibold shadow-lg">
              Start Testing Now →
            </a>
            <button className="px-6 py-3 rounded-lg border border-white/20 font-semibold shadow-lg">
              View Docs
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES GRID - Card Hover Effect */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <CardHoverEffectDemo items={[
          {
            title: "Lightning Fast",
            description: "Send requests instantly. From URL to response in milliseconds. Optimized for productivity.",
            link: "#",
          },
          {
            title: "Secure by Design",
            description: "Authorization, tokens, environments, and cookies handled securely. Built for professional workflows.",
            link: "#",
          },
          {
            title: "HTTP + WebSockets",
            description: "Test REST APIs and WebSocket connections from a single interface. No switching tools.",
            link: "#",
          },
          {
            title: "Modern UI",
            description: "OLED-dark, clean layout inspired by modern dev tools. Built with Tailwind + Framer Motion.",
            link: "#",
          },
          {
            title: "Environment Variables",
            description: "Manage and switch between multiple environments for seamless API testing.",
            link: "#",
          },
          {
            title: "History & Starred Requests",
            description: "Easily access, search, and favorite your past API requests for maximum productivity.",
            link: "#",
          },
        ]} />
      </section>

      {/* HOW IT WORKS - Card Hover Effect */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-r from-purple-900/40 via-black to-blue-900/40 p-10 shadow-[0_0_80px_rgba(88,28,135,0.4)]">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">How ReqHub works</h2>
            <p className="text-gray-300">
              Go from URL to response in three simple steps.
            </p>
          </div>
          <CardHoverEffectDemo
            items={[
              {
                title: "Step 1 · Enter URL",
                description:
                  "Paste your API endpoint, pick the method and save it to a collection.",
                link: "#",
              },
              {
                title: "Step 2 · Configure",
                description:
                  "Add headers, params, body, auth and environments tailored to each request.",
                link: "#",
              },
              {
                title: "Step 3 · Send & inspect",
                description:
                  "Hit send and instantly inspect status, timing, headers and prettified JSON.",
                link: "#",
              },
            ]}
          />
        </div>
      </section>

      {/* TESTIMONIALS - Infinite Moving Cards */}
      <section id="testimonials" className="py-24 px-6 max-w-6xl mx-auto">
        <InfiniteMovingCardsDemo />
      </section>

      {/* PRICING - Static Gradient Cards */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Simple, transparent pricing</h2>
          <p className="text-gray-400">
            Start free, upgrade when your team outgrows solo workflows.
          </p>
        </div>
        <WobbleCardDemo
          plans={[
            {
              title: "Free",
              description: "Perfect for solo developers exploring ReqHub.",
              price: "$0",
              priceColor: "text-emerald-300",
              features: [
                "No credit card required",
                "Core HTTP & WebSocket client",
                "Local history & environments",
              ],
            },
            {
              title: "Pro",
              description: "For small teams who live in APIs every day.",
              price: "$10",
              priceColor: "text-purple-300",
              features: [
                "Shared collections & environments",
                "Higher request limits",
                "Priority issue support",
              ],
            },
            {
              title: "Enterprise",
              description: "Designed for organizations with advanced needs.",
              price: "Contact",
              priceColor: "text-sky-300",
              features: [
                "Custom SLAs & onboarding",
                "SSO & advanced security",
                "Dedicated success engineer",
              ],
            },
          ]}
        />
      </section>
      {/* CTA */}
      <section className="relative isolate overflow-hidden py-32 px-6 text-center bg-gradient-to-b from-[#1a0f2f] via-[#0d0a1a] to-black">
        <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.18), transparent 40%)" }} />
        <div className="pointer-events-none absolute inset-x-10 top-0 h-24 blur-3xl bg-purple-700/20" />
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold mb-6">
          Start testing APIs the modern way
        </motion.h2>
        <p className="text-gray-400 mb-8 text-lg">
          ReqHub is built for developers who want speed, simplicity and power.
        </p>
        <a href="/tester" className="px-8 py-4 rounded-lg bg-purple-600 hover:bg-purple-700 font-semibold shadow-lg">
          Launch ReqHub →
        </a>
        <div className="pointer-events-none absolute inset-0 border-t border-white/5" />
      </section>

      <FAQ />
    </div>
  );
}
