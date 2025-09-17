// src/pages/FAQ.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
const faqs = [
  {
    q: "What is AI Focus?",
    a: "AI Focus combines Pomodoro timing with on-device distraction detection to nudge timely breaks and grow focus span safely.",
  },
  {
    q: "Does it record my camera?",
    a: "No. Video is analyzed locally in real-time, never stored or uploaded. Camera can be turned on/off anytime.",
  },
  {
    q: "Can I use it without the camera?",
    a: "Yes. The Pomodoro timer and adaptive plan work without the camera. The AI status requires the camera.",
  },
  {
    q: "How does the adaptive plan work?",
    a: "The app estimates current focus capacity and gradually increases focus blocks week by week, like a training plan.",
  },
  {
    q: "Is there a free version?",
    a: "Core Pomodoro and basic features are free. Advanced AI and analytics may require a premium plan.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <div className="min-h-screen bg-[#1e1a17] text-white">
      {/* Header */}
      <header className="px-6 md:px-20 py-10 bg-gradient-to-r from-[#2d2420] to-[#3a3028] shadow-md">
        <h1 className="text-3xl md:text-4xl font-extrabold">Frequently Asked Questions</h1>
        <p className="text-sm text-gray-300 mt-2">Answers to common questions about AI Focus and privacy.</p>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 md:px-20 py-10">
        <section className="space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="bg-[#2f2925] rounded-2xl shadow-md">
              <button
                onClick={() => toggle(i)}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-semibold">{item.q}</span>
                <span
                  className={`ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full border border-amber-800 text-amber-300 transition ${
                    open === i ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-gray-300">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Still need help */}
        <section className="mt-10 bg-[#26211e] rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-amber-900">Still have questions?</h2>
          <p className="text-gray-300 mt-1">
            Reach out and the team will reply within 24–48 hours.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-4 bg-amber-800 hover:bg-amber-900 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
          >
            Contact Support
          </Link>
        </section>
      </main>
    </div>
  );
}