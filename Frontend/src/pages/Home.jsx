import FAQ from "../components/Faq";
export default function Home() {
  return (
    <main className="flex-1">
      {/* HERO */}
      <section className="min-h-[90vh] flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <p className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 text-sm">
            Trusted by 10k+ developers
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Build APIs <span className="text-purple-500">Faster.</span>
          </h1>

          <p className="text-gray-400 mb-8">
            The lightweight, OLED-dark native API client.  
            Zero-friction testing for HTTP & WebSockets.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="/signin"
              className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700"
            >
              Start Testing Now →
            </a>
            <button className="px-6 py-3 rounded-lg border border-white/20">
              View Docs
            </button>
          </div>
        </div>
      </section>

      <FAQ />
    </main>
  );
}
