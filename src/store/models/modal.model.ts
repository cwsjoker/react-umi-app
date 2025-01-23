import { defineModel } from 'foca';

type ModalType = {
    type: string
}


const modalModel = defineModel('modalModel', {
    initialState: {
        modalQueue: []
    },
    reducers: {
        openModal(state, payload: {type: string}) {
            // state.modalQueue.push(payload.type)
        },
        closeModal(state, payload: {type: string}) {
            console.log(payload.type)
            const findIndex = state.modalQueue.findIndex(_ => _ === payload.type)
            if (findIndex > -1) {
                state.modalQueue.splice(findIndex, 1)
            }
        }
    },
    methods: {
        
    }
})

export default modalModel