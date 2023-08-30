import {
    InputRule,
    mergeAttributes,
    type ExtendedRegExpMatchArray,
} from "@tiptap/core";
import { Image, type ImageOptions } from "@tiptap/extension-image";
import { ResizableImage } from "mui-tiptap";

export type ResizableImageOptions = ImageOptions & {
    /**
     * Return true if this is an img src we will permit to be created/rendered.
     *
     * If not provided, defaults to allowing all non-empty image `src` values.
     *
     * This option can be used to restrict which images are permitted. For
     * instance, this can be set such that only images from a certain set of
     * hostnames are allowed.
     */
    isAllowedImgSrc(src: string | null): boolean;
};

/**
 * A modified version of Tiptap’s `Image` extension
 * (https://tiptap.dev/api/nodes/image), which adds the ability to resize images
 * directly in the editor. A drag handle appears in the bottom right when
 * clicking on an image, so users can interactively change the size.
 */

export const MathNodeName = 'mathml';

export const MathNode = ResizableImage.extend<ResizableImageOptions>({
    name: MathNodeName,
    addAttributes() {
        return {
            ...this.parent?.(),
            mathml: {
                default: '',
            },
        };
    },

    renderHTML({ HTMLAttributes }) {
        console.log(HTMLAttributes);
        return [
            "img",
            mergeAttributes(
                // Always render the `height="auto"` attribute by default, since we control the
                // width with resizing (and this maintains the image aspect ratio)
                {
                    height: "auto",
                },
                this.options.HTMLAttributes,
                HTMLAttributes
            ),
        ];
    },

    parseHTML() {
        return [
            {
                tag: "img[mathml]",
            },
        ];
    },


});

export default ResizableImage;
