import { FormatBold } from "@mui/icons-material";
import { MenuButton, useRichTextEditorContext } from 'mui-tiptap';
import { MenuButtonProps } from "../../../UI/Section/controls";

export type MenuButtonBoldProps = Partial<MenuButtonProps>;

export default function AddCommentsButton(props: MenuButtonBoldProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      tooltipLabel="Comment"
      IconComponent={FormatBold}
      // selected={editor?.isActive("bold") ?? false}

      onClick={() => {
        if(editor){
          // editor.state.
          editor.chain().focus().addComment({comment: "dfas"})
        }
      }}
      {...props}
    />
  );
}
