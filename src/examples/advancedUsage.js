import { validateEnvironment } from '../config/environment.js';
import { DocumentService } from '../services/documentService.js';
import { RAGService } from '../services/ragService.js';

async function advancedExample() {
  try {
    validateEnvironment();
    console.log('✅ Environment validated for advanced example');

    const ragService = new RAGService();

    // Add documents with rich metadata for filtering
    const advancedDocuments = [
      {
        pageContent: "JavaScript is a programming language that enables interactive web pages and is an essential part of web applications. It runs in web browsers and on servers.",
        metadata: { 
          source: "mdn-web-docs", 
          category: "programming", 
          difficulty: "beginner",
          topics: ["javascript", "web-development"]
        }
      },
      {
        pageContent: "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components.",
        metadata: { 
          source: "react-docs", 
          category: "programming", 
          difficulty: "intermediate",
          topics: ["react", "javascript", "frontend"]
        }
      },
      {
        pageContent: "Machine learning is a subset of artificial intelligence that uses statistical techniques to give computers the ability to learn from data without being explicitly programmed.",
        metadata: { 
          source: "ml-guide", 
          category: "ai", 
          difficulty: "advanced",
          topics: ["machine-learning", "ai", "statistics"]
        }
      }
    ];

    await DocumentService.addDocuments(advancedDocuments);
    console.log('✅ Advanced documents added');

    // Test filtered similarity search
    console.log('\n🔍 Testing filtered similarity search...');
    const filteredResults = await DocumentService.similaritySearch(
      "programming language",
      3,
      { category: "programming" }
    );

    console.log('Filtered search results (programming only):');
    filteredResults.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc.pageContent.substring(0, 80)}...`);
      console.log(`   Metadata: ${JSON.stringify(doc.metadata)}`);
    });

    // Test similarity search with scores
    console.log('\n📊 Testing similarity search with scores...');
    const scoredResults = await DocumentService.similaritySearchWithScore(
      "React components",
      2
    );

    console.log('Search results with similarity scores:');
    scoredResults.forEach(([doc, score], index) => {
      console.log(`${index + 1}. Score: ${score.toFixed(4)}`);
      console.log(`   Content: ${doc.pageContent.substring(0, 80)}...`);
    });

    // Interactive Q&A session
    const questions = [
      "What is JavaScript used for?",
      "How does React help with building UIs?",
      "Explain machine learning in simple terms"
    ];

    console.log('\n🎯 Running interactive Q&A session...');
    for (const question of questions) {
      console.log(`\n❓ Question: ${question}`);
      const response = await ragService.ask(question);
      console.log(`🤖 Answer: ${response.answer}`);
    }

  } catch (error) {
    console.error('❌ Error in advanced example:', error);
    process.exit(1);
  }
}

// Run the advanced example
advancedExample();