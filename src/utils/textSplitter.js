import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
  separators: ['\n\n', '\n', ' ', ''],
});

export async function splitText(text) {
  try {
    const docs = await textSplitter.createDocuments([text]);
    console.log(`Text split into ${docs.length} chunks`);
    return docs;
  } catch (error) {
    console.error('Error splitting text:', error);
    throw new Error(`Failed to split text: ${error.message}`);
  }
}

export async function splitTextWithMetadata(text, metadata = {}) {
  try {
    const docs = await textSplitter.createDocuments([text], [metadata]);
    console.log(`Text split into ${docs.length} chunks with metadata`);
    return docs;
  } catch (error) {
    console.error('Error splitting text with metadata:', error);
    throw new Error(`Failed to split text with metadata: ${error.message}`);
  }
}