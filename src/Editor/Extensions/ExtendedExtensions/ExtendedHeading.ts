import { removeEmptyAttributes } from './../../Services/attributes';
import { mergeAttributes, NodeConfig } from "@tiptap/core";
import Heading from "@tiptap/extension-heading";
import { object } from "prop-types";
import { addNodeAttributes } from "../../Services/attributes";
import { Editor } from '@tiptap/react';

const HeadingClasses = Array.from({ length: 6 }, (_, i) => `Heading${i + 1}`);

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        paraStyle: {
            setParaStyle: () => ReturnType,
        }
    }
}

export const CustomHeading = Heading.extend({
    priority: 10000,
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: "",
                parseHTML: (node: HTMLElement) => {
                    // const headingLevel = HeadingClasses.find(headingLevel => node.classList.contains(headingLevel));
                    return [...node.classList].join(' ');
                },
                renderHTML: (attrs: any) => {
                    // console.log(attrs.class.contains(`${Heading}${attrs.level}`));
                    return attrs;
                }
            },
            ...addNodeAttributes(),
        }
    },
    renderHTML({ node, HTMLAttributes }) {
        // console.log(HTMLAttributes);
        const hasLevel = this.options.levels.includes(node.attrs.level)
        const level = hasLevel
            ? node.attrs.level
            : this.options.levels[0];
        return [`p`, mergeAttributes(this.options.HTMLAttributes, { ...removeEmptyAttributes(HTMLAttributes), class: `${HTMLAttributes.class} Heading${level}`, 'data': 'sample' }), 0]
    },
    addCommands() {
        return {
            ...this.parent?.(),
            setParaStyle: () => ({ editor }: {editor: Editor}) => {
                // console.log(editor.state.selection);
                return true;
            },
        }
    }
})