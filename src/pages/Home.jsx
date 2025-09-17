// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Camera, CameraOff } from "lucide-react";

const DEFAULT_FOCUS_MIN = 25; // can be adapted by plan later
const DEFAULT_BREAK_MIN = 5;

export default function Home() {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_FOCUS_MIN * 60);
  const [sessionCount, setSessionCount] = useState(0);

  // Placeholder “focus status” until the on-device model is wired
  const [focusStatus, setFocusStatus] = useState("Analyzing…");

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            // Session complete: toggle break/focus
            if (!isBreak) {
              setIsBreak(true);
              setSessionCount((c) => c + 1);
              return DEFAULT_BREAK_MIN * 60;
            } else {
              setIsBreak(false);
              return DEFAULT_FOCUS_MIN * 60;
            }
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isBreak]);

  const startSession = () => setIsRunning(true);
  const pauseSession = () => setIsRunning(false);
  const resetSession = () => {
    setIsRunning(false);
    setIsBreak(false);
    setSecondsLeft(DEFAULT_FOCUS_MIN * 60);
  };

  const mmss = (total) => {
    const m = Math.floor(total / 60).toString().padStart(2, "0");
    const s = Math.floor(total % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
      // Placeholder “status” loop to mimic model output for now
      setFocusStatus("Focused");
    } catch (err) {
      console.error("Error accessing webcam: ", err);
      alert("Unable to access webcam. Please allow camera permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    setFocusStatus("Camera off");
  };

  return (
    <div className="min-h-screen bg-[#1e1a17] text-white">
      {/* Top header strip */}
      <header className="px-6 md:px-20 py-6 bg-gradient-to-r from-[#2d2420] to-[#3a3028] shadow-md">
        <h1 className="text-2xl md:text-3xl font-extrabold">
          AI Focus Session
        </h1>
        <p className="text-sm text-gray-300">
          Pomodoro + real-time AI distraction detection (on-device). Privacy-first by design.
        </p>
      </header>

      {/* Main content grid */}
   {/* Main content grid */}
<main className="max-w-5xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Session panel */}
  <section className="lg:col-span-2 bg-[#2f2925] rounded-2xl shadow-md p-5 md:p-6">
    {/* Title + controls */}
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-xl md:text-2xl font-bold">Current Session</h2>
        <p className="text-gray-300">
          {isBreak ? "Break in progress" : "Focus interval"}
        </p>
      </div>

      {/* Controls: wrap and fit available space */}
      <div className="flex flex-wrap gap-3">
        {!isRunning ? (
          <button
            onClick={startSession}
            className="flex items-center justify-center gap-2 bg-amber-800 hover:bg-amber-900 px-4 py-2 rounded-xl shadow-md transition"
          >
            <Play size={18} /> Start
          </button>
        ) : (
          <button
            onClick={pauseSession}
            className="flex items-center justify-center gap-2 bg-amber-800/70 hover:bg-amber-900 px-4 py-2 rounded-xl shadow-md transition"
          >
            <Pause size={18} /> Pause
          </button>
        )}
        <button
          onClick={resetSession}
          className="flex items-center justify-center gap-2 border border-amber-800 px-4 py-2 rounded-xl hover:bg-amber-900/30 transition"
        >
          <RotateCcw size={18} /> Reset
        </button>
        {!isCameraOn ? (
          <button
            onClick={startCamera}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition"
            title="Enable AI focus detection"
          >
            <Camera size={18} /> Camera On
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition"
          >
            <CameraOff size={18} /> Camera Off
          </button>
        )}
      </div>
    </div>

    {/* Stack timer above video to remove side gaps */}
    <div className="mt-6 flex flex-col gap-6">
      {/* Timer card */}
      <div className="bg-[#3a3028] rounded-2xl p-6 md:p-8 text-center shadow-inner">
        <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-widest">
          {mmss(secondsLeft)}
        </div>
        <div className="mt-3 text-gray-300">
          {isBreak ? "Take a short break" : "Deep focus — minimize distractions"}
        </div>
      </div>

      {/* Camera preview card */}
      <div className="rounded-2xl overflow-hidden border-4 border-[#2d2420] shadow-2xl bg-[#1e1a17]">
        <div className="w-full aspect-video md:max-h-[360px]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover bg-black"
          />
        </div>
      </div>
      <p className="text-xs text-gray-300">
        AI runs locally. No recording or cloud upload. Toggle camera anytime.
      </p>
    </div>
  </section>

  {/* Status and plan sidebar */}
  <aside className="bg-[#26211e] rounded-2xl shadow-md p-5 md:p-6 space-y-5">
    {/* Focus status */}
    <div className="p-4 bg-[#2f2925] rounded-xl">
      <h3 className="text-base md:text-lg font-bold text-amber-900">Focus status</h3>
      <p className="text-gray-200 mt-1">
        {isCameraOn ? focusStatus : "Camera is off. Enable to analyze focus."}
      </p>
      <p className="text-xs text-gray-400 mt-2">
        Model looks for gaze direction, posture, micro-signals to estimate attention.
      </p>
    </div>

    {/* Adaptive plan */}
    <div className="p-4 bg-[#2f2925] rounded-xl">
      <h3 className="text-base md:text-lg font-bold text-amber-900">Adaptive plan</h3>
      <ul className="text-gray-300 space-y-1.5">
        <li>Today’s target: {DEFAULT_FOCUS_MIN} min focus, {DEFAULT_BREAK_MIN} min break</li>
        <li>Next step: +5 min focus after 3 successful sessions</li>
        <li>Current sessions completed: {sessionCount}</li>
      </ul>
      <p className="text-xs text-gray-400 mt-2">
        Plan gradually increases focus span week over week.
      </p>
    </div>

    {/* Gamification */}
    <div className="p-4 bg-[#2f2925] rounded-xl">
      <h3 className="text-base md:text-lg font-bold text-amber-900">Streaks & badges</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="px-3 py-1 rounded-full bg-amber-900/40 text-sm">Newbie Focus</span>
        <span className="px-3 py-1 rounded-full bg-amber-900/40 text-sm">3-Day Streak</span>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Earn rewards for consistent focus to boost motivation.
      </p>
    </div>

    {/* Privacy */}
    <div className="p-4 bg-[#2f2925] rounded-xl">
      <h3 className="text-base md:text-lg font-bold text-amber-900">Privacy</h3>
      <p className="text-gray-300">
        On-device analysis only. No video storage, no cloud upload. Explicit consent required to enable camera.
      </p>
    </div>
  </aside>
</main>

      {/* Bottom CTA strip */}
      <footer className="px-6 md:px-20 py-8 bg-gradient-to-r from-[#3a3028] to-[#2d2420] rounded-t-3xl shadow-inner">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xl font-bold">Stay consistent</h4>
            <p className="text-gray-300 text-sm">
              Build focus like a workout—small gains add up.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={startSession}
              className="bg-amber-800 hover:bg-amber-900 px-5 py-3 rounded-xl shadow-md transition"
            >
              Resume
            </button>
            {!isCameraOn ? (
              <button
                onClick={startCamera}
                className="border border-amber-800 px-5 py-3 rounded-xl hover:bg-amber-900/30 transition"
              >
                Enable AI
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="border border-amber-800 px-5 py-3 rounded-xl hover:bg-amber-900/30 transition"
              >
                Disable AI
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}