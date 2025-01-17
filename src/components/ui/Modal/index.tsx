import React from 'react'
import classNames from 'classnames';
import { type ModalProps, Modal } from '@mantine/core';

type ExtendedModalProps = ModalProps & {
    classNames?: string
}


export const NModal: React.FC<ExtendedModalProps> = ({...props}) => {
    return (
        <Modal
            {...props}
            className={classNames('', props.classNames)}
        >
            {/* Modal content */}
            {props.children}
        </Modal>
    )
}
