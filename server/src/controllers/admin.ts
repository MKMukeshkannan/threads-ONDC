import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../utils/Supabaseclient.js";
import { pc } from "../lib/pinecone.js";
import { embedding } from "../lib/models.js";
import {Ollama} from '@langchain/community/llms/ollama'
import { PineconeRecord, RecordMetadata } from "@pinecone-database/pinecone";


const index =pc.Index("sample");

 
interface Tproduct{
  
    id:string
    name:string,
    brand:string,
    description:string,
    retailer_name:string,
    img_url:string,
    price:number  | string,
    texture:string,
    category:string

}



const StoreToDB = async(ProductData:Tproduct)=>{

  try{
  
    console.log("\n Producting is Storing at Vector DB \n")
    const {id,description}=ProductData;
    const vector=await embedding.embedDocuments([description]);
    const record: PineconeRecord<RecordMetadata>[]=[];
      record.push(({
            id:id,
            values:vector[0],
            metadata:{
              ...ProductData
            }
      }))
      await index.upsert(record);
      console.log("\nStored\n");
    }
    catch(err){
      throw new Error("Error");
    }

}


const GenerateDescription = async(imageData: Buffer | undefined)=>{
 
   
    let description="";
      if(imageData){ 
      const model = new Ollama({
        model: "llava",
        baseUrl: "http://127.0.0.1:11434",
      }).bind({
        images: [imageData.toString("base64")],
      });
        description = await model.invoke("describe in 200 words on only about the clothes in this image with its color, texture , cloth material and so on and dont explain anything about the humans and background in this image ");
      }

      return description;
    
}

 
interface File{
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}


export const uploadProduct = async (req: Request, res: Response) => {

  try{
  const ImageFiles= req.files as {[fieldname:string]:File[]};

  const avatarFile = ImageFiles.image[0].buffer;
  const textureFile = ImageFiles.texture[0].buffer;

  console.log(avatarFile,textureFile);
  
  

  const ProductData = req.body;

  console.log(ProductData);

  const mimetype1=ImageFiles.image[0].mimetype;
  const mimetype2=ImageFiles.texture[0].mimetype;

  const [file1, filetype1] = (mimetype1 || "").split('/');
  const [file2, filetype2] = (mimetype2 || "").split('/');

  
  const id= uuidv4();

  if(file1!="image" || file2!="image"){
    console.log("Image File Doesn't Present")
    return res.status(400).send("Image File Doesn't Present");
  }

  let description="null";    

  if(avatarFile){
    console.log("Description is generating....")
    description = await GenerateDescription(avatarFile);
    console.log(description,"\n\ndescription generated\n");
  }; 
  
  let response=[];

  if(avatarFile && textureFile){
      const FileName={
                      ["image_"+id]   : avatarFile ,
                      ["texture_"+id] : textureFile
                    };
    
      const keys = Object.keys(FileName);
      for (let i = 0; i < keys.length; i++) {
        const filename = keys[i];
        const file = FileName[filename];
        console.log("Key:", filename, "Value:", filename);

         const {data,error}=await supabase
        .storage
        .from('store')
        .upload(filename,file,{
            cacheControl:'3600',
            upsert:false
        })

        response.push(data);

      }
    };
  
  if(!(response.length)){
    return res.status(400).send("Error Occured");
  }

  console.log(response);

  let img_url=`${process.env.SUPABASE_URL}/storage/v1/object/public/store/${(response[0])?.path}`
  let texture=`${process.env.SUPABASE_URL}/storage/v1/object/public/store/${(response[1])?.path}`
  
  let data= {
          id,
          img_url,
          texture,
          description,
          ...ProductData,
        }
        console.log("data = ",data);

        

        if((description.length)>0){
              StoreToDB(data);
              console.log("Product Stored")
        }
        else{
            throw new Error("Description not found");
        }
 

  console.log(data);res.json({ "Product Data Upload": "Done", data });
} catch (err) {
  res.status(400).send("Error Occured");
}

};
