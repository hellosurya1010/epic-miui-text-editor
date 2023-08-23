import Paragraph from "@tiptap/extension-paragraph"
import { useProgressbarContext } from "../../Context/ProgressbarContext";
import { Editor } from "@tiptap/core";
import axios from "axios";
import { store } from "../../../../store/app";
import { useDispatch } from "react-redux";
import { saveFailure, saveSuccess, setContent, startSaving } from "../../../../store/fileSaveSlice";
import * as laravel from '../../../../utils/laravel'



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
})