/// <reference types="@tiptap/extension-bold" />
import SaveIcon from '@mui/icons-material/Save';
import { useEdtiorContext } from "../../../../Context/EditorContext";
import MenuButton from "../MenuButton";
import { MenuButtonProps } from "mui-tiptap";

export type MenuButtonBoldProps = Partial<MenuButtonProps>;

export default function FileSaveButton(props: MenuButtonBoldProps) {
  const {editor} = useEdtiorContext();
  return (
    <MenuButton
      tooltipLabel="Save"
      tooltipShortcutKeys={["mod", "S"]}
      IconComponent={SaveIcon}
      // selected={editor?.isActive("bold") ?? false}
      // disabled={!editor?.isEditable || !editor.can().toggleBold()}
      onClick={() => editor?.chain().focus().toggleBold().run()}
      {...props}
    />
  );
}
