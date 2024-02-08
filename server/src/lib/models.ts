import { OpenAIEmbeddings } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { Ollama } from "@langchain/community/llms/ollama";

export const ollama = new Ollama({
  baseUrl: "http://localhost:11434",
  model: "llama2",
  temperature: 0,
});

export const embedding = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "text-embedding-3-large",
  dimensions: 1536,
});

export const memory = new BufferMemory();
