import { BiTable } from "react-icons/bi";
import { MenuButtonBold, useRichTextEditorContext } from 'mui-tiptap';
import MenuButton, { type MenuButtonProps } from "./MenuButton";

export type MenuButtonAddTableProps = Partial<MenuButtonProps>;

export default function MenuButtonAddTable(props: MenuButtonAddTableProps) {
  const editor = useRichTextEditorContext();
  // <MenuButtonBold/>
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
