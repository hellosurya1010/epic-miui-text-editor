import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Typography, colors } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  RichTextReadOnly,
  TableBubbleMenu,
  type RichTextEditorRef,
} from "mui-tiptap";
// import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";
import Navbar from "./UI/Section/Navbar";
import { Editor as EditorType } from "@tiptap/core";
import { EditorContextType, useEdtiorContext } from "./Context/EditorContext";

const exampleContent =
  '<h2 style="text-align: center">Hey there 👋</h2><p>This is a <em>basic</em> example of <code>mui-tiptap</code>, which combines <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a> with customizable <a target="_blank" rel="noopener noreferrer nofollow" href="https://mui.com/">MUI (Material-UI)</a> styles, plus a suite of additional components and extensions! Sure, there are <strong>all <em>kinds</em> of <s>text</s> <u>formatting</u> options</strong> you’d probably expect from a rich text editor. But wait until you see the lists:</p><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:</p><pre><code class="language-css">body {\n  display: none;\n}</code></pre><p></p><p>That’s only the tip of the iceberg. Feel free to add and resize images:</p><img height="auto" src="http://placekitten.com/g/500" alt="wat" width="257" style="aspect-ratio: 1 / 1"><p></p><p>Organize information in tables:</p><table><tbody><tr><th colspan="1" rowspan="1"><p>Name</p></th><th colspan="1" rowspan="1"><p>Role</p></th><th colspan="1" rowspan="1"><p>Team</p></th></tr><tr><td colspan="1" rowspan="1"><p>Alice</p></td><td colspan="1" rowspan="1"><p>PM</p></td><td colspan="1" rowspan="1"><p>Internal tools</p></td></tr><tr><td colspan="1" rowspan="1"><p>Bob</p></td><td colspan="1" rowspan="1"><p>Software</p></td><td colspan="1" rowspan="1"><p>Infrastructure</p></td></tr></tbody></table><p></p><p>Or write down your groceries:</p><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Milk</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Eggs</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Sriracha</p></div></li></ul><blockquote><p>Wow, that’s amazing. Good work! 👏 <br>— Mom</p></blockquote><p>Give it a try and click around!</p>';

export default function Editor() {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });
  const rteRef = useRef<RichTextEditorRef>(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const [submittedContent, setSubmittedContent] = useState("");

  const { editor, setEditor } = useEdtiorContext();
  console.log(editor);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
      </Grid>

      {/* <Grid container spacing={2}>
        <Grid bgcolor={colors.grey['400']} item xs={8}>
        </Grid>
        <Grid bgcolor={colors.grey['500']} item xs={4}>
        </Grid>
        <Grid bgcolor={colors.grey['600']} item xs={4}>
        </Grid>
        <Grid bgcolor={colors.grey['700']} item xs={8}>
        </Grid>
      </Grid> */}

      <Grid container>
        <Grid zIndex={'-30'} item bgcolor={colors.grey['400']} xs={2}>
        </Grid>
        <Grid item bgcolor={colors.grey['200']} xs={8}>
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
            <RichTextEditor
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
            </RichTextEditor>
          </Box>
        </Grid>
        <Grid item bgcolor={colors.grey['400']} xs={2}>
        </Grid>
      </Grid>
    </>
  );
}
