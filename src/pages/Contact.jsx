// src/pages/Contact.jsx
import React, { useState } from "react";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);

  // Honeypot anti-spam field (hidden from real users)
  const [botField, setBotField] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (botField) {
      // Spam likely; silently succeed
      setOk(true);
      return;
    }
    setSending(true);
    try {
      // TODO: integrate email/API (e.g., serverless function) and captcha if needed
      await new Promise((r) => setTimeout(r, 800));
      setOk(true);
    } catch {
      setOk(false);
      alert("Failed to send message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1a17] text-white">
    

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 md:px-20 py-10 grid gap-8">
        {/* Info card */}
        <section className="bg-[#2f2925] rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-amber-900">Support hours</h2>
          <p className="text-gray-300 mt-1">Mon–Fri, 9:00–18:00 IST</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#3a3028]">
              <p className="text-sm text-gray-400">Email</p>
              <a className="font-semibold hover:underline" href="mailto:support@moonbrew.app">
                support@moonbrew.app
              </a>
            </div>
            <div className="p-4 rounded-xl bg-[#3a3028]">
              <p className="text-sm text-gray-400">Response time</p>
              <p className="font-semibold">24–48 hours</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            The team aims to protect privacy; do not include sensitive personal information in messages.
          </p>
        </section>

        {/* Form card */}
        <section className="bg-[#2f2925] rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-amber-900 mb-4">Send a message</h2>

          {ok ? (
            <div className="p-4 rounded-xl bg-[#3a3028] text-amber-200">
              Thanks — the message has been received.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* Honeypot (hidden) */}
              <label className="hidden">
                Do not fill this field
                <input
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-300">Name</span>
                <input
                  required
                  name="name"
                  className="mt-1 w-full rounded-xl bg-[#3a3028] text-white px-3 py-2 outline-none ring-1 ring-transparent focus:ring-amber-800 placeholder:text-gray-400"
                  placeholder="Your name"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-300">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-1 w-full rounded-xl bg-[#3a3028] text-white px-3 py-2 outline-none ring-1 ring-transparent focus:ring-amber-800 placeholder:text-gray-400"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-300">Subject</span>
                <input
                  name="subject"
                  className="mt-1 w-full rounded-xl bg-[#3a3028] text-white px-3 py-2 outline-none ring-1 ring-transparent focus:ring-amber-800 placeholder:text-gray-400"
                  placeholder="How can we help?"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-300">Message</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="mt-1 w-full rounded-xl bg-[#3a3028] text-white px-3 py-2 outline-none ring-1 ring-transparent focus:ring-amber-800 placeholder:text-gray-400 resize-y"
                  placeholder="Share details about your question..."
                />
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={sending}
                  className="px-5 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 disabled:opacity-60 transition"
                >
                  {sending ? "Sending..." : "Send message"}
                </button>
                <p className="text-xs text-gray-400">
                  By submitting, consent is given to be contacted about this request.
                </p>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}