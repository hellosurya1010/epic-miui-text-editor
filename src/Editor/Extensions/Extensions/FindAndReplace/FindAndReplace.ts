import { CommandProps, Editor, Extension, Node } from "@tiptap/core";
import axios from 'axios';
import { store } from "../../../../../store/app";
import * as laravel from '../../../../../utils/laravel';
import { Plugin } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "prosemirror-view";
import './style.css';


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        search: {
            wordSearch: ({ searchingWord }: { searchingWord: string }) => ReturnType,
        }
    }
}

export const FindAndReplace = Extension.create({
    name: 'search',
    addOptions() {
        return {
            searching: false,
            updating: false,
            searchingWord: '',
        }
    },
    addCommands() {
        return {
            wordSearch: ({ searchingWord }) => ({ state: { tr }, dispatch }) => {
                this.options.searchingWord = searchingWord;
                dispatch(tr);
                return true;
            },
            wordReplace: () => () => {
                return true;
            },
            wordReplaceAll: () => () => {
                return true;
            },
            wordClearSearch: () => () => {
                return true;
            },
        }
    },
    addProseMirrorPlugins() {
        return [
            new Plugin({
                state: {
                    init(config, { doc }) {
                        console.log('hello');
                        return DecorationSet.create(doc, []);
                    },
                    // apply(tr, value, oldState, newState) {
                    //     // console.log({ tr, value, oldState, newState });
                    //     return value;
                    // },
                    apply: (tr, value) => {
                        const { searching, updating, searchingWord } = this.options;
                        console.log();
                        if (searching && searchingWord) {
                            const decorations: Decoration[] = [];
                            tr.doc.descendants((node, pos) => {
                                if (node.isText) {
                                    const { text } = node;
                                    const keywords = ['lorem', "Ipsum", "is", "simply", "dummy", "text", "of", "the", "printing", "and", "typesetting",];
                                    const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
                                    let match;
                                    while ((match = keywordRegex.exec(text ? text : "")) !== null) {
                                        const from: number = pos + match.index;
                                        const to: number = from + match[0].length;
                                        const decoration: Decoration = Decoration.inline(from, to, {
                                            class: "find",
                                        })
                                        decorations.push(decoration);
                                    }
                                }
                            });
                            return value.add(tr.doc, decorations);
                        }
                        return value;
                    },
                },
                props: {
                    decorations(state) {
                        // console.log(state, this.getState(state));
                        return this.getState(state);
                    },
                },
            })
        ]
    }
})


// const wordSearch = ({ editor, tr, state, }: CommandProps): boolean => {
//     console.log(this);
//     const { from, to } = state.selection;
//     const selecteText = state.doc.textBetween(from, to);
//     console.log(selecteText);
//     return true;
// }
// const wordReplace = ({ editor, tr, state, }: CommandProps): boolean => {
//     return true;
// }
// const wordReplaceAll = ({ editor, tr, state, }: CommandProps): boolean => {
//     return true;
// }
// const wordClearSearch = ({ editor, tr, state, }: CommandProps): boolean => {
//     return true;
// }