import { motion } from "framer-motion";
import FAQ from "../components/Faq";
import { CardHoverEffectDemo } from "../components/ui/CardHoverEffectDemo";
import { WobbleCardDemo } from "../components/ui/WobbleCardDemo";
import { Zap, Shield, Globe, Cpu, Key, Wifi, Activity, Terminal, Star, Play, FileCode, Github, ArrowRight, Check } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  const handleNavigation = (e) => {
    e.preventDefault();
    if (authUser) {
      navigate("/tester");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden font-sans selection:bg-white/20">
      <section className="relative min-h-screen flex items-center px-6 border-b border-gray-900 overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">


          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg bg-[#111111] border border-gray-800 text-sm text-gray-300 font-mono hover:border-gray-600 transition-colors"
            >
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>NEW WebSocket Support Released!</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
              API Testing <br />
              <span className="bg-white text-black px-2">made simple</span> for <br />
              modern teams
            </h1>

            <p className="text-gray-400 mb-10 text-xl md:text-2xl max-w-lg font-light leading-relaxed">
              Open-source, ultra-fast API client for HTTP & WebSockets. Debug faster, together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <a href="/tester" onClick={handleNavigation} className="px-8 py-4 rounded-md bg-white text-black hover:bg-gray-200 font-bold text-lg transition-all flex items-center gap-2 group">
                Start Testing <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="https://github.com/devel-maverick/ReqHub" target="_blank" className="px-8 py-4 rounded-md border border-gray-700 bg-[#111111] text-white hover:bg-[#222] font-medium text-lg transition-all flex items-center gap-2">
                View on GitHub <Github className="w-5 h-5" />
              </a>
            </div>

            <div className="flex gap-6 text-sm font-mono text-gray-500">
              <span className="flex items-center gap-2"><Globe size={16} /> Cloud Sync</span>
              <span className="flex items-center gap-2"><Shield size={16} /> Local First</span>
              <span className="flex items-center gap-2"><Cpu size={16} /> macOS / Win / Linux</span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden border border-gray-800 bg-[#0D0D0D] shadow-2xl font-mono text-sm group hover:border-gray-700 transition-colors">
              <div className="bg-[#111111] px-4 py-3 border-b border-gray-800 flex items-center gap-3">
                <div className="flex items-center gap-2 bg-black border border-gray-800 rounded px-2 py-1.5 flex-1">
                  <span className="text-blue-500 font-bold text-xs">GET</span>
                  <span className="text-gray-300 text-xs truncate">https://api.reqhub.io/v1/users</span>
                </div>
                <button className="bg-white text-black px-4 py-1.5 rounded text-xs font-bold hover:bg-gray-200">SEND</button>
              </div>
              <div className="p-6 bg-[#0A0A0A] h-[320px] overflow-hidden relative">
                <div className="flex gap-4 text-xs text-gray-500 mb-4 font-mono">
                  <span className="text-green-500">Status: 200 OK</span>
                  <span>Time: 45ms</span>
                  <span>Size: 1.2KB</span>
                </div>

                <div className="space-y-1 text-gray-400 text-xs">
                  <div><span className="text-yellow-500">"status"</span>: <span className="text-green-400">"success"</span>,</div>
                  <div><span className="text-yellow-500">"data"</span>: [</div>
                  <div className="pl-4">&#123;</div>
                  <div className="pl-8"><span className="text-yellow-500">"id"</span>: <span className="text-blue-400">101</span>,</div>
                  <div className="pl-8"><span className="text-yellow-500">"name"</span>: <span className="text-green-400">"Alex Chen"</span>,</div>
                  <div className="pl-8"><span className="text-yellow-500">"role"</span>: <span className="text-green-400">"Senior Developer"</span>,</div>
                  <div className="pl-8"><span className="text-yellow-500">"active"</span>: <span className="text-purple-400">true</span></div>
                  <div className="pl-4">&#125;,</div>
                  <div className="pl-4">&#123;</div>
                  <div className="pl-8"><span className="text-yellow-500">"id"</span>: <span className="text-blue-400">102</span>,</div>
                  <div className="pl-8"><span className="text-yellow-500">"name"</span>: <span className="text-green-400">"Sarah Jones"</span>,</div>
                  <div className="pl-8"><span className="text-yellow-500">"role"</span>: <span className="text-green-400">"Product Manager"</span></div>
                  <div className="pl-4">&#125;</div>
                  <div>]</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
              </div>
            </div>
            <div className="absolute -inset-4 bg-blue-500/5 rounded-xl blur-3xl -z-10 opacity-30" />
          </motion.div>
        </div>
      </section>
      <section id="features" className="py-32 px-6 border-b border-gray-900 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
              Everything you need. <span className="text-gray-500">Nothing you don't.</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Packed with powerful features wrapped in a simplified, developer-centric interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 row-span-2 rounded-md bg-[#111] border border-gray-800 p-8 flex flex-col justify-between hover:border-gray-600 transition-colors group">
              <div>
                <div className="p-3 bg-white/5 w-fit rounded-lg mb-6 group-hover:bg-white/10 transition-colors">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Lightning Fast Performance</h3>
                <p className="text-gray-400 text-lg max-w-md">
                  Built on a modern stack to ensure your requests fly. No electron bloat, just pure web speed. Instant startup, instant results.
                </p>
              </div>
              <div className="mt-10 h-64 rounded-xl bg-[#050505] border border-gray-800 relative overflow-hidden font-mono text-xs p-4 flex flex-col justify-end">
                <div className="space-y-1.5 relative z-10">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="text-green-500">➜</span>
                    <span>curl -X GET https://api.reqhub.io</span>
                  </div>
                  <div className="text-gray-500">Resolving host... <span className="text-green-500">0ms</span></div>
                  <div className="text-gray-500">Connecting... <span className="text-green-500">1ms</span></div>
                  <div className="text-gray-500">TLS Handshake... <span className="text-green-500">2ms</span></div>
                  <div className="text-white mt-2 font-medium">
                    <span className="text-blue-500">200 OK</span>
                    <span className="text-gray-500 ml-2 font-normal">45ms total</span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20"></div>
              </div>
            </div>

            <div className="rounded-md bg-[#111] border border-gray-800 p-8 hover:border-gray-600 transition-colors group">
              <div className="p-3 bg-white/5 w-fit rounded-lg mb-6 group-hover:bg-white/10 transition-colors">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">WebSocket Support</h3>
              <p className="text-gray-400">
                Real-time testing made easy. Connect, send messages, and view streams in one place.
              </p>
            </div>
            <div className="rounded-md bg-[#111] border border-gray-800 p-8 hover:border-gray-600 transition-colors group">
              <div className="p-3 bg-white/5 w-fit rounded-lg mb-6 group-hover:bg-white/10 transition-colors">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Secure & Encrypted</h3>
              <p className="text-gray-400">
                Your keys never leave your machine. Local-first architecture for maximum security.
              </p>
            </div>
            <div className="rounded-md bg-[#111] border border-gray-800 p-8 hover:border-gray-600 transition-colors group">
              <div className="p-3 bg-white/5 w-fit rounded-lg mb-6 group-hover:bg-white/10 transition-colors">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">cURL Import</h3>
              <p className="text-gray-400">
                Paste any cURL command and start testing immediately. No manual entry needed.
              </p>
            </div>
            <div className="md:col-span-1 rounded-md bg-[#111] border border-gray-800 p-8 hover:border-gray-600 transition-colors group">
              <div className="p-3 bg-white/5 w-fit rounded-lg mb-6 group-hover:bg-white/10 transition-colors">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Resource Efficient</h3>
              <p className="text-gray-400">
                Uses 10x less RAM than Electron-based competitors.
              </p>
            </div>
            <div className="md:col-span-3 rounded-md bg-[#111] border border-gray-800 p-10 flex flex-col md:flex-row items-center gap-10 hover:border-gray-600 transition-colors relative overflow-hidden group">
              <div className="flex-1 relative z-10">
                <div className="p-3 bg-white/5 w-fit rounded-lg mb-6 group-hover:bg-white/10 transition-colors">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Real-time History & Metrics</h3>
                <p className="text-gray-400 text-lg">
                  Track every request with millisecond precision. View usage patterns, success rates, and latency distribution over time.
                </p>
              </div>
              <div className="flex-1 w-full relative z-10 flex items-end justify-between gap-1 px-4 pb-4 h-full">
                {[35, 55, 40, 70, 50, 85, 60, 95, 75, 45, 65, 80].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className={`w-full rounded-sm transition-all hover:bg-white/30 ${i === 11 ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-gray-800'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="py-32 px-6 border-b border-gray-900 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto rounded-lg border border-gray-800 bg-[#111] p-12 relative overflow-hidden">

          <div className="mb-16 max-w-2xl relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">How ReqHub works</h2>
            <p className="text-gray-400 text-lg">
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

      <section id="pricing" className="py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Simple, transparent pricing</h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Start free, upgrade when your team outgrows solo workflows. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111] border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-colors flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                <p className="text-gray-400 text-sm h-12">Perfect for growing teams and production apps. Get serious about scale.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">€27</span>
                <span className="text-gray-500">/month</span>
              </div>
              <a href="/signup" onClick={handleNavigation} className="w-full block text-center py-3 rounded bg-gray-200 text-black font-bold hover:bg-white transition-colors mb-8">
                Sign up
              </a>
              <ul className="space-y-4 flex-1">
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>2000 submissions/day</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>€0.001 per extra submission</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Community + email support</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#111] border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-colors flex flex-col relative">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Ultra</h3>
                <p className="text-gray-400 text-sm h-12">Sweet spot for established businesses. Maximum value with room to grow.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">€54</span>
                <span className="text-gray-500">/month</span>
              </div>
              <a href="/signup" onClick={handleNavigation} className="w-full block text-center py-3 rounded bg-gray-200 text-black font-bold hover:bg-white transition-colors mb-8">
                Sign up
              </a>
              <ul className="space-y-4 flex-1">
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>5000 submissions/day</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>€0.001 per extra submission</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Community + email support</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Priority Support</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#111] border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-colors flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Mega</h3>
                <p className="text-gray-400 text-sm h-12">For high-volume apps and enterprise teams. When you need serious throughput.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">€107</span>
                <span className="text-gray-500">/month</span>
              </div>
              <a href="/signup" onClick={handleNavigation} className="w-full block text-center py-3 rounded bg-gray-200 text-black font-bold hover:bg-white transition-colors mb-8">
                Sign up
              </a>
              <ul className="space-y-4 flex-1">
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>10,000 submissions/day</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>€0.001 per extra submission</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Community + email support</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>1-hour SLA</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="relative isolate overflow-hidden py-40 px-6 text-center bg-[#0A0A0A] border-t border-gray-900">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black opacity-50" />

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white relative z-10">
          Start testing APIs the modern way
        </motion.h2>
        <p className="text-gray-400 mb-12 text-xl max-w-xl mx-auto font-light relative z-10">
          ReqHub is built for developers who want speed, simplicity and power.
        </p>
        <a href="/tester" onClick={handleNavigation} className="relative z-10 px-10 py-5 rounded-md bg-white text-black hover:bg-gray-200 font-bold transition-all shadow-xl">
          Launch ReqHub Free
        </a>
      </section>

      <FAQ />
    </div>
  );
}
