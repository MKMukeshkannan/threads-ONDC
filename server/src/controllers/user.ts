import { OpenAIClient, toFile } from "@langchain/openai";
import { Request, Response } from "express";
import fs from "fs";
import { pc } from "../lib/pinecone.js";
import { memory, embedding, ollama } from "../lib/models.js";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
import { ConversationChain } from "langchain/chains";

export const suggestion = async (req: Request, res: Response) => {
  const filePath = "shirt.mp3";
  try {
    const client = new OpenAIClient();
    const buffer = fs.readFileSync(filePath);
    const response = await client.audio.transcriptions.create({
      model: "whisper-1",
      language: "en",
      file: await toFile(buffer, filePath),
      prompt: "The transcript output should always be in english.",
    });
    const transcript = response.text;

    if (!transcript.trim) throw new Error("No transcript found");

    const prompt = new PromptTemplate({
      inputVariables: ["history", "input"],
      template: `summarize what the user is trying to buy in a single statement. get context from Previous conversation section.don't say anything extra. If the current query of the user is not related to the previous conversation don't get details from Previous conversation.
          Previous Conversation:
          {history}

          Input :
          {input}
        `,
    });
    const chain = new ConversationChain({
      llm: ollama,
      memory: memory,
      prompt: prompt,
    });

    const resData: string = await req.body.input;

    const data = await chain.invoke({ input: resData });
    console.log(memory.chatHistory);

    // const index = pc.Index(process.env.PINECONE_INDEX!);

    // const vector = await embedding.embedDocuments([transcript]);

    // const products = await index.query({
    //   topK: 3,
    //   vector: vector[0],
    //   includeMetadata: true,
    // });

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
