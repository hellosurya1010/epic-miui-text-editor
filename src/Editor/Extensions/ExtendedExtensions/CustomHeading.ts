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

export type ParaStyleClass = {
    className: string,
    styleType: 'Paragraph' | "Character",
}

export const CustomHeading = Heading.extend({
    // priority: 10000,
    addStorage() {
        return {
            paraStyleClassNames: [],
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
                const styleString = classNames;
                const styleBlocks = styleString.split('}');
                const paraStyles: ParaStyleClass[] = [];

                // Iterate through the style blocks
                styleBlocks.forEach(styleBlock => {
                    // Split each style block into class name and style definitions
                    const parts = styleBlock.split('{');
                    if (parts.length === 2) {
                        const className = parts[0].trim();
                        const definitions = parts[1].trim();
                        if(definitions != ""){
                            paraStyles.push({
                                className: className.startsWith('.') ? className.substring(1) : className,
                                styleType: definitions.includes('page-break-inside') ? 'Paragraph' : "Character"
                            });
                        }
                    }
                });
                this.storage.paraStyleClassNames = paraStyles.sort((a, b) => {
                    if(a.styleType == "Character"){
                        return -1;
                    }
                    return 1;
                });
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


const extractClassNames = (styles: string): string[] => {
    const regex = /\.([\w-]+)\s*{/g;
    const classNames: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(styles)) !== null) {
        classNames.push(match[1]);
    }
    return classNames;
}