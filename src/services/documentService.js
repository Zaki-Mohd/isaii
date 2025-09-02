import { vectorStore } from '../utils/vectorStore.js';
import { splitText, splitTextWithMetadata } from '../utils/textSplitter.js';
import { readFileSync } from 'fs';
import { join } from 'path';

export class DocumentService {
  static async addDocuments(documents) {
    try {
      console.log(`Adding ${documents.length} documents to vector store...`);
      await vectorStore.addDocuments(documents);
      console.log('Documents successfully added to vector store');
      return { success: true, count: documents.length };
    } catch (error) {
      console.error('Error adding documents:', error);
      throw new Error(`Failed to add documents: ${error.message}`);
    }
  }

  static async addTexts(texts, metadatas = []) {
    try {
      console.log(`Adding ${texts.length} texts to vector store...`);
      await vectorStore.addDocuments(
        texts.map((text, index) => ({
          pageContent: text,
          metadata: metadatas[index] || {},
        }))
      );
      console.log('Texts successfully added to vector store');
      return { success: true, count: texts.length };
    } catch (error) {
      console.error('Error adding texts:', error);
      throw new Error(`Failed to add texts: ${error.message}`);
    }
  }

  static async similaritySearch(query, k = 4, filter = {}) {
    try {
      console.log(`Performing similarity search for: "${query}"`);
      const results = await vectorStore.similaritySearch(query, k, filter);
      console.log(`Found ${results.length} similar documents`);
      return results;
    } catch (error) {
      console.error('Error performing similarity search:', error);
      throw new Error(`Failed to perform similarity search: ${error.message}`);
    }
  }

  static async similaritySearchWithScore(query, k = 4, filter = {}) {
    try {
      console.log(`Performing similarity search with scores for: "${query}"`);
      const results = await vectorStore.similaritySearchWithScore(query, k, filter);
      console.log(`Found ${results.length} similar documents with scores`);
      return results;
    } catch (error) {
      console.error('Error performing similarity search with scores:', error);
      throw new Error(`Failed to perform similarity search with scores: ${error.message}`);
    }
  }

  static async addTextFile(filePath, metadata = {}) {
    try {
      console.log(`Reading and processing file: ${filePath}`);
      const text = readFileSync(filePath, 'utf-8');
      const documents = await splitTextWithMetadata(text, {
        source: filePath,
        ...metadata
      });
      
      const result = await DocumentService.addDocuments(documents);
      console.log(`📄 File processed: ${result.count} chunks added from ${filePath}`);
      return result;
    } catch (error) {
      console.error('Failed to add text file:', error);
      throw error;
    }
  }

  static async addRawText(text, metadata = {}) {
    try {
      console.log('Processing raw text...');
      const documents = await splitTextWithMetadata(text, metadata);
      
      const result = await DocumentService.addDocuments(documents);
      console.log(`📝 Raw text processed: ${result.count} chunks added`);
      return result;
    } catch (error) {
      console.error('Failed to add raw text:', error);
      throw error;
    }
  }
}