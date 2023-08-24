import { removeEmptyAttributes } from './../../Services/attributes';
import { mergeAttributes, NodeConfig } from "@tiptap/core";
import { Italic } from "@tiptap/extension-italic";
import { object } from "prop-types";
import { addNodeAttributes } from "../../Services/attributes";

export const ExtendedItalic = Italic.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            ...addNodeAttributes(),
        }
    },
    parseHTML() {
        return [
            {
                tag: 'span',
                getAttrs: (node: HTMLSpanElement) => node.classList.contains('I') && null,
            },
        ]
    },
    renderHTML({ mark, HTMLAttributes }) {
        return [`span`, mergeAttributes(this.options.HTMLAttributes, removeEmptyAttributes(HTMLAttributes)), 0]
    },

})