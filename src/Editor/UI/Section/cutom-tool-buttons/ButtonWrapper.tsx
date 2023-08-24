import React from 'react'
import { Button, colors } from "@mui/material";
import { Editor } from '@tiptap/react';

type ButtonWrapperProps = {
    IconComponent: React.ElementType,
    disabled: boolean,
    active: string,
    // selected: string,
    title: string,
    editor: null | Editor,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonWrapper = (props: ButtonWrapperProps) => {
    const { IconComponent, active, editor, ...rest } = props;
    const selected = editor?.isActive(active) ?? false;
    console.log(selected);
    return (
        <Button
            style={{ color: colors.grey[`${selected ? "900" : "600"}`], minWidth: '10px' }}
            size="small"
            variant="text"
            {...rest}
        >
            <IconComponent fontSize={'small'} />
        </Button>
    )
}

export default ButtonWrapper