import { ChangeEventHandler } from "react";

interface prop {
  placeholder: string;
  type:string
  value : string | number
  onChange : ChangeEventHandler<HTMLInputElement>
  
}

export default function Input({ placeholder ,type,value,onChange}: prop) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className="shadow-[5px_5px_0px_0px_rgba(0,0,0)] h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono"
    />
  );
}
