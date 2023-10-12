import { Attribute, Attributes, Mark } from '@tiptap/core';
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import './style.css';
import { User } from '../types/WordTypes';
import { getCurrentTimestampLikeWord } from '../../../../../utils/word'
import { v4 as uuidV4 } from 'uuid';
import { Mark as MarkInstance } from "@tiptap/pm/model";
import { debounce } from '../../../../../utils/debounce';


declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        comments: {
            /**
             * @description To enable or disable the toc tracking.
             */
            addComment: ({ comment }: { comment: string }) => ReturnType,
            updateComment: (attrs: Omit<AttributresForComments, "mark"> & { comment: Comment }) => ReturnType,
        }
    }
}

export type AttributresForComments = {
    id: string,
    mark: MarkInstance,
    pos: {
        from: number,
        to: number,
    }
}

export type Comment = Required<User> & {
    comment: string,
    replies?: Omit<Comment, 'replies'>[],
}

export const CommentPluginName = "comments";

export const Comments = Mark.create<{ user: User }>({
    name: CommentPluginName,
    priority: 5000,
    addStorage() {
        return {
            showComments: true,
            commentsList: [],
            commentCollectorReference: null,
        }
    },

    addAttributes() {
        return ["comment", "id"].reduce((acc, attr) => {
            acc[attr] = {
                default: null,
                parseHTML: (el) => (el as HTMLSpanElement).getAttribute(attr),
            };
            return acc;
        }, {} as Record<string, Partial<Attribute>>);
    },

    parseHTML() {
        return [
            {
                tag: 'span[comment]',
                getAttrs: (el) => !!(el as HTMLSpanElement).getAttribute('comment')?.trim() && null,
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const { author, initials, } = this.options.user;
        const attributes = {
            ...HTMLAttributes,
            id: uuidV4(),
        }
        return ['span', attributes, 0];
    },

    addCommands() {
        return {
            addComment: ({ comment }) => ({ commands, }) => {
                const { author, initials } = this.options.user;
                const commentData: Comment = {
                    author,
                    initials,
                    comment,
                    date: getCurrentTimestampLikeWord(),
                    replies: []
                }
                commands.setMark('comments', { comment: JSON.stringify(commentData) })
                return true;
            },
            updateComment: ({ comment, id, pos }) => ({ tr, state, dispatch, view, editor }) => {
                editor.commands.setTextSelection({ ...pos, });
                editor.commands.updateAttributes(CommentPluginName, { id, comment: JSON.stringify(comment) });
                console.log('-'.repeat(100));
                // console.log({ ...mark.attrs, id, comment: JSON.stringify(commentData) }, commentData);
                // tr.addMark(pos.from, pos.to, state.schema.update('comment', ))
                // view.dispatch(tr);
                editor.commands.removeEmptyTextStyle
                return true;
            },
        }
    },
    addProseMirrorPlugins() {
        return [
            new Plugin({
                appendTransaction: (transactions, oldState, newState) => {
                    // Get the changes made in the transaction
                    const { docChanged } = transactions.find(tr => tr.docChanged) || {};
                    const commentsList: AttributresForComments[] = [];
                    if (docChanged) {
                        // Reset the array before collecting italic marks
                        newState.doc.descendants((node, pos) => {
                            if (node.isText) {
                                node.marks.forEach(mark => {
                                    if (mark.type.name === CommentPluginName) {
                                        // 'em' is the mark type for italics.
                                        commentsList.push({ mark, id: 'Hello', pos: { from: pos, to: pos + node.nodeSize } });
                                    }
                                });
                            }
                        });
                        console.log(commentsList);
                        this.storage.commentsList = commentsList;
                    }
                    return null;
                },
            }),
        ]
    },
})


debounce
