import { Editor, Extension, Node } from "@tiptap/core";
import axios from 'axios';
import { store } from "../../../../../store/app";
import * as laravel from '../../../../../utils/laravel';
import { Plugin } from "@tiptap/pm/state";


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        search: {
            find: () => ReturnType,
        }
    }
}

export const FindAndReplace = Extension.create({
    name: 'search',
    addCommands() {
        return {
            find: () => ({ editor, tr, state }) => {
                const { from, to } = state.selection;
                const selecteText = state.doc.textBetween(from, to);
                console.log(selecteText);
                return findText(editor);
            },
        }
    },
    addKeyboardShortcuts() {
        return {
            'Mod-s': () => findText(this.editor),
            'Mod-S': () => findText(this.editor),
        }
    },
    addProseMirrorPlugins() {
        return [
            new Plugin({
                state: {
                    init() {
                    },
                    apply(tr, old) {
                        return old;
                    },
                },
                props: {
                    decorations(state){
                        return this.getState(state);
                    }
                }
            })
        ]
    }
})


const findText = (editor: Editor) => {
    return true;
}