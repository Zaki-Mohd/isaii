import { validateEnvironment } from '../config/environment.js';
import { DocumentService } from '../services/documentService.js';
import { RAGService } from '../services/ragService.js';
import { readFileSync } from 'fs';
import { join } from 'path';

async function addIsaiiData() {
  try {
    // Validate environment variables
    validateEnvironment();
    console.log('✅ Environment variables validated');

    // Read the Isaii data file
    const isaiiDataPath = join(process.cwd(), 'basic.txt');
    const isaiiText = readFileSync(isaiiDataPath, 'utf-8');
    
    console.log('📄 Loaded Isaii startup profile data');
    console.log(`Text length: ${isaiiText.length} characters`);

    // Add the Isaii data with metadata
    const result = await DocumentService.addRawText(isaiiText, {
      source: 'isaii-startup-profile',
      category: 'company-info',
      type: 'startup-profile',
      company: 'isaii',
      tags: ['ai-trust', 'explainable-ai', 'ai-compliance', 'conversational-ai', 'mlops', 'privacy-aware', 'saas']
    });

    console.log(`✅ Isaii data successfully added: ${result.count} document chunks created`);

    // Initialize RAG service for testing
    const ragService = new RAGService();

    // Test questions about Isaii
    const testQuestions = [
      "What is Isaii?",
      "What products does Isaii offer?",
      "Who are Isaii's target customers?",
      "What is Isaii's mission?",
      "What technology stack does Isaii use?",
      "What is the Isaii Trust Suite?",
      "How does Isaii handle AI compliance?"
    ];

    console.log('\n🤖 Testing RAG pipeline with Isaii data...\n');

    for (const question of testQuestions) {
      console.log(`❓ Question: ${question}`);
      const response = await ragService.ask(question);
      console.log(`🤖 Answer: ${response.answer}\n`);
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('✅ Isaii data ingestion and testing completed successfully!');

  } catch (error) {
    console.error('❌ Error processing Isaii data:', error);
    process.exit(1);
  }
}

// Run the Isaii data ingestion
addIsaiiData();