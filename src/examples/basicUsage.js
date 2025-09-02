import { validateEnvironment } from '../config/environment.js';
import { DocumentService } from '../services/documentService.js';
import { RAGService } from '../services/ragService.js';

async function basicExample() {
  try {
    // Validate environment variables
    validateEnvironment();
    console.log('✅ Environment variables validated');

    // Initialize RAG service
    const ragService = new RAGService();
    console.log('✅ RAG service initialized');

    // Sample documents to add
    const sampleDocuments = [
      {
        pageContent: "LangChain is a framework for developing applications powered by language models. It provides tools for document loading, text splitting, embeddings, and vector stores.",
        metadata: { source: "langchain-docs", category: "introduction" }
      },
      {
        pageContent: "Supabase is an open source Firebase alternative that provides a Postgres database, authentication, instant APIs, and real-time subscriptions.",
        metadata: { source: "supabase-docs", category: "database" }
      },
      {
        pageContent: "Gemini is Google's most capable AI model family, offering advanced reasoning capabilities for text, code, image, audio and video understanding.",
        metadata: { source: "gemini-docs", category: "ai-models" }
      },
      {
        pageContent: "Vector databases store high-dimensional vectors and enable similarity search. They are essential for AI applications like semantic search and RAG systems.",
        metadata: { source: "vector-db-guide", category: "technology" }
      }
    ];

    // Add documents to vector store
    console.log('\n📄 Adding sample documents...');
    await DocumentService.addDocuments(sampleDocuments);

    // Perform similarity search
    console.log('\n🔍 Testing similarity search...');
    const searchResults = await DocumentService.similaritySearch(
      "What is LangChain?", 
      2
    );
    
    console.log('Search results:');
    searchResults.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc.pageContent.substring(0, 100)}...`);
    });

    // Test RAG pipeline
    console.log('\n🤖 Testing RAG pipeline...');
    const ragResponse = await ragService.ask("What is LangChain and how does it work?");
    
    console.log('\n📋 RAG Response:');
    console.log(`Question: ${ragResponse.question}`);
    console.log(`Answer: ${ragResponse.answer}`);

    // Test detailed RAG pipeline
    console.log('\n🔍 Testing detailed RAG pipeline...');
    const detailedResponse = await ragService.askWithContext("How do vector databases work with AI?");
    
    console.log('\n📋 Detailed RAG Response:');
    console.log(`Original Question: ${detailedResponse.question}`);
    console.log(`Standalone Question: ${detailedResponse.standaloneQuestion}`);
    console.log(`Retrieved Docs: ${detailedResponse.retrievedDocs}`);
    console.log(`Answer: ${detailedResponse.answer}`);

  } catch (error) {
    console.error('❌ Error in basic example:', error);
    process.exit(1);
  }
}

// Run the example
basicExample();