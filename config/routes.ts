
import type { IConfigFromPlugins } from '@@/core/pluginConfig';
import { countryExtension } from './envConfig'
// IConfigFromPlugins ???
const routes: IConfigFromPlugins['routes'] = [
    { path: "/", component: "@/pages/index" },
    { path: "/docs", component: "@/pages/docs" },
    { path: "/tsRule", component: "@/pages/tsRule" },
    { path: "/tsServe", component: "@/pages/tsServe" },
    { path: "/cssPage", component: "@/pages/cssPage" },
    { path: "/comPage", component: "@/pages/comPage" },
    { path: "/bus", component: "@/pages/common/busPage" },
    { path: "/downImg", component: "@/pages/common/downImg" },
]

const resolve = (() => {
    if (!countryExtension) return (str?: string) => str;
    const path = require('path');
    const resolve = require('enhanced-resolve');
    const extensions = ['.jsx', '.jx', '.tsx', '.ts'].map((x) => [`${countryExtension}${x}`, x]).flat();
    const srcDir = path.resolve(__dirname, '../src');
    const myResolve = resolve.create.sync({
      modules: [srcDir],
      alias: { '@': srcDir },
      extensions,
    });
    return (str?: string) => {
      if (!str) return str;
      const result = myResolve(srcDir, str);
      if (!result) return str;
      const component = path.join('@', path.relative(srcDir, result));
      // fix: windows 上 umi 解析路径问题
      return component.split(path.sep).join('/') as string;
    };
  })();

  const transformRoutes = (r: typeof routes): typeof routes => {
    if (!r?.length) return r;
    return r.map(({ component, ...route }) => ({
      component: resolve(component),
      ...route,
      routes: transformRoutes(route.routes),
    }));
  };


export default transformRoutes(routes)