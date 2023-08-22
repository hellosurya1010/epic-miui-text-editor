import Paragraph from "@tiptap/extension-paragraph"
import { useProgressbarContext } from "../../Context/ProgressbarContext";
import { Editor } from "@tiptap/core";
import axios from "axios";
import { store } from "../../../../store/app";
import { useDispatch } from "react-redux";
import { saveFailure, saveSuccess, setContent, startSaving } from "../../../../store/fileSaveSlice";
import * as laravel from '../../../../utils/laravel'

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

export const CustomParagraph = Paragraph.extend({
    addKeyboardShortcuts() {
        return {
            "Mod-s": () => this.editor.commands.saveFile(),
        }
    },
    addAttributes() {
        // Return an object with attribute configuration
        return {
            class: {
                default: 'Paragraph',
            },
        };
    },
    addCommands() {
        return {
            ...this.parent?.(),
            saveFile: () => (props) => {
                const {editor} = props;
                console.log(props);
                return fileSave(editor)
            }
        }
    }
})