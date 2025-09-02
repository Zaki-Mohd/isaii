import { PromptTemplate } from '@langchain/core/prompts';

export const standaloneQuestionTemplate = `Given a question, convert it to a standalone question.
question: {question}
standalone question:`;

export const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);

export const answerTemplate = `You are a friendly and helpful support assistant.  
Always answer the user's question **only using the provided context**.  

Rules:
- If the answer is clearly stated in the context, provide it in a natural, conversational way.  
- If the answer is not in the context, say exactly: "I'm sorry, I don't know the answer to that."  
- Do not make up information, do not infer beyond the context, and do not add extra details.  

context: {context}  
question: {question}  
answer:
`;

export const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);