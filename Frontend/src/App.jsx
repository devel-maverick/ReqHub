import {
  BoltIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

import heroUI from "./assets/hero-ui.png";
import heroBot from "./assets/hero-bot.png";

export default function Home() {
  return (
    <div className="bg-[#070712] text-white overflow-hidden">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Build, Test & <br />
            <span className="text-violet-400">Automate APIs</span>
            <br />
            with AI Agents
          </h1>

          <p className="text-gray-400 mt-6 max-w-xl">
            A modern API playground with AI-powered agents to test,
            monitor, and automate your API workflows.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700">
              Get Started Free
            </button>
            <button className="px-6 py-3 rounded-xl border border-gray-600">
              View Docs
            </button>
          </div>
        </div>

        {/* RIGHT HERO */}
        <div className="relative">
          <img src={heroUI} className="rounded-2xl shadow-2xl" />
          <img
            src={heroBot}
            className="absolute -right-12 bottom-0 w-40"
          />
        </div>
      </section>

      {/* AI FEATURES */}
      <section className="flex justify-center gap-12 text-gray-300 pb-24">
        <Feature icon={<BoltIcon className="w-6" />} text="AI Generate Request" />
        <Feature icon={<ShieldCheckIcon className="w-6" />} text="AI Validate Response" />
        <Feature icon={<CodeBracketIcon className="w-6" />} text="AI Generate Code" />
      </section>

      {/* BIG UI PREVIEW */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <img
          src={heroUI}
          className="rounded-2xl border border-white/10 shadow-2xl"
        />
      </section>

      {/* MINI FEATURES */}
      <section className="flex justify-center gap-16 text-gray-400 pb-24">
        <Mini text="Multiple HTTP Methods" />
        <Mini text="Auth & Headers" />
        <Mini text="Save & History" />
      </section>

      {/* FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <h2 className="text-3xl font-bold text-center mb-14">
          Everything you need to build better APIs
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          <Card title="Unlimited API Requests" />
          <Card title="AI Automation & Insights" />
          <Card title="User Management & Auth" />
          <Card title="Save & Organize Requests" />
        </div>
      </section>

    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-violet-400">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Mini({ text }) {
  return <span>{text}</span>;
}

function Card({ title }) {
  return (
    <div className="bg-[#0c0c1d] border border-white/10 rounded-xl p-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">
        Powerful tools designed for modern API development.
      </p>
    </div>
  );
}
