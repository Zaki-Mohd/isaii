import dotenv from 'dotenv';
import { createServer } from 'http';
import { RAGChatbot } from '../chatbot.js';

// Load environment variables
dotenv.config();

// Initialize the chatbot
let chatbot;

async function initializeChatbot() {
  try {
    chatbot = new RAGChatbot();
    console.log('🤖 RAG Chatbot server initialized');
  } catch (error) {
    console.error('Failed to initialize chatbot:', error);
    process.exit(1);
  }
}

function handleChatRequest(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { question } = JSON.parse(body);

      if (!question) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Question is required' }));
        return;
      }

      console.log(`💬 Received question: "${question}"`);
      const response = await chatbot.chat(question);
      console.log(`🤖 Generated answer: "${response.answer.substring(0, 100)}..."`);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ answer: response.answer }));
    } catch (error) {
      console.error('Error handling chat request:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        error: 'Failed to process chat request', 
        details: error.message 
      }));
    }
  });
}

const server = createServer((req, res) => {
  if (req.url === '/api/chat') {
    handleChatRequest(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = process.env.PORT || 3001;

// Initialize chatbot and start server
initializeChatbot().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Chat server running on http://localhost:${PORT}`);
  });
});