/// <reference types="@tiptap/extension-text-align" />
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import { useEdtiorContext } from "../../../Context/EditorContext";
import MenuButton, { type MenuButtonProps } from "./MenuButton";

export type MenuButtonAlignLeftProps = Partial<MenuButtonProps>;

export default function MenuButtonAlignLeft(props: MenuButtonAlignLeftProps) {
  const {editor} = useEdtiorContext();
  return (
    <MenuButton
      tooltipLabel="Left align"
      tooltipShortcutKeys={["mod", "Shift", "L"]}
      IconComponent={FormatAlignLeftIcon}
      selected={editor?.isActive({ textAlign: "left" }) ?? false}
      disabled={!editor?.isEditable || !editor.can().setTextAlign("left")}
      onClick={() => editor?.chain().focus().setTextAlign("left").run()}
      {...props}
    />
  );
}
