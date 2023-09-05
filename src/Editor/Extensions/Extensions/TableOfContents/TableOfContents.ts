import { Extension } from '@tiptap/core';
import { Node } from '@tiptap/pm/model';
import { Plugin, PluginKey } from "prosemirror-state"
import { Decoration, DecorationSet } from "prosemirror-view"
import './style.css';


export type HeadingAttributresForTOC = {
    id: string,
    node: Node,
}

export const TableOfContents = Extension.create({
    name: 'tableOfContents',
    addStorage() {
        return {
            headings: [],
        }
    },
    addProseMirrorPlugins() {
        return [
            new Plugin({
                state: {
                    init() {
                        return DecorationSet.empty;
                    },
                    apply: (tr, prev, oldState, state) => {
                        // Create a new decoration set
                        const decorations: Decoration[] = [];
                        const headings: HeadingAttributresForTOC[] = [];
                        // Traverse the document to find paragraph and heading nodes
                        state.doc.descendants((node, pos) => {
                            if (node.type.name == "heading") {
                                // Add 'id' attribute as a decoration to the node
                                let id = `node-${node.type.name}-${pos}`;
                                decorations.push(
                                    Decoration.node(pos, pos + node.nodeSize, {id})
                                );
                                headings.push({
                                    node,
                                    id,
                                });
                            }
                        });
                        this.editor.storage.tableOfContents.headings = headings;
                        // Return the new decoration set
                        return DecorationSet.create(state.doc, decorations);
                    },
                },
                props: {
                    decorations(state) {
                        return this.getState(state);
                    },
                },
            }),
        ]
    },
})

