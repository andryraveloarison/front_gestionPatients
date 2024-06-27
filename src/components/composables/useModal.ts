import { ref } from 'vue'

const showModalState = ref(false)


export function useModal() {

    return {

        showModalState,
        showModal: () => (showModalState.value = true),
        closeModal: () => (showModalState.value = false)
    
    }
}