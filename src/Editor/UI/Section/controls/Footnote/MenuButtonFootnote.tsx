/// <reference types="@tiptap/extension-subscript" />
import { useEdtiorContext } from "../../../../Context/EditorContext";
import MenuButton, { type MenuButtonProps } from "../MenuButton";
import EditNoteIcon from '@mui/icons-material/EditNote';

export type MenuButtonFootnoteProps = Partial<MenuButtonProps>;

export default function MenuButtonFootnote(props: MenuButtonFootnoteProps) {
  const {editor} = useEdtiorContext();
  return (
    <MenuButton
      tooltipLabel="Footnote"
      // tooltipShortcutKeys={["mod", ","]}
      IconComponent={EditNoteIcon}
      // selected={editor?.isActive("footnote") ?? false}
      // disabled={!editor?.isEditable || !editor.can().toggleFootnote()}
      onClick={() => editor?.commands?.setFootnote()}
      {...props}
    />
  );
}
