import { OpenAIClient, toFile } from "@langchain/openai";
import { Request, Response } from "express";
import fs from "fs";
import { pc } from "../lib/pinecone.js";
import { embedding } from "../lib/openai.js";

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

    const index = pc.Index(process.env.PINECONE_INDEX!);

    const vector = await embedding.embedDocuments([transcript]);

    const products = await index.query({
      topK: 3,
      vector: vector[0],
      includeMetadata: true,
    });

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
