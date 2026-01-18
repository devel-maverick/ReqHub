const faqs = [
  {
    q: "Is it really free?",
    a: "Yes, core API testing is free forever."
  },
  {
    q: "Does it support GraphQL?",
    a: "GraphQL & WebSockets are fully supported."
  },
  {
    q: "How secure is my data?",
    a: "Your data stays private and encrypted."
  },
  {
    q: "Can I import Postman collections?",
    a: "Import support coming soon."
  }
];

export default function FAQ() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <details
            key={i}
            className="bg-white/5 rounded-xl p-5 cursor-pointer"
          >
            <summary className="font-medium">{f.q}</summary>
            <p className="text-gray-400 mt-3">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
