import { OpenAIEmbeddings } from "@langchain/openai";

export const embedding = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "text-embedding-3-large",
  dimensions: 1536,
});
