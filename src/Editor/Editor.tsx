import { FormatBold, Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Button, Grid, LinearProgress, Stack, Typography, colors } from "@mui/material";
import { useEditor } from "@tiptap/react";
import {
  LinkBubbleMenu,
  RichTextEditorProvider,
  RichTextField,
  TableBubbleMenu,
  type RichTextEditorRef,
} from "mui-tiptap";
import { useEffect, useMemo, useRef, useState } from "react";
// import EditorMenuControls from "./EditorMenuControls";
import { Editor as EditorType } from "@tiptap/core";
import Navbar from "./UI/Section/Navbar";
import './editor-styles.css';
import useExtensions from "./useExtensions";
import { LeftSidebar } from "./UI/Section/LeftSidebar";
import { RightSidebar } from "./UI/Section/RightSidebar";
// import { content } from "./content";



export default function Editor({ content }: { content: string }) {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });
  const rteRef = useRef<RichTextEditorRef>(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const [submittedContent, setSubmittedContent] = useState("");


  const editor = useEditor({
    extensions: extensions,
    content: content,
  });

  useEffect(() => {
    window.editor = editor;
  }, [editor]);

  // const TableFlotingButtons = () => {
  //   return (<>
  //     <LinkBubbleMenu />
  //     <TableBubbleMenu />
  //   </>)
  // };

  return (
    <RichTextEditorProvider editor={editor}>
      <Grid style={{ position: 'fixed', top: 0, zIndex: 1000 }} container boxShadow={'initial'} spacing={2}>
        <Grid item xs={12}>
        </Grid>
      </Grid>

      <Grid id="main" style={{ background: 'linear-gradient(190deg, rgba(179,206,239,1) 0%, rgba(100,144,204,1) 100%)', marginTop: '61px' }} container>
        <Grid item xs={2}>
          <LeftSidebar/>
        </Grid>
        <Grid item marginTop={'10px'} xs={8} >
          <Box
            bgcolor={colors.grey['A100']}
            sx={{
              // An example of how editor styles can be overridden. In this case,
              // setting where the scroll anchors to when jumping to headings. The
              // scroll margin isn't built in since it will likely vary depending on
              // where the editor itself is rendered (e.g. if there's a sticky nav
              // bar on your site).
              "& .ProseMirror": {
                "& h1, & h2, & h3, & h4, & h5, & h6": {
                  scrollMarginTop: showMenuBar ? 50 : 0,
                },
              },
              maxWidth: 1200,
              margin: "0 auto",
            }}
          >
            <RichTextField
              controls={<Navbar />}
            />
            {/* <TableFlotingButtons /> */}
            {/* <RichTextEditor
              ref={rteRef}
              extensions={extensions}
              content={exampleContent}
              editable={isEditable}
              // renderControls={() => <EditorMenuControls />}
              onCreate={(props) => {
                window.editor = props.editor;
                setEditor(props.editor);
                // dispatch(initEditor({ editor: props.editor }));
              }}
              RichTextFieldProps={{
                MenuBarProps: {
                  hide: !showMenuBar,
                },
                // Below is an example of adding a toggle within the outlined field
                // for showing/hiding the editor menu bar, and a "submit" button for
                // saving/viewing the HTML content
              }}
            >
              {() => (
                <>
                  <LinkBubbleMenu />
                  <TableBubbleMenu />
                </>
              )}
            </RichTextEditor> */}
          </Box>
        </Grid>
        <Grid item xs={2}>
          <RightSidebar/>
        </Grid>
      </Grid>
      {/* <Grid>
        <Grid item xs={12} style={{position: 'fixed', bottom: 0, backgroundColor: colors.blue['400'], width: '100%'}}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, recusandae. Minus, nostrum a veritatis tempore 
        </Grid>
      </Grid> */}
    </RichTextEditorProvider>
  );
}
