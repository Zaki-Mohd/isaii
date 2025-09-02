import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { config } from '../config/environment.js';

export const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: config.geminiApiKey,
  model: "embedding-001",
});