import React from 'react'
import { Button } from './ui/button'
type Props = {
    color: string;
    icon:string ;
    name :string;
  };

export default function Options({icon,color,name}:Props) {
  return (
   
    
      <div className="">
        <Button
          variant="outline"
          className={`${color} rounded-full h-28 w-72 flex flex-col`}>
          
          {icon}
          <p className="text-white ">{name}</p>
        </Button>
      </div>
      
   
  )
}
