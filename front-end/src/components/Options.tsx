import React from 'react'
import { Button } from './ui/button'
type Props = {
    color: string;
    icon:string ;
    name :string;
  };

export default function Options({icon,color,name}:Props) {
  return (
   
    
      
        <Button
          variant="outline"
          className={`${color} rounded-full  w-full flex flex-col`}>
          
          {icon}
          <p className="text-white ">{name}</p>
        </Button>
      
      
   
  )
}
