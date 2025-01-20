import { NModal } from "@/components/ui";
import { useEffect } from "react";

const RechargeModal = ({...props}) => {

    useEffect(() => {
        console.log('props.opened', props)
    }, [props.opened])

    return (
        <NModal opened={props.opened} onClose={() => props.onClose?.()}>
            <div>RechargeModal</div>
        </NModal>
    )
}

export default RechargeModal;