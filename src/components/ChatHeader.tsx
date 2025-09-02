import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-white/20 p-2 rounded-lg">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold">Isaii AI Assistant</h1>
        <Sparkles className="w-5 h-5 text-yellow-300" />
      </div>
      <p className="text-blue-100">
        Ask me anything about Isaii's products, mission, technology, or business model
      </p>
    </div>
  );
}