# RAG Chatbot with LangChain.js and Supabase

A production-ready Retrieval-Augmented Generation (RAG) chatbot built with LangChain.js, Google Gemini, and Supabase vector store.

## Features

- 🤖 **Gemini-powered**: Uses Google's Gemini models for both LLM and embeddings
- 🗄️ **Supabase Vector Store**: PostgreSQL with pgvector for efficient similarity search
- 🔄 **Complete RAG Pipeline**: Standalone question processing, document retrieval, and context-aware answers
- 📚 **Document Management**: Easy document ingestion and metadata filtering
- 🛡️ **Production Ready**: Comprehensive error handling and logging

## Prerequisites

1. **Supabase Project**: Create a project at [supabase.com](https://supabase.com)
2. **Google AI API Key**: Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## Setup

1. **Environment Variables**: Copy `.env.example` to `.env` and fill in your values:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   SUPABASE_PROJECT_URL=your_supabase_project_url_here
   SUPABASE_API=your_supabase_service_role_key_here
   ```

2. **Supabase Database Setup**: Run the SQL queries provided in the "Supabase SQL Setup" section below.

3. **Install Dependencies**:
   ```bash
   npm install
   ```

## Usage

### Basic Example
```bash
npm run start:basic
```

### Advanced Example with Filtering
```bash
npm run start:advanced
```

### Chatbot Class Usage
```bash
npm run start:chatbot
```

### Programmatic Usage

```javascript
import { RAGChatbot } from './src/chatbot.js';

const chatbot = new RAGChatbot();

// Add documents
await chatbot.addTexts([
  "Your knowledge base content here...",
], [
  { source: "docs", category: "general" }
]);

// Chat
const response = await chatbot.chat("Your question here");
console.log(response.answer);
```

## Architecture

- **Config**: Environment variable management and validation
- **Utils**: Core utilities for LLM, embeddings, and vector store setup
- **Services**: Business logic for document management and RAG processing
- **Examples**: Demonstration scripts for different use cases

## File Structure

```
src/
├── config/
│   └── environment.js       # Environment configuration
├── utils/
│   ├── supabaseClient.js   # Supabase client setup
│   ├── embeddings.js       # Gemini embeddings configuration
│   ├── llm.js              # Gemini LLM setup
│   ├── vectorStore.js      # Vector store and retriever
│   ├── combineDocuments.js # Document combination utility
│   └── prompts.js          # LangChain prompt templates
├── services/
│   ├── documentService.js  # Document management
│   └── ragService.js       # RAG pipeline implementation
├── examples/
│   ├── basicUsage.js       # Basic RAG example
│   └── advancedUsage.js    # Advanced filtering example
└── chatbot.js              # Main chatbot class
```