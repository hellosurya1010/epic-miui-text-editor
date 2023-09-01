/// <reference types="@tiptap/extension-bold" />
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {
  Button,
  ClickAwayListener,
  Fade,
  Paper,
  Popper,
  Stack,
  TextField,
  type PopperProps,
} from "@mui/material";
import Typography from '@mui/material/Typography';
import { MenuButton, MenuButtonProps, useRichTextEditorContext } from "mui-tiptap";
import * as React from 'react';
// import Popper, { PopperPlacementType } from '@mui/material/Popper';

export type MenuButtonBoldProps = Partial<MenuButtonProps>;

export default function MenuButtonFindAndReplace(props: MenuButtonBoldProps) {
  const editor = useRichTextEditorContext();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [form, setFrom] = React.useState({ searchText: '', replaceText: '' });
  const TextInput = ({ label, formName, commandName }) => {
    return (
      <TextField
        style={{ margin: '10px' }}
        hiddenLabel
        id={label}
        label={label}
        value={form[formName]}
        onChange={(e) => {
          const inputElement = e.target as HTMLInputElement;
          console.log(inputElement.value);
          editor?.commands[commandName](inputElement.value);
          setFrom(pre => ({ ...pre, [formName]: inputElement.value }))
        }}
        variant="filled"
        size="small"
      />
    )
  }

  const MUIButton = ({ lable, commandName }) => (
    <Button
      size="small"
      onClick={() => {
        editor?.commands[commandName]();
      }}
    >{lable}</Button>
  )

      React.useEffect(() => {
        if(!open){
          editor?.commands.setSearchTerm('');
        }else{
          editor?.commands.setSearchTerm(form.searchText);
        }
      }, [open]);

  return (
    <>

      <MenuButton
        tooltipLabel="Find and replace"
        // tooltipShortcutKeys={["mod", "B"]}
        IconComponent={SearchIcon}
        // selected={editor?.isActive("bold") ?? false}
        disabled={!editor?.isEditable || !editor.can().toggleBold()}
        onClick={(event) => {
          setAnchorEl(event.target?.closest('button'));
          setOpen((prev) => !prev);
          console.log(anchorEl);
        }}
        {...props}
      />

      <Popper open={open} anchorEl={anchorEl} placement={'bottom'} transition>
        {({ TransitionProps }) => (
          <Fade style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} {...TransitionProps} timeout={350}>
            <Paper elevation={12}>
              {TextInput({
                label: 'Find',
                formName: 'searchText',
                commandName: 'setSearchTerm',
              })}
              {TextInput({
                label: 'Replace',
                formName: 'replaceText',
                commandName: 'setReplaceTerm',
              })}
              <MUIButton lable={'replace'} commandName={'replace'}/>
              <MUIButton lable={'Replace All'} commandName={'replaceAll'}/>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}
