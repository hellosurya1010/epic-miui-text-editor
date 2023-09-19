import Paragraph from "@tiptap/extension-paragraph"
import { useProgressbarContext } from "../../Context/ProgressbarContext";
import { Editor, mergeAttributes } from "@tiptap/core";
import axios from "axios";
import { store } from "../../../../store/app";
import { useDispatch } from "react-redux";
import { saveFailure, saveSuccess, startSaving } from "../../../../store/fileSaveSlice";
import * as laravel from '../../../../utils/laravel'
import { addNodeAttributes, removeEmptyAttributes } from "../../Services/attributes";


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
                parseHTML: (node) => node.classList,
            },
            // ...addNodeAttributes(),
        };
    },
    renderHTML({ node, HTMLAttributes }) {
        return ['p', mergeAttributes(this.options.HTMLAttributes, removeEmptyAttributes(HTMLAttributes)), 0];
    },
})