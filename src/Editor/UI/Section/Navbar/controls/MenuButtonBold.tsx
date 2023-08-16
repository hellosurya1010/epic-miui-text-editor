/// <reference types="@tiptap/extension-bold" />
import { FormatBold } from "@mui/icons-material";
import { useEdtiorContext } from "../../../Context/EditorContext";
import MenuButton, { type MenuButtonProps } from "./MenuButton";

export type MenuButtonBoldProps = Partial<MenuButtonProps>;

export default function MenuButtonBold(props: MenuButtonBoldProps) {
  const {editor} = useEdtiorContext();
  return (
    <MenuButton
      tooltipLabel="Bold"
      tooltipShortcutKeys={["mod", "B"]}
      IconComponent={FormatBold}
      selected={editor?.isActive("bold") ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleBold()}
      onClick={() => editor?.chain().focus().toggleBold().run()}
      {...props}
    />
  );
}
