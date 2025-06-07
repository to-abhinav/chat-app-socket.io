'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: string;
  sender: string;
  isOwnMessage?: boolean;
}

function ChatMessage({ message, sender, isOwnMessage }: ChatMessageProps) {
  const isSystemMessage = sender === 'System';

  if (isSystemMessage) {
    return (
      <motion.div
        className="flex justify-center mb-3"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="bg-gray-300/80 text-gray-700 text-sm px-4 py-2 rounded-full shadow-inner">
          {message}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`flex mb-3 px-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, x: isOwnMessage ? 30 : -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className={`relative max-w-sm p-3 rounded-2xl text-sm shadow-xl ${
          isOwnMessage
            ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-tr-none'
            : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
        }`}
      >
        {!isOwnMessage && (
          <p className="text-xs font-semibold text-gray-500 mb-1">{sender}</p>
        )}
        <p>{message}</p>

        {/* Chat bubble tail */}
        <div
          className={`absolute bottom-0 ${
            isOwnMessage ? 'right-0 -mb-2 mr-1' : 'left-0 -mb-2 ml-1'
          } w-3 h-3 bg-inherit transform rotate-45 shadow-sm`}
        ></div>
      </div>
    </motion.div>
  );
}

export default ChatMessage;
