"use client";
import Chatform from "@/components/Chatform";
import ChatMessage from "@/components/ChatMessage";
import { useState, useEffect } from "react";
import { socket } from "@/lib/socketClient";
import { motion } from "framer-motion";

export default function Home() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user_joined", (message) => {
      setMessages((prev) => [...prev, { sender: "System", message }]);
    });

    return () => {
      socket.off("user_joined");
      socket.off("message");
    };
  }, []);

  const handleSendMessage = (message: string) => {
    const data = { room, message, sender: username };
    setMessages((prev) => [...prev, { sender: username, message }]);
    socket.emit("message", data);
  };

  const handleJoinRoom = () => {
    if (!room || !username) {
      alert("Please enter both room name and username.");
      return;
    } else {
      socket.emit("join-room", { room, username });
      setJoined(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center px-4 py-10">
      {!joined ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Join a Chat Room</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleJoinRoom();
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Room Name</label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Join Room
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl mx-auto space-y-4"
        >
          <h1 className="text-center text-2xl font-bold text-indigo-800">Room: {room}</h1>
          <div className="h-[500px] overflow-y-auto border border-gray-300 rounded-xl p-4 bg-white shadow-inner custom-scrollbar">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                message={msg.message}
                isOwnMessage={msg.sender === username}
              />
            ))}
          </div>
          <Chatform onSendMessage={handleSendMessage} />
        </motion.div>
      )}
    </div>
  );
}
