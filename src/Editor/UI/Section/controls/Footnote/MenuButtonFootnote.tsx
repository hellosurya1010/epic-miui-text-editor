/// <reference types="@tiptap/extension-subscript" />
import { useRichTextEditorContext } from 'mui-tiptap';
import MenuButton, { type MenuButtonProps } from "../MenuButton";
import EditNoteIcon from '@mui/icons-material/EditNote';

export type MenuButtonFootnoteProps = Partial<MenuButtonProps>;

export default function MenuButtonFootnote(props: MenuButtonFootnoteProps) {
  const editor = useRichTextEditorContext();
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
