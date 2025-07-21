import { useEffect, useState } from "react";
import Drag  from '@/components/Uikit/Drag';

const IndexPage = () => {

  return (
   <>

   <div className=" fixed w-[100vw] h-[100vh]">
      <Drag
        defaultPosition={{
          x: 80,
          y: 300
        }}
        >
        <div className="w-80 h-80 bg-[#f00]"></div>
      </Drag>

      <Drag
        dragName="drag1"
        defaultPosition={{
          x: 200,
          y: 200
        }}
      >
        <div className="w-80 h-80 bg-[#0f0]"></div>
      </Drag>
   </div>


    
   
   </>
  );
};

export default IndexPage;
