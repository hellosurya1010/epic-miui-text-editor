import { mergeAttributes } from "@tiptap/core";
import Heading from "@tiptap/extension-heading";

const HeadingClasses = Array.from({ length: 6 }, (_, i) => `Heading${i + 1}`);

export const CustomHeading = Heading.extend({
    priority: 10000,
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: "NoHeading",
                // parseHTML: (node: HTMLElement) => {
                //     const headingLevel = HeadingClasses.find(headingLevel => node.classList.contains(headingLevel));
                //     console.log(node, 1, node.classList.contains('heading'), { headingLevel, HeadingClasses });
                //     return 'MyHeading';
                // },
                // renderHTML: (attrs) => {
                //     console.log(attrs, 22222222222222);
                //     return attrs;
                // }
            },
        }
    },
    renderHTML({ node, HTMLAttributes }) {
        // console.log(HTMLAttributes, node.attrs.level);
        const hasLevel = this.options.levels.includes(node.attrs.level)
        const level = hasLevel
            ? node.attrs.level
            : this.options.levels[0]
        return [`p`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    },
})