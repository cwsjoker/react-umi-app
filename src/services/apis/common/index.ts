import { createApi } from "@/services/request";
// import { CommonApi }  from './types's

export default {
  common: {
    get: () =>
      createApi({
        url: "/api/common/list",
        method: "get",
      }),
  },
};
