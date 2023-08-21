import Paragraph from "@tiptap/extension-paragraph"

export const CustomParagraph = Paragraph.extend({
    addAttributes() {
        // Return an object with attribute configuration
        return {
            class: {
                default: 'Paragraph',
            },
        };
    },
})