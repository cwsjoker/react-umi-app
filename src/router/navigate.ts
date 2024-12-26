import { useNavigate } from 'react-router-dom'

export let navigate: ReturnType<typeof useNavigate> = () => {
    // console.error('navigate 不支持在 inject 之前调用！');
};
export const injectNavigate = (n: typeof navigate) => (navigate = n);