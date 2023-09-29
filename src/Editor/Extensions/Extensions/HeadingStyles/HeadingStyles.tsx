import axios from 'axios';
import { Editor } from "@tiptap/core";
import { Node } from "@tiptap/core";
import * as laravel from '../../../../../utils/laravel';
import { Extension } from '@tiptap/core';
import './style.css';


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        HeadingStyles: {
            setHeadingStyle: ({ className }: { className: string }) => ReturnType,
        }
    }
}

export const HeadingStyles = Extension.create({
    name: 'HeadingStyles',
    addCommands() {
        return {
            setHeadingStyle: ({ className }) => ({ editor }: { editor: Editor }) => {
                const oldAttributes = editor.getAttributes('heading');
                editor.commands.setNode('paragraph', { ...oldAttributes, class: className });
                return true;
            },
        }
    },
})


