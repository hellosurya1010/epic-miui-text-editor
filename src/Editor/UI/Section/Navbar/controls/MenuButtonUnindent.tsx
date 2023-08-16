import { FormatIndentDecrease } from "@mui/icons-material";
import { useEdtiorContext } from "../../../Context/EditorContext";
import MenuButton, { type MenuButtonProps } from "./MenuButton";

export type MenuButtonUnindentProps = Partial<MenuButtonProps>;

export default function MenuButtonUnindent(props: MenuButtonUnindentProps) {
  const {editor} = useEdtiorContext();
  return (
    <MenuButton
      tooltipLabel="Unindent"
      tooltipShortcutKeys={["Shift", "Tab"]}
      IconComponent={FormatIndentDecrease}
      disabled={!editor?.isEditable || !editor.can().liftListItem("listItem")}
      onClick={() => editor?.chain().focus().liftListItem("listItem").run()}
      {...props}
    />
  );
}
