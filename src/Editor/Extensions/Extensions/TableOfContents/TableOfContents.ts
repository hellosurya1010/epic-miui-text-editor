import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from "prosemirror-state"
import { Decoration, DecorationSet } from "prosemirror-view"


export const TableOfContents = Extension.create({
    name: 'tableOfContents',
    addProseMirrorPlugins() {
        return [
            new Plugin({
                state: {
                    init() {
                        return DecorationSet.empty;
                    },
                    apply(tr, prev, oldState, state) {
                        // Create a new decoration set
                        const decorations = [];

                        // Traverse the document to find paragraph and heading nodes
                        state.doc.descendants((node, pos) => {
                            console.log(node);
                            // if (node.type === schema.nodes.paragraph || node.type === schema.nodes.heading) {
                            //     // Add 'id' attribute as a decoration to the node
                            //     decorations.push(
                            //         Decoration.node(pos, pos + node.nodeSize, {
                            //             id: `node-${node.type.name}-${pos}`,
                            //         })
                            //     );
                            // }
                        });

                        // Return the new decoration set
                        return DecorationSet.create(state.doc, decorations);
                    },
                },
                props: {
                    decorations(state) {
                        // Retrieve decorations from the plugin's state
                        return this.getState(state);
                    },
                },
            }),
        ]
    },
})

