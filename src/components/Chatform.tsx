'use client'
import React, { useState } from 'react'

function Chatform({ onSendMessage }: { onSendMessage: (message: string) => void }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      console.log("Message submitted:", message);
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      className="flex items-center gap-3 mt-4 bg-white/70 backdrop-blur-lg p-3 rounded-xl shadow-md border border-gray-300"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 text-sm md:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition-all duration-200 placeholder-gray-400"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button
        type="submit"
        className="px-4 py-2 md:px-6 md:py-2.5 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-200"
      >
        🚀 Send
      </button>
    </form>
  );
}

export default Chatform;
