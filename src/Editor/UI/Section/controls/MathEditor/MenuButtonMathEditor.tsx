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
import { MathNodeName } from '../../../../Extensions/Nodes/MathNode/MathNode';
import { ResizableImageOptions } from 'mui-tiptap/dist/extensions/ResizableImage';

export type MathEditorButtonProps = Partial<MenuButtonProps>;


export default function MenuButtonMathEditor(props: MathEditorButtonProps) {
  const [open, setOpen] = React.useState(false);
  const editor = useRichTextEditorContext();
  const mathEditorRef = React.useRef<HTMLIFrameElement | null>(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {

    const iframe = mathEditorRef.current;

    const handleIframeLoad = () => {
      console.log('hello');
      if (editor) {
        const node = editor.state.selection.node;
        console.log(node);
        if (node && node.type.name == MathNodeName) {
          const selectedEquation = node.attrs.mathml.replaceAll('»', '>').replaceAll('«', '<');
          const iframeDocument = mathEditorRef.current?.contentDocument || mathEditorRef.current?.contentWindow?.document;
          console.log(selectedEquation, iframeDocument);
          if (iframeDocument == null) {
            // iframeDocument.querySelector('#editor-content').innerHTML = selectedEquation;
          }
          // const elementInIframe = iframeDocument.querySelector('.output');
          // const convertButton: HTMLButtonElement | null = iframeDocument.querySelector('#convertButton');
          // await convertButton?.click();
          // let imageEl: HTMLImageElement | null = iframeDocument.querySelector('#MathImage');
          // if (!imageEl?.src) return;
          // let mathMlSrc: string | null = iframeDocument.querySelector('#editor-content')?.innerHTML.replaceAll('>', '»').replaceAll('<', '«');
        }
      }
    };

    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);

      return () => {
        iframe.removeEventListener('load', handleIframeLoad);
      };
    }
  }, [mathEditorRef.current]);
  console.log();


  const editorUrl = `${window.location.origin}/public/math_html/`

  const handleClose = () => {
    setOpen(false);
  };

  const handleMathInsert = async () => {
    console.log(mathEditorRef.current);
    const iframeDocument = mathEditorRef.current?.contentDocument || mathEditorRef.current?.contentWindow?.document;
    if (iframeDocument == null) return;
    const elementInIframe = iframeDocument.querySelector('.output');
    const convertButton: HTMLButtonElement | null = iframeDocument.querySelector('#convertButton');
    await convertButton?.click();
    let imageEl: HTMLImageElement | null = iframeDocument.querySelector('#MathImage');
    if (!imageEl?.src) return;
    let mathMlSrc: string | null = iframeDocument.querySelector('#editor-content')?.innerHTML.replaceAll('>', '»').replaceAll('<', '«');
    editor?.commands.insertContent({
      type: 'image', attrs: {
        src: imageEl.src,
        mathml: mathMlSrc,
      }
    });
    // editor?.chain().focus().setImage({ src: imageEl?.src }).run();
    imageEl.src = "";
    console.log(imageEl?.src);
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
