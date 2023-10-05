/* eslint-disable import/no-extraneous-dependencies */
import { getMarkRange, Mark, mergeAttributes } from '@tiptap/react';
import { Plugin, TextSelection } from 'prosemirror-state';

export interface FootnoteOptions {
  HTMLAttributes: Record<string, any>,
}

const marks = ["w:pPr", "w:pStyle", "w:r", "w:rPr", "w:rPr",  "w:t",];

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
  }
}

export const CrateMark = ({tag}): Mark => {
    return  Mark.create<FootnoteOptions>({
      name: tag,
      // priority: 2000,
      addOptions() {
        return {
          HTMLAttributes: {},
        };
      },
    
      addAttributes() {
        return {
          name: {
            default: "",
            parseHTML: (el: HTMLSpanElement) => (el as HTMLSpanElement).getAttribute('name'),
            // renderHTML: (attrs: {title: string}) => ({ 'title': attrs.title }),
          },
        };
      },
    
      parseHTML() {
        return [
          {
            tag: `span[name="${tag}"]`,
          },
        ];
      },
    
      renderHTML({ HTMLAttributes }) {
        const attributes = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes);
        return [tag, attributes, 0];
      },
        
    });
} 

export const XmlMarks = () => marks.map(mark => CrateMark({tag: mark}));




