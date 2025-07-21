import { useRef, useState } from "react";
import Draggable from "react-draggable";

const IndexPage = () => {

  // const [activeDrags, setActiveDrags] = useState<number>(0)

  // const dragRef = useRef(null);

  // const onStart = () => {
  //   setActiveDrags(pre => ++pre)
  // };

  // const onStop = () => {
  //   setActiveDrags(pre => --pre)
  // };


  return (
    <div>
      <div className="parent fixed inset-x-0 w-[100vw] h-[100vh] mx-auto bottom-0 z-20 pointer-events-auto">
        <div className="pointer-events-auto">
          <Draggable bounds=".parent">
            <div className=" absolute w-[80px] h-[80px] bg-[#f00] bottom-[100px]">
              拖动我
            </div>
          </Draggable>
        </div>
      </div>

      {/* <div className="parent fixed inset-x-0 w-[100vw] h-[100vh] mx-auto bottom-0 -z-20 p-10"></div> */}

      {/* <Draggable bounds=".parent">
        <div className=" absolute w-[80px] h-[80px] bg-[#f00] bottom-[100px]">
          拖动我
        </div>
      </Draggable> */}

    </div>
    // <div style={{height: '800px', width: '800px', position: 'relative', overflow: 'auto', padding: '10px', background: '#f00' }}>
    //     <Draggable ref={dragRef} bounds="parent" onStart={onStart} onStop={onStart}>
    //       <div className="w-[180px] h-[180px] bg-[#fff]">
    //         I can only be moved within my offsetParent.<br /><br />
    //         Both parent padding and child margin work properly.
    //       </div>
    //     </Draggable>
    // </div>
  );
};
export default IndexPage;
