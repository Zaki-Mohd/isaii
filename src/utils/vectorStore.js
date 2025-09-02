import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { embeddings } from './embeddings.js';
import { supabaseClient } from './supabaseClient.js';

export const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  tableName: 'documents',
  queryName: 'match_documents',
});

export const retriever = vectorStore.asRetriever({
  k: 4, // Number of documents to retrieve
});