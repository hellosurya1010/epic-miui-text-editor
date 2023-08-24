import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuButton, { MenuButtonProps } from '../MenuButton';
import { useRichTextEditorContext } from 'mui-tiptap';
import FunctionsIcon from '@mui/icons-material/Functions';

export type MathEditorButtonProps = Partial<MenuButtonProps>;


export default function MenuButtonMathEditor(props: MathEditorButtonProps) {
  const [open, setOpen] = React.useState(false);
  const editor = useRichTextEditorContext();
  const mathEditorRef = React.useRef<HTMLIFrameElement | null>(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const editorUrl = `${window.location.origin}/public/math_html/`

  const handleClose = () => {
    setOpen(false);
  };

  const handleMathInsert = async () => {
    console.log(mathEditorRef.current);
    const iframeDocument = mathEditorRef.current?.contentDocument || mathEditorRef.current?.contentWindow?.document;
    if(iframeDocument == null)return;
    const elementInIframe = iframeDocument.querySelector('.output');
    const convertButton: HTMLButtonElement | null = iframeDocument.querySelector('#convertButton');
    await convertButton?.click();
    let imageEl: HTMLImageElement | null = iframeDocument.querySelector('#MathImage');
    // let mathMlSrc: string | null = iframeDocument.querySelector('#editor-content')?.innerHTML.replaceAll('>', '»').replaceAll('<', '«');
    if(imageEl == null) return;
    editor?.chain().focus().setImage({ src: imageEl?.src }).run();
    setOpen(false);
  }

  return (
    <>
      <MenuButton
        tooltipLabel="MathML"
        // tooltipShortcutKeys={["mod", ","]}
        IconComponent={FunctionsIcon}
        onClick={handleClickOpen}
        {...props}
      />
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'md'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          MathML Editor
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <iframe
              ref={mathEditorRef}
              src={editorUrl}
              title="Example Website"
              height={300}
              width={800}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleMathInsert} autoFocus>Insert</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
