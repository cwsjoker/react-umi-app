import { NModal } from '@/components/ui'


const CommonModal = ({...props}) => {
    return (
        <NModal opened={props.opened} onClose={() => {}}>
            <div>CommonModal</div>
        </NModal>
    )
}

export default CommonModal;