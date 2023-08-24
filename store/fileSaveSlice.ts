import axios  from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Editor } from '@tiptap/core';
import * as laravel  from '../utils/laravel';


interface FileSaveState {
    fileName: string;
    isSaving: boolean;
    editor: Editor | null;
    error: string | null;
}

const initialState: FileSaveState = {
    fileName: '',
    isSaving: false,
    error: null,
    editor: null,
};

const fileSaveSlice = createSlice({
    name: 'fileSave', // Slice name
    initialState,
    reducers: {
        setContent: (state: FileSaveState, action: PayloadAction<Editor>) => {
            const editor = action.payload;
            // store.dispatch(startSaving());
            // store.dispatch(saveSuccess());
            
        },
        startSaving: (state: FileSaveState) => {
            state.isSaving = true;
            state.error = null;
        },
        saveSuccess: (state: FileSaveState) => {
            state.isSaving = false;
            state.error = null;
        },
        saveFailure: (state: FileSaveState, action: PayloadAction<string>) => {
            state.isSaving = false;
            state.error = action.payload;
        },
    },
});

export const {
    setContent,
    startSaving,
    saveSuccess,
    saveFailure,
} = fileSaveSlice.actions;

// export const fileSaveSelector = state => state.fileSave;

export default fileSaveSlice.reducer;
