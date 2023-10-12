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
import { getCssString } from "./Extensions/Extensions/FileSave/FileSave";
// import { content } from "./content";



export default function Editor({ content }: { content: string }) {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });
  const { html, css } =  getCssString(content);
  const rteRef = useRef<RichTextEditorRef>(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const [submittedContent, setSubmittedContent] = useState("");
  

  const editor = useEditor({
    extensions: extensions,
    content: html,
    onCreate: (props) => {
      props.editor.commands.setCssStyle({ styles: css });
      props.editor.commands.setParaStyleClassNames({ classNames: css });
    }
  });

  useEffect(() => {
    // window.editor = editor;
  }, [editor]);

  return (
    <RichTextEditorProvider editor={editor}>
      <Grid style={{ position: 'fixed', top: 0, zIndex: 1000 }} container boxShadow={'initial'} spacing={2}>
        <Grid item xs={12}>
        </Grid>
      </Grid>

      <Grid id="main" style={{ background: 'linear-gradient(190deg, rgba(179,206,239,1) 0%, rgba(100,144,204,1) 100%)', marginTop: '61px' }} container>
        <Grid item xs={2}>
          <LeftSidebar />
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
            <style>
              {editor?.storage.heading.cssStyles}
            </style>
            <RichTextField
              controls={<Navbar />}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <RightSidebar />
        </Grid>
      </Grid>
    </RichTextEditorProvider>
  );
}
