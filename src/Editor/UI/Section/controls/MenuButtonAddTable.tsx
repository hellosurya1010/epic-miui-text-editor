import { BiTable } from "react-icons/bi";
import { useEdtiorContext } from "../../../Context/EditorContext";
import MenuButton, { type MenuButtonProps } from "./MenuButton";

export type MenuButtonAddTableProps = Partial<MenuButtonProps>;

export default function MenuButtonAddTable(props: MenuButtonAddTableProps) {
  const {editor} = useEdtiorContext();
  return (
    <MenuButton
      tooltipLabel="Insert table"
      IconComponent={BiTable}
      disabled={!editor?.isEditable || !editor.can().insertTable()}
      onClick={() =>
        editor
          ?.chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run()
      }
      {...props}
    />
  );
}
