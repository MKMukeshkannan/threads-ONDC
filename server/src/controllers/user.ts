import { OpenAIClient, toFile } from "@langchain/openai";
import { Request, Response } from "express";
import { pc } from "../lib/pinecone.js";
import { embedding, llama2 } from "../lib/models.js";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";

export const suggestion = async (req: Request, res: Response) => {
  const filePath = "ecommerce.mp3";
  try {
    const client = new OpenAIClient();
    if (!req.file) throw new Error("no audio file");

    const buffer = req.file.buffer;
    const command = req.body.command;
    console.log(command);
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
      template: `summarize what the user is trying to buy and related to it in a single statement. get context from Previous conversation section.don't say anything extra. If the current query of the user is not related to the previous conversation don't get details from Previous conversation.
          Previous Conversation:
          {history}

          Input :
          {input}
        `,
    });

    console.log("transcript : ", transcript);

    const chain = new LLMChain({
      llm: llama2,
      prompt: prompt,
    });

    const data = await chain.call({ input: transcript , history : command });

    const index = pc.Index(process.env.PINECONE_INDEX || "test");

    const vector = await embedding.embedDocuments([data.text]);

    const productsRespose = await index.query({
      topK: 4,
      vector: vector[0],
      includeMetadata: true,
    });

    const products = productsRespose.matches.map((product) => {
      return product.metadata;
    });

    res.status(200).json({
      status: "success",
      data: products,
      command : data.text,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
