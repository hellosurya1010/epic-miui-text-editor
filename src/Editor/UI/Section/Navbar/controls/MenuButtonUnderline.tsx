/// <reference types="@tiptap/extension-underline" />
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { useEdtiorContext } from "../../../Context/EditorContext";
import MenuButton, { type MenuButtonProps } from "./MenuButton";

export type MenuButtonUnderlineProps = Partial<MenuButtonProps>;

export default function MenuButtonUnderline(props: MenuButtonUnderlineProps) {
  const {editor} = useEdtiorContext();
  return (
    <MenuButton
      tooltipLabel="Underline"
      tooltipShortcutKeys={["mod", "U"]}
      IconComponent={FormatUnderlinedIcon}
      selected={editor?.isActive("underline") ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleUnderline()}
      onClick={() => editor?.chain().focus().toggleUnderline().run()}
      {...props}
    />
  );
}
