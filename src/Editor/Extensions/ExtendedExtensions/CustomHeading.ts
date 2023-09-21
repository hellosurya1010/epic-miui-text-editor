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
            setParaStyleClassNames: ({ classNames }: { classNames: string }) => ReturnType,
            setCharacterStyleClassNames: ({ classNames }: { classNames: string[] }) => ReturnType,
            setCssStyle: ({ styles }: { styles: string }) => ReturnType,
        }
    }
}

export const initialCssStyles = `
.surya{
    color: red;
}
`;

export const CustomHeading = Heading.extend({
    // priority: 10000,
    addStorage() {
        return {
            paraStyleClassNames: [],
            characterStyleClassNames: [],
            cssStyles: initialCssStyles,
        }
    },
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
                    return attrs;
                }
            },
            // ...addNodeAttributes(),
        }
    },
    renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level)
        const level = hasLevel
            ? node.attrs.level
            : this.options.levels[0];
        console.log(HTMLAttributes);
        return [`p`, mergeAttributes(this.options.HTMLAttributes, { ...removeEmptyAttributes(HTMLAttributes), class: `${HTMLAttributes.class} Heading${level}`, 'data': 'sample' }), 0]
    },
    addCommands() {
        return {
            // ...this.parent?.(),
            setParaStyle: () => ({ editor }) => {
                return true;
            },
            setParaStyleClassNames: ({ classNames }) => ({ editor }) => {
                const extractClassNames = (styles: string): string[] => {
                    const regex = /\.([\w-]+)\s*{/g;
                    const classNames: string[] = [];
                    let match: RegExpExecArray | null;

                    while ((match = regex.exec(styles)) !== null) {
                        classNames.push(match[1]);
                    }
                    return classNames;
                }
                this.storage.paraStyleClassNames = extractClassNames(classNames);
                return true;
            },
            setCharacterStyleClassNames: ({ classNames }) => ({ editor }) => {
                this.storage.characterStyleClassNames = classNames;
                return true;
            },
            setCssStyle: ({ styles }) => ({ editor }) => {
                this.storage.cssStyles = styles;
                return true;
            },
        }
    }
})