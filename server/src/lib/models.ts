import { OpenAIEmbeddings } from "@langchain/openai";
import { BufferWindowMemory } from "langchain/memory";
import { Ollama } from "@langchain/community/llms/ollama";

export const llama2 = new Ollama({
  baseUrl: process.env.OLLAMA as string,
  model: "llama2",
  temperature: 0,
});

export const embedding = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "text-embedding-3-large",
  dimensions: 1536,
});

export const memory = new BufferWindowMemory({ k: 1 });
