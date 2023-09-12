import { Extension } from '@tiptap/core';
import { Node } from '@tiptap/pm/model';
import { Plugin, PluginKey } from "prosemirror-state"
import { Decoration, DecorationSet } from "prosemirror-view"
import './style.css';


export type AttributresForTOCElement = {
    id: string,
    node: Node,
}

export const TOC_ELEMENTS = {
    'heading': 'heading',
    'table': 'table',
    'image': 'image',
} as const;

export const DEFAULT_TOC_ELEMENTS = TOC_ELEMENTS.heading;

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        tableOfContents: {
            /**
             * @description To set the currently tracking toc element.
             */
            setCurrentTocTrackingElement: (searchElement: keyof typeof TOC_ELEMENTS) => ReturnType,
            /**
             * @description To toggle the toc tracking.
             */
            toggleTocTracking: () => ReturnType,
            /**
             * @description To enable or disable the toc tracking.
             */
            setTocTracking: (boolean: boolean) => ReturnType,
        }
    }
}

export const TableOfContents = Extension.create({
    name: 'tableOfContents',
    addStorage() {
        return {
            isTracking: true,
            currentlyTrackingElement: DEFAULT_TOC_ELEMENTS,
            heading: [],
            table: [],
            image: [],
        }
    },
    addCommands() {
        return {
            setTocTracking: (boolean) => () => {
                this.storage.isTracking = boolean;
                return true;
            },
            toggleTocTracking: () => () => {
                this.storage.isTracking = !this.storage.isTracking;
                return true;
            },
            setCurrentTocTrackingElement: (element) => () => {
                this.storage.currentlyTrackingElement = element;
                return true;
            },
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
                        if (!this.storage.isTracking) return prev;
                        // Create a new decoration set
                        const decorations: Decoration[] = [];
                        const elements: AttributresForTOCElement[] = [];
                        const { currentlyTrackingElement } = this.storage;
                        // Traverse the document to find paragraph and heading nodes
                        state.doc.descendants((node, pos, _, index) => {
                            if (node.type.name == currentlyTrackingElement) {
                                // Add 'id' attribute as a decoration to the node
                                let id = `node-${node.type.name}-${index}`;
                                decorations.push(
                                    Decoration.node(pos, pos + node.nodeSize, { id })
                                );
                                elements.push({
                                    node,
                                    id,
                                });
                            }
                        });
                        this.storage[currentlyTrackingElement] = elements;
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

