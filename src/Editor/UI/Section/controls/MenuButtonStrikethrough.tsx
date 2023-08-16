/// <reference types="@tiptap/extension-strike" />
import { StrikethroughS } from "@mui/icons-material";
import { useEdtiorContext } from "../../../Context/EditorContext";
import MenuButton, { type MenuButtonProps } from "./MenuButton";

export type MenuButtonStrikethroughProps = Partial<MenuButtonProps>;

export default function MenuButtonStrikethrough(
  props: MenuButtonStrikethroughProps
) {
  const {editor} = useEdtiorContext();
  return (
    <MenuButton
      tooltipLabel="Strikethrough"
      tooltipShortcutKeys={["mod", "Shift", "X"]}
      IconComponent={StrikethroughS}
      selected={editor?.isActive("strike") ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleStrike()}
      onClick={() => editor?.chain().focus().toggleStrike().run()}
      {...props}
    />
  );
}
