import { useEffect } from "react";
import bus, { BusEventType } from "@/utils/bus";
import { NButton } from '@/components/ui';

const indexPage = () => {
    useEffect(() => {
        const fn = () => {
            console.log(1111)
        }
        bus.on(BusEventType.HOME, fn)
        return () => {
            bus.off(BusEventType.HOME, fn)
        }
    }, [])

    return (
        <>
            <NButton  onClick={() => {
                bus.emit(BusEventType.HOME)
            }}>bus</NButton>
        </>
    )
}

export default indexPage;