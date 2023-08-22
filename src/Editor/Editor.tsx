import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Button, Grid, LinearProgress, Stack, Typography, colors } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useEditor } from "@tiptap/react";
import {
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  RichTextReadOnly,
  TableBubbleMenu,
  type RichTextEditorRef,
  RichTextEditorProvider,
  RichTextField,
  useRichTextEditorContext,
} from "mui-tiptap";
// import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";
import Navbar from "./UI/Section/Navbar";
import { Editor as EditorType } from "@tiptap/core";
import { EditorContextType, useEdtiorContext } from "./Context/EditorContext";
import './editor-styles.css'

const exampleContent =
  '<h2 class="Heading1 ExtraClass" style="text-align: center">Hey there 👋</h2><h1 style="text-align: center">Hey there 👋</h1><p>This is a <em>basic</em> example of <code>mui-tiptap</code>, which combines <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a> with customizable <a target="_blank" rel="noopener noreferrer nofollow" href="https://mui.com/">MUI (Material-UI)</a> styles, plus a suite of additional components and extensions! Sure, there are <strong>all <em>kinds</em> of <s>text</s> <u>formatting</u> options</strong> you’d probably expect from a rich text editor. But wait until you see the lists:</p><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:</p><pre><code class="language-css">body {\n  display: none;\n}</code></pre><p></p><p>That’s only the tip of the iceberg. Feel free to add and resize images:</p><img height="auto" src="http://placekitten.com/g/500" alt="wat" width="257" style="aspect-ratio: 1 / 1"><p></p><p>Organize information in tables:</p><table><tbody><tr><th colspan="1" rowspan="1"><p>Name</p></th><th colspan="1" rowspan="1"><p>Role</p></th><th colspan="1" rowspan="1"><p>Team</p></th></tr><tr><td colspan="1" rowspan="1"><p>Alice</p></td><td colspan="1" rowspan="1"><p>PM</p></td><td colspan="1" rowspan="1"><p>Internal tools</p></td></tr><tr><td colspan="1" rowspan="1"><p>Bob</p></td><td colspan="1" rowspan="1"><p>Software</p></td><td colspan="1" rowspan="1"><p>Infrastructure</p></td></tr></tbody></table><p></p><p>Or write down your groceries:</p><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Milk</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Eggs</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Sriracha</p></div></li></ul><blockquote><p>Wow, that’s amazing. Good work! 👏 <br>— Mom</p></blockquote><p>Give it a try and click around!</p>';

export default function Editor() {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });
  const rteRef = useRef<RichTextEditorRef>(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const [submittedContent, setSubmittedContent] = useState("");


  const editor = useEditor({
    extensions: extensions,
    content: exampleContent,
  });

  useEffect(() => {
    window.editor = editor;
  }, [editor]);

  const TableFlotingButtons = () => {
    return (<>
      <LinkBubbleMenu />
      <TableBubbleMenu />
    </>)
  };

  return (
    <RichTextEditorProvider editor={editor}>
      <Grid style={{ position: 'fixed', top: 0, zIndex: 1000 }} container boxShadow={'initial'} spacing={2}>
        <Grid item xs={12}>
          {/* {true && <LinearProgress style={{ height: '2px', position: 'relative' }} color="info" />} */}
          <Navbar />
        </Grid>
      </Grid>

      <Grid style={{ background: 'linear-gradient(190deg, rgba(179,206,239,1) 0%, rgba(100,144,204,1) 100%)', marginTop: '61px' }} container>
        <Grid item xs={2}></Grid>
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
            <RichTextField />
            <TableFlotingButtons />
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
        <Grid item xs={2}></Grid>
      </Grid>
    </RichTextEditorProvider>
  );
}
