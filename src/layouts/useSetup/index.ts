import { useAuthNavigate } from '@/router/hooks';
import { injectNavigate } from '@/router/navigate';
import { useLayoutEffect } from 'react';


const useSetup = () => {
    const navigate = useAuthNavigate()
    useLayoutEffect(() => {
        injectNavigate(navigate)
    }, [navigate])
}

export default useSetup