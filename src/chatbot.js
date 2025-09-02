import { validateEnvironment } from './config/environment.js';
import { DocumentService } from './services/documentService.js';
import { RAGService } from './services/ragService.js';

export class RAGChatbot {
  constructor() {
    validateEnvironment();
    this.ragService = new RAGService();
    console.log('🤖 RAG Chatbot initialized');
  }

  async addKnowledgeBase(documents) {
    try {
      const result = await DocumentService.addDocuments(documents);
      console.log(`📚 Knowledge base updated: ${result.count} documents added`);
      return result;
    } catch (error) {
      console.error('Failed to update knowledge base:', error);
      throw error;
    }
  }

  async addTexts(texts, metadatas = []) {
    try {
      const result = await DocumentService.addTexts(texts, metadatas);
      console.log(`📝 Texts added to knowledge base: ${result.count} texts`);
      return result;
    } catch (error) {
      console.error('Failed to add texts:', error);
      throw error;
    }
  }

  async searchSimilar(query, k = 4, filter = {}) {
    try {
      return await DocumentService.similaritySearch(query, k, filter);
    } catch (error) {
      console.error('Failed to search similar documents:', error);
      throw error;
    }
  }

  async chat(question) {
    try {
      const response = await this.ragService.ask(question);
      console.log(`💬 Chat completed for: "${question}"`);
      return response;
    } catch (error) {
      console.error('Failed to process chat:', error);
      throw error;
    }
  }

  async chatWithDetails(question) {
    try {
      const response = await this.ragService.askWithContext(question);
      console.log(`💬 Detailed chat completed for: "${question}"`);
      return response;
    } catch (error) {
      console.error('Failed to process detailed chat:', error);
      throw error;
    }
  }
}

// Example usage
async function main() {
  try {
    const chatbot = new RAGChatbot();

    // Add some initial knowledge
    await chatbot.addTexts([
      "LangChain.js is a TypeScript/JavaScript port of the Python LangChain library for building AI applications.",
      "Supabase provides a PostgreSQL database with pgvector extension for storing and querying vector embeddings.",
      "Gemini models from Google AI offer state-of-the-art language understanding and generation capabilities."
    ], [
      { category: "framework" },
      { category: "database" },
      { category: "ai-model" }
    ]);

    // Interactive chat
    const response = await chatbot.chat("What is LangChain.js?");
    console.log('\n🎯 Final Response:');
    console.log(response.answer);

  } catch (error) {
    console.error('❌ Chatbot error:', error);
  }
}

// Uncomment to run the main function
// main();