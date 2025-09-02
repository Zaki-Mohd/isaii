import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables';
import { llm } from '../utils/llm.js';
import { retriever } from '../utils/vectorStore.js';
import { combineDocuments } from '../utils/combineDocuments.js';
import { standaloneQuestionPrompt, answerPrompt } from '../utils/prompts.js';

export class RAGService {
  constructor() {
    this.setupChain();
  }

  setupChain() {
    // Standalone question chain
    this.standaloneQuestionChain = standaloneQuestionPrompt
      .pipe(llm)
      .pipe(new StringOutputParser());

    // Retriever chain
    this.retrieverChain = RunnableSequence.from([
      (prevResult) => prevResult.standalone_question,
      retriever,
      combineDocuments,
    ]);

    // Answer chain
    this.answerChain = answerPrompt
      .pipe(llm)
      .pipe(new StringOutputParser());

    // Complete RAG chain
    this.chain = RunnableSequence.from([
      {
        standalone_question: this.standaloneQuestionChain,
        original_input: new RunnablePassthrough(),
      },
      {
        context: this.retrieverChain,
        question: ({ original_input }) => original_input.question,
      },
      this.answerChain,
    ]);
  }

  async ask(question) {
    try {
      console.log(`Processing question: "${question}"`);
      
      const response = await this.chain.invoke({ question });
      
      console.log('RAG pipeline completed successfully');
      return {
        question,
        answer: response,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error in RAG pipeline:', error);
      throw new Error(`Failed to process question: ${error.message}`);
    }
  }

  async askWithContext(question) {
    try {
      console.log(`Processing question with context retrieval: "${question}"`);
      
      // Get standalone question
      const standaloneQuestion = await this.standaloneQuestionChain.invoke({ question });
      console.log(`Standalone question: "${standaloneQuestion}"`);
      
      // Retrieve relevant documents
      const docs = await retriever.invoke(standaloneQuestion);
      console.log(`Retrieved ${docs.length} relevant documents`);
      
      // Combine documents into context
      const context = combineDocuments(docs);
      
      // Generate answer
      const answer = await this.answerChain.invoke({
        context,
        question,
      });
      
      return {
        question,
        standaloneQuestion,
        context,
        answer,
        retrievedDocs: docs.length,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error in detailed RAG pipeline:', error);
      throw new Error(`Failed to process question with context: ${error.message}`);
    }
  }
}