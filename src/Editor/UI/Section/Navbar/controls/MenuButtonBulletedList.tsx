/// <reference types="@tiptap/extension-bullet-list" />
import { FormatListBulleted } from "@mui/icons-material";
import { useEdtiorContext } from "../../../Context/EditorContext";
import MenuButton, { type MenuButtonProps } from "./MenuButton";

export type MenuButtonBulletedListProps = Partial<MenuButtonProps>;

export default function MenuButtonBulletedList(
  props: MenuButtonBulletedListProps
) {
  const {editor} = useEdtiorContext();
  return (
    <MenuButton
      tooltipLabel="Bulleted list"
      tooltipShortcutKeys={["mod", "Shift", "8"]}
      IconComponent={FormatListBulleted}
      selected={editor?.isActive("bulletList") ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleBulletList()}
      onClick={() => editor?.chain().focus().toggleBulletList().run()}
      {...props}
    />
  );
}
