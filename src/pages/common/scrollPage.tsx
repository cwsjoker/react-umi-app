import { useEffect, useRef, useState } from "react";
import NBScroll from "@/components/business/BScroll";
import { useRequest } from "ahooks";
import CommnApi from '@/services/apis/common'

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const IndexPage = () => {

  const [list, setList] = useState<number[]>([])
  const [pullUpOpen, setPullUpOpen] = useState<boolean>(true);

  const bs = useRef<any>();

  const { runAsync } = useRequest(
    async () => {
      const res = await CommnApi.common.get();
      return res;
    },
    {
      manual: true,
    }
  )
  
  
  const changePage = () => {
    
  }

  const changeInitPage = async () => {
    console.log('open');
    setList([]);
    setPullUpOpen(true);

    await delay(2000)

    const data: any = await runAsync()
    console.log('data', data)
    if (data) {
      setList(data)
      if (bs?.current?.refreshMethod) bs.current.refreshMethod();
    }
    
    // if (bs?.current?.refreshMethod) bs.current.refreshMethod();
    // if (bs?.current?.scrollMethod) bs.current.scrollMethod();
  }

  useEffect(() => {
    runAsync().then((res: any) => {
      setList(res)
    })
  }, [])

  return (
    <div className="p-10">
      <div>list</div>
      <div className="mt-20 overflow-hidden w-full h-[100px] bg-slate-600">
        <NBScroll
          ref={bs}
          pullUpCallback={changePage}
          pullDownCallback={changeInitPage}
          pullUpOpen={pullUpOpen}
          pullDownOpen={true}
        >
          {list.map((item) => {
            return <div key={item} className="h-30 text-[#fff]">{item}</div>;
          })}
        </NBScroll>
      </div>
    </div>
  );
};

export default IndexPage;
