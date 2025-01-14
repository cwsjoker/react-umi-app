import { Button } from "@mantine/core";
import homeApi from "@/services/apis/home";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import configModel from '@/store/models/config.model'
import { useModel } from 'foca'

const IndexPage = () => {
  const config = useModel(configModel, state => {
    return state.config
  })


  // get
  const { runAsync: getRunAsync } = useRequest(
    async () => {
      const res = await homeApi.user.get();
      return res;
    },
    {
      manual: true,
    }
  );
  // post
  const { runAsync: postRunAsync } = useRequest(
    async () => {
      const res = await homeApi.user.create({ name: "clear", age: 12 });
      return res;
    },
    {
      manual: true,
    }
  );
  // put
  const { runAsync: putRunAsync } = useRequest(
    async () => {
      const res = await homeApi.user.put({ name: "clear1", age: 123 });
      return res;
    },
    {
      manual: true,
    }
  );
  // delete
  const { runAsync: deleteRunAsync } = useRequest(
    async () => {
      const res = await homeApi.user.delete({ id: 10 });
      return res;
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    configModel.getConfig()
  }, [])

  return (
    <div className=" p-[10px]">
      {/* server */}
      <div className=" grid grid-cols-4 gap-10">
        <Button className="text-12 w-full h-44 p-0" size="xs" onClick={getRunAsync}>get</Button>
        <Button className="text-12 w-full h-44 p-0" size="xs" onClick={postRunAsync}>post</Button>
        <Button className="text-12 w-full h-44 p-0" size="xs" onClick={putRunAsync}>put</Button>
        <Button className="text-12 w-full h-44 p-0" size="xs" onClick={deleteRunAsync}>delete</Button>
      </div>

      {/* store */}
      {
        config.isShow && (
          <div>isshow</div>
        )
      }

      {/*  */}
    </div>
  );
};

export default IndexPage;
