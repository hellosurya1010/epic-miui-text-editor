import { FormatIndentIncrease } from "@mui/icons-material";
import { useRichTextEditorContext } from 'mui-tiptap';
import MenuButton, { type MenuButtonProps } from "./MenuButton";

export type MenuButtonIndentProps = Partial<MenuButtonProps>;

export default function MenuButtonIndent(props: MenuButtonIndentProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      tooltipLabel="Indent"
      tooltipShortcutKeys={["Tab"]}
      IconComponent={FormatIndentIncrease}
      disabled={!editor?.isEditable || !editor.can().sinkListItem("listItem")}
      onClick={() => editor?.chain().focus().sinkListItem("listItem").run()}
      {...props}
    />
  );
}
