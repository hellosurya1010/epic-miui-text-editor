import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import React from 'react'

export default function (props: NodeViewProps) {
    const increase = () => {
        props.updateAttributes({
            count: props.node.attrs.count + 1,
        })
    }

    const [show, setShow] = React.useState<boolean>(false);

    return (
        <NodeViewWrapper className="react-component">
            {show && <span className="label">React Component</span>}

            <div className="content">
                <button
                    onMouseEnter={() => {
                        setShow(true);
                    }}
                    onMouseLeave={() => {
                        setShow(false);
                    }}
                    onClick={increase}>
                    This button has been clicked {props.node.attrs.count} times.
                </button>
            </div>
        </NodeViewWrapper>
    )
}