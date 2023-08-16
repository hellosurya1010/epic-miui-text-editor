/// <reference types="@tiptap/extension-text-align" />
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { useEdtiorContext } from "../../../Context/EditorContext";
import MenuButton, { type MenuButtonProps } from "./MenuButton";

export type MenuButtonAlignCenterProps = Partial<MenuButtonProps>;

export default function MenuButtonAlignCenter(
  props: MenuButtonAlignCenterProps
) {
  const {editor} = useEdtiorContext();
  return (
    <MenuButton
      tooltipLabel="Center align"
      tooltipShortcutKeys={["mod", "Shift", "E"]}
      IconComponent={FormatAlignCenterIcon}
      selected={editor?.isActive({ textAlign: "center" }) ?? false}
      disabled={!editor?.isEditable || !editor.can().setTextAlign("center")}
      onClick={() => editor?.chain().focus().setTextAlign("center").run()}
      {...props}
    />
  );
}
