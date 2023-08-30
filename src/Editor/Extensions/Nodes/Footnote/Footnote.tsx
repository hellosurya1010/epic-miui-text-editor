/* eslint-disable import/no-extraneous-dependencies */
import { getMarkRange, Mark, mergeAttributes } from '@tiptap/react';
import { Plugin, TextSelection } from 'prosemirror-state';
import './style.css';

export interface FootnoteOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    footnote: {
      /**
       * Set a footnote mark
       */
      setFootnote: () => ReturnType,
      /**
       * Toggle a footnote mark
       */
      toggleFootnote: () => ReturnType,
      /**
       * Unset a footnote mark
       */
      unsetFootnote: () => ReturnType,
    }
  }
}

export const Footnote = Mark.create<FootnoteOptions>({
  name: 'footnote',
  // priority: 2000,
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addStorage(){
    return {
      count: 0,
    };
  },

  addAttributes() {
    return {
      title: {
        default: null,
        parseHTML: (el: HTMLSpanElement) => (el as HTMLSpanElement).getAttribute('title'),
        renderHTML: (attrs: {title: string}) => ({ 'title': attrs.title }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'footnote',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const attributes = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes);
    console.log(attributes);
    return ['footnote', attributes, 0];
  },

  addCommands() {
    return {
      setFootnote: () => (props: any) => {
        const { commands, state, chain } = props;
        const { from, to } = state.selection;
        this.storage.count += 1;
        let {count} = this.storage;
        const title = state.doc.textBetween(from, to);
        return chain().extendMarkRange("footnote")
          .insertContent({
            type: "text",
            marks: [
              {
                type: "footnote",
                attrs: {
                  title,
                },
              },
            ],
            text: `${count}`,
          })
          .focus()
          .run();

      },
      toggleFootnote: () => ({ commands }: any) => {
        return commands.toggleMark('footnote')
      },
      unsetFootnote: () => ({ commands }: any) => {
        return commands.unsetMark('footnote')
      },
    };
  },


});
