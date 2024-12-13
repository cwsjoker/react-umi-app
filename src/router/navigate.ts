import { useNavigate } from 'react-router-dom'

// export const navigate: ReturnType<typeof useNavigate> = (s: string) => {
//     console.log('router...', s)
//     useNavigate()
// }

export let navigate: ReturnType<typeof useNavigate> = () => {
    console.error('navigate 不支持在 inject 之前调用！');
  };
  export const injectNavigate = (n: typeof navigate) => (navigate = n);