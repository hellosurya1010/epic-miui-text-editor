/// <reference types="@tiptap/extension-bold" />
import SaveIcon from '@mui/icons-material/Save';
import { useRichTextEditorContext } from 'mui-tiptap';
import MenuButton from "../MenuButton";
import { MenuButtonProps } from "mui-tiptap";
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { CheckCircleOutline } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import { green, grey } from '@mui/material/colors';
import { useState } from 'react';

export type MenuButtonBoldProps = Partial<MenuButtonProps>;

export default function FileSaveButton(props: MenuButtonBoldProps) {
  const editor = useRichTextEditorContext();
  const fileSave = useSelector(state => state.fileSave);

  return (
    <MenuButton
      tooltipLabel="Save"
      tooltipShortcutKeys={["mod", "S"]}
      IconComponent={(props) => {
        return (
          !fileSave.isSaving ?
          <SaveIcon {...props} /> :  <CircularProgress style={{color: grey['800']}} size={18} />
        )
      }}
      disabled={fileSave.isSaving}
      // selected={editor?.isActive("bold") ?? false}
      // disabled={!editor?.isEditable || !editor.can().toggleBold()}
      onClick={() => {
        console.log('hello surya');
        editor?.commands.saveFile();
      }}
      {...props}
    />
  );
}
