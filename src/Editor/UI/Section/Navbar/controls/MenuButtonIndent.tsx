import { FormatIndentIncrease } from "@mui/icons-material";
import { useEdtiorContext } from "../../../Context/EditorContext";
import MenuButton, { type MenuButtonProps } from "./MenuButton";

export type MenuButtonIndentProps = Partial<MenuButtonProps>;

export default function MenuButtonIndent(props: MenuButtonIndentProps) {
  const {editor} = useEdtiorContext();
  return (
    <MenuButton
      tooltipLabel="Indent"
      tooltipShortcutKeys={["Tab"]}
      IconComponent={FormatIndentIncrease}
      disabled={!editor?.isEditable || !editor.can().sinkListItem("listItem")}
      onClick={() => editor?.chain().focus().sinkListItem("listItem").run()}
      {...props}
    />
  );
}
