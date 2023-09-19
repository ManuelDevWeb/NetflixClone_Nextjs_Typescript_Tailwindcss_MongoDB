import {create} from 'zustand';

export interface ModalStoreInterface{
    movieId?: string;
    isOpen: boolean;
    openModal: (movideId: string) => void;
    closeModal: () => void;
}

// Create a store
const useInfoModal=create<ModalStoreInterface>((set)=>({
    // Initial state
    movieId: undefined,
    isOpen: false,
    // Actions
    openModal: (movieId: string)=>set({isOpen: true, movieId}),
    closeModal: ()=>set({isOpen: false, movieId: undefined})
}))

export {useInfoModal}