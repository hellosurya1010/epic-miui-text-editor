/* eslint-disable import/no-extraneous-dependencies */
import { getMarkRange, Mark, mergeAttributes, Node } from '@tiptap/react';
import { Plugin, TextSelection } from 'prosemirror-state';
import { addNodeAttributes, removeEmptyAttributes } from '../../Services/attributes';
import { ParagraphOptions } from '@tiptap/extension-paragraph';

export interface FootnoteOptions {
    HTMLAttributes: Record<string, any>,
}

const wordMarkTags = [
    "w\\:pPr",
    "w\\:pStyle",
    "w\\:r",
    "w\\:t",
    "w\\:rPr",
    "w\\:i",
    "w\\:proofErr",
    "w\\:rStyle",
    "w\\:sectPr",
    "w\\:pgSz",
    "w\\:pgMar",
    "w\\:cols",
    "w\\:docGrid"
]

const wordNodeTags = [
    "w\\:p",
]

export const getWordTagsMark = () => {
    return wordMarkTags.map((tag, index) => {
        return Mark.create<FootnoteOptions>({
            name: tag,
            addAttributes() {
                return {
                    ...this.parent?.(),
                    ...addNodeAttributes(),
                }
            },

            parseHTML() {
                return [
                    {
                        tag,
                    },
                ];
            },

            renderHTML({ mark, HTMLAttributes }) {
                console.log(mark);
                return [tag.replace('\\', ''), mergeAttributes(this.options.HTMLAttributes, removeEmptyAttributes(HTMLAttributes)), 0]
            },
        });
    });
}

export const getWordTagsNode = () => {
    return wordNodeTags.map((tag, index) => {
        return Node.create({
            name: tag.replace('\\', ''),

            priority: 1000 + index,
            addOptions() {
                return {
                    HTMLAttributes: {},
                }
            },

            group: 'block',

            content: 'inline*',

            parseHTML() {
                return [
                    { tag },
                ]
            },

            renderHTML({ HTMLAttributes }) {
                return [tag.replace('\\', ''), mergeAttributes(this.options.HTMLAttributes, removeEmptyAttributes(HTMLAttributes)), 0]
            },


        })

    });
}

export const SpanRetain = Mark.create<FootnoteOptions>({
    name: 'footnote',
    // priority: 2000,
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
            },
        ];
    },

    renderHTML({ mark, HTMLAttributes }) {
        return [`span`, mergeAttributes(this.options.HTMLAttributes, removeEmptyAttributes(HTMLAttributes)), 0]
    },



});
