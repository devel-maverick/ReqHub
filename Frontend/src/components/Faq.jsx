import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is ReqHub really free?",
    a: "Yes! Core API testing features are free forever for individual developers. We also offer premium plans for teams needing advanced collaboration and cloud sync capabilities."
  },
  {
    q: "Does it WebSockets?",
    a: "Absolutely. You can test REST and WebSocket connections from a single unified interface without switching tools."
  },
  {
    q: "How secure is my data?",
    a: "Security is our top priority. Your requests and environment variables are encrypted locally. We execute a zero-knowledge architecture ensures only you have access to your sensitive keys."
  },
  {
    q: "Can I import Postman collections?",
    a: "No, we dont't support importing standard Postman collection v2.1 files directly but we are working on a migration tool to make the transition easier."
  },
  {
    q: "Is there a desktop app available?",
    a: "ReqHub is currently a web-first platform optimized for performance, but a native Electron desktop wrapper is on our roadmap for Q4 2026."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Gradients */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Everything you need to know about ReqHub
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`border border-gray-800 rounded-lg overflow-hidden transition-colors duration-300 ${openIndex === index ? "bg-gray-900 border-gray-700" : "bg-black hover:bg-gray-900/50"}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`text-lg font-medium ${openIndex === index ? "text-white" : "text-gray-300"}`}>
                  {faq.q}
                </span>
                <div className={`p-2 rounded-full transition-colors ${openIndex === index ? "bg-white text-black" : "bg-gray-900 text-gray-400"}`}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-gray-800 pt-4 text-sm">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
