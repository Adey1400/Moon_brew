// Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1e1a17] text-white flex flex-col">
      {/* Hero Section */}
  <header className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8 md:gap-12 px-6 md:px-20 py-16 bg-gradient-to-r from-[#2d2420] to-[#3a3028] rounded-b-3xl shadow-lg">
  {/* Text Content */}
  <div className="md:w-1/2 text-center md:text-left space-y-6">
    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
      Boost Your <span className="text-amber-900">Focus</span> with AI
    </h1>
    <p className="text-lg md:text-xl text-gray-300">
      Combine Pomodoro technique with real-time AI distraction detection.
      Improve focus span gradually with personalized plans and gamified rewards.
    </p>
    <div className="flex justify-center md:justify-start gap-4">
      <button
        onClick={() => navigate("/login")}
        className="bg-amber-800 hover:bg-amber-900 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
      >
        Get Started
      </button>
      <button className="border border-amber-800 px-6 py-3 rounded-xl hover:bg-amber-900 hover:text-white transition">
        Learn More
      </button>
    </div>
  </div>

  {/* Hero Image */}
  <div className="md:w-1/2 flex justify-center md:justify-end">
    <img
      src="/src/assets/late-night-studying-stockcake.jpg"
      alt="Focused person at desk"
      className="max-w-[520px] w-full rounded-3xl shadow-2xl border-4 border-[#2d2420]"
    />
  </div>
</header>

      {/* Features Section */}
      <section className="bg-[#26211e] text-white py-20 rounded-3xl mx-4 my-10 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4 p-6 bg-[#2f2925] rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-amber-900">AI Focus Detection</h3>
            <p className="text-gray-300">
              Real-time AI monitors your focus and gives reminders when needed.
            </p>
          </div>
          <div className="space-y-4 p-6 bg-[#2f2925] rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-amber-900">Adaptive Training</h3>
            <p className="text-gray-300">
              Gradually increase your focus span with personalized plans.
            </p>
          </div>
          <div className="space-y-4 p-6 bg-[#2f2925] rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-amber-900">Gamified Rewards</h3>
            <p className="text-gray-300">
              Earn badges, streaks, and motivation points for staying on track.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="flex flex-col items-center justify-center py-20 bg-gradient-to-r from-[#3a3028] to-[#2d2420] text-white rounded-t-3xl shadow-inner">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Ready to <span className="text-amber-900">Focus</span> Better?
        </h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-amber-800 hover:bg-amber-900 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition"
        >
          Start Your Journey
        </button>
      </section>
    </div>
  );
}