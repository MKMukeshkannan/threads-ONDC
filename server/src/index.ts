import express, { Request, Response } from "express";
import errorHandler from "./middleware/ErrorHandler.js";
import { corsOptions, PORT } from "./utils/config.js";
import cors from "cors";
import pool from "./utils/pgClient.js";
import multer from "multer";
import { supabase } from "./utils/Supabaseclient.js";
import {v4 as uuidv4}  from 'uuid';

const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const storage = multer.memoryStorage()
const upload = multer({storage:storage});


app.post('/upload-product', upload.single('image'), async(req:Request,res:Response)=>{

  const avatarFile =req.file?.buffer;

  const mimetype=req.file?.mimetype;
  const [file, filetype] = (mimetype || '').split('/');

  const id= uuidv4();

  if(file!="image"){
    return res.status(400).send("Not An Image File");
  }
 
  let response,img_url;

  if(avatarFile){
      const FileName=id+"."+filetype;
      const {data,error}=await supabase
      .storage
      .from('store')
      .upload(FileName,avatarFile,{
          cacheControl:'3600',
          upsert:false
      })
      response=data;
    };
  
  if(response){
    img_url=`${process.env.SUPABASE_URL}/storage/v1/object/public/store/${response.path}`
  }

  //const {name,price,rating,texture,retailer}=req.body
  //const result= await pool.query("INSERT INTO shop(id,name,img_url,price,rating,texture,retailer) values($1,$2,$3,$4,$5,$6,$7)",[id,name,img_url,price,rating,texture,retailer]);


  const result= await pool.query("INSERT INTO shop(id,img_url) values($1,$2)",[id,img_url]);

  res.json({result,img_url});

})



app.get("/",async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/getAll", async (req: Request, res: Response) => {
  const result= await pool.query("SELECT * FROM shop");
  return res.json(result.rows);
});

app.get("/get/:id",async (req: Request, res: Response) => {
  const id=req.params.id;
  const result= await pool.query("SELECT * FROM shop where id = $1",[id]);
  return res.json(result.rows);
})

app.post('/post',async (req: Request, res: Response) => {

  const {id,img_url}=req.body;
  const result= await pool.query("INSERT INTO shop(id,img_url) values($1,$2)",[id,img_url]);
  return res.status(201).send("Sucessfully Created");

})

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
