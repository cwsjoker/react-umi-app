import ConetntComp from "@/components/business/Content";
import { useState } from "react";
const indexPage = () => {
  const [visible, setVisible] = useState(false);

  const arr = ['radial-gradient(61.5% 50% at 50% 50%, #E1CEFF 0%, #B49CFF 100%)', 'radial-gradient(61.5% 50% at 50% 50%, #E1CEFF 0%, #B49CFF 100%)']

  const _bg = 'bg-[linear-gradient(205deg,rgba(100,47,255,0.4)_30.6%,rgba(249,136,55,0.00)_101.86%)]';
  const _bg1 = `bg-[${arr[0]}]`

  return (
    <>
      <div className="p-10 bg-black">

        <div className=" w-[150px] h-[150px] bg-white shadow-[0_-2px_10px_0_#C24510_inset]"></div>

        <div className="mt-20 w-[150px] h-[150px] bg-black shadow-[0_1px_2px_0_rgba(0,0,0,0.30)_inset,0px_-2px_4px_0px_rgba(255,255,255,0.50)_inset]"></div>

        <div className="relative mt-20 w-[150px] h-[150px] bg-black shadow-[0_2px_10px_0_#C24510_inset] rounded-12" style={{
          clipPath: 'polygon(0 1%, 100% 31%, 100% 100%, 0% 100%)'
        }}
        >

          <div className=" absolute size-full top-0 left-0 ">111111</div>
        </div>


        <ConetntComp
          angle={5}
          wrapClassName="!w-[100px] !h-[100px]"
          conClassName=" bg-gradient-to-b from-purple-400 to-yellow-500"
        >
          {<div>11111</div>}
        </ConetntComp>

        <ConetntComp
          angle={7}
          wrapClassName="mt-10 !w-[200px]"
          conClassName=" bg-[#f00]"
          childConClassName="px-10"
        >
          {
            <div>
              <button onClick={() => {
                setVisible(!visible)
              }}>点击</button>
              <div>1111</div>
              {visible && (
                <div>
                  <div>1111</div>
                  <div>1111</div>
                  <div>1111</div>
                  <div>1111</div>
                  <div>1111</div>
                </div>
              )}
            </div>
          }
        </ConetntComp>

        <ConetntComp
          angle={6}
          direction="left"
          wrapClassName="mt-10"
          conClassName={`${_bg} gb before:bg-cbdd before:rounded-[inherit] shadow-[0_0_10px_0_#C24510_inset]`}
          childConClassName=" gbbb before:bg-cbdd before:h-12 before:rounded-[inherit] shadow-[0px_-2px_0px_0_#C24510_inset]"
          conBg={arr[0]}
        >
          {
            <div className="pb-10 -mt-10">
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
            </div>
          }
        </ConetntComp>


        
      </div>
    </>

// shadow-[1px_1px_0_0_#C24510_inset,0_0_1px_1px_#C24510_inset]
// shadow-[0_4px_6px_#C24510_inset]
// gbbb before:bg-cbdd before:h-12 before:rounded-[inherit]


// shadow-[0_1px_2px_0_rgba(0,0,0,0.30)_inset,0px_-2px_4px_0px_rgba(255,255,255,0.50)_inset]
  );
};

export default indexPage;
