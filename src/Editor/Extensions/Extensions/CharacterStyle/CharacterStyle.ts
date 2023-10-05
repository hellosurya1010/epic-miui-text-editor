import { Extension } from '@tiptap/core';
import { Node } from '@tiptap/pm/model';
import { Plugin, PluginKey } from "prosemirror-state"
import { Decoration, DecorationSet } from "prosemirror-view"

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        characterSt: {
            /**
             * @description To set the character style for the selected text.
             */
            setCharacterStyle: ({ className }: { className: string }) => ReturnType,
            /**
             * @description To unset the character style for the selected text.
             */
            unsetCharacterStyle: () => ReturnType,
        }
    }
}

export type CharacterStyleOptions = {
    types: string[],
}

export const CharacterStyle = Extension.create<CharacterStyleOptions>({
    name: 'characterStyle',
    addCommands() {
        return {
            setCharacterStyle: ({ className }) => ({ editor }) => {
                editor.commands.setMark('textStyle', { class: className });
                return true;
            },
            unsetCharacterStyle: () => ({ chain, editor }) => {
                editor.commands.setMark('textStyle', { class: null });
                return true;
            }
        }
    },
    addOptions() {
        return {
            types: ['textStyle'],
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    class: {
                        default: '',
                        parseHTML: (element) => element.getAttribute('class'),
                    }
                }
            }
        ]
    }
})

