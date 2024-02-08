"use client"

import Input from "@/components/Input";
import axios from "axios";
import { useState } from "react";

export default function Admin() {

  const [name,setName]=useState("");
  const [retailer,setRetailer]=useState("");
  const [price,setPrice]=useState(0);
  const [brand,setBrand]=useState("");
  const [productimage,setProductImage]=useState<File | undefined>(undefined);
  const [texture,setTexture]=useState<File | undefined>(undefined);
  const [category,setCategory]=useState("");

  const handlesubmit = (event: any)=>{
    event.preventDefault()
    console.log(name,retailer,price,brand,productimage,texture);

    if(name && retailer && price && brand && productimage && texture){

      const formData = new FormData();

      formData.append("image",productimage)
      formData.append("name",name)
      formData.append("brand",brand)
      formData.append("retailer_name",retailer)
      formData.append("price",price.toString())
      formData.append("texture",texture);
      formData.append("category",category);



      axios.post('http://localhost:6969/api/admin/upload-product',formData,{
        headers:{'Content-Type':'multipart/form-data'}
      })
      .then(()=> alert("Done"))
      .catch((e)=> alert("Error Occured"));
      
      console.log(formData);
     
      
    }

}
const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    setProductImage(e.target.files[0]);
  }
};

const handleTextureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    setTexture(e.target.files[0]);
  }
};


  return (
    <main className="flex min-h-screen flex-col items-right bg-lightBeige p-4 lg:p-24">
      <h1 className="text-5xl font-black font-mono mb-10">ADMIN</h1>
      <form className="flex flex-col max-w-96 space-y-5" onSubmit={handlesubmit}>

        <Input placeholder="Name" type="text"  value={name}  onChange={(e)=> setName(e.target.value)} />
        <Input placeholder="Retailer" type="text" value={retailer} onChange={(e)=> setRetailer(e.target.value)}  />
        <Input placeholder="Price"  type="number" value={price} onChange={(e)=> setPrice(parseInt(e.target.value))} />
        <Input placeholder="Brand" type="text" value={brand} onChange={(e)=> setBrand(e.target.value)}/>
        <Input placeholder="Category" type="text" value={category} onChange={(e)=> setCategory(e.target.value)}/>

        <section className="flex justify-between">
          <h1 className="inline-flex text-xl font-black font-mono">
            Product Image
          </h1>

          <input  type="file"  onChange={handleProductImageChange} className="w-1/3 text-base" />
        </section>
        <section className="flex justify-between">
          <h1 className="inline-flex w-2/3 text-xl font-black font-mono">
            Texture Map
          </h1>

          <input type="file" onChange={handleTextureChange} className="w-1/3 text-base" />
        </section>
        <button type="submit" className="font-mono font-black p-5 max-w-fit h-10 inline-flex justify-center border border-accBlack rounded-md items-center bg-satRed text-lightBeige hover:bg-satRed-hover hover:text-white">
          Submit
        </button>
      </form>
    </main>
  );
}
