import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../utils/Supabaseclient.js";

export const uploadProduct = async (req: Request, res: Response) => {
  const avatarFile = req.file?.buffer;

  const mimetype = req.file?.mimetype;
  const [file, filetype] = (mimetype || "").split("/");

  const id = uuidv4();

  if (file != "image") {
    return res.status(400).send("Not An Image File");
  }

  let response, img_url;

  if (avatarFile) {
    const FileName = id + "." + filetype;
    const { data, error } = await supabase.storage
      .from("store")
      .upload(FileName, avatarFile, {
        cacheControl: "3600",
        upsert: false,
      });
    response = data;
  }
  if (response) {
    img_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/store/${response.path}`;
  }

  res.json({ img_url });
};
