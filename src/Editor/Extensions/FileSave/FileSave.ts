import axios  from 'axios';
import { Editor } from "@tiptap/core";
import { Node } from "@tiptap/core";
import { store } from "../../../../store/app";
import { saveFailure, saveSuccess, startSaving } from "../../../../store/fileSaveSlice";
import * as laravel from '../../../../utils/laravel';


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fileSave: {
            saveFile: () => ReturnType,
        }
    }
}

export const FileSave = Node.create({
    name: 'fileSave',
    addCommands() {
        return {
            saveFile: () => ({ editor }) => {
                return fileSave(editor);
            },
        }
    },
})


const fileSave = (editor: Editor) => {
    try {
        const { fileSave } = store.getState();
        if (fileSave.isSaving) return true;
        store.dispatch(startSaving());
        axios.post(`${laravel.url}/update-document-content/123456`, { content: editor.getHTML() })
            .then(res => {
                store.dispatch(saveSuccess());
            }).catch(err => {
                store.dispatch(saveFailure("error"));
            })
    } catch (error) {
        console.error(error);
    }
    return true;
}