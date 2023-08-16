/// <reference types="@tiptap/extension-history" />
import RedoIcon from "@mui/icons-material/Redo";
import { useEdtiorContext } from "../../../Context/EditorContext";
import MenuButton, { type MenuButtonProps } from "./MenuButton";

export type MenuButtonRedoProps = Partial<MenuButtonProps>;

export default function MenuButtonRedo(props: MenuButtonRedoProps) {
  const {editor} = useEdtiorContext();
  return (
    <MenuButton
      tooltipLabel="Redo"
      tooltipShortcutKeys={["mod", "Shift", "Z"]}
      IconComponent={RedoIcon}
      disabled={!editor?.isEditable || !editor.can().redo()}
      onClick={() => editor?.chain().focus().redo().run()}
      {...props}
    />
  );
}
