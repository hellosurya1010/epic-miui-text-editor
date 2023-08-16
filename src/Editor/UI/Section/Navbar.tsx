import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { MenuButtonBlockquote, MenuButtonBold, MenuButtonBulletedList, MenuButtonEditLink, MenuButtonIndent, MenuButtonItalic, MenuButtonOrderedList, MenuButtonStrikethrough, MenuButtonSubscript, MenuButtonSuperscript, MenuButtonTaskList, MenuButtonUnderline, MenuButtonUnindent, MenuDivider, MenuSelectFontFamily, MenuSelectFontSize, MenuSelectHeading, MenuSelectTextAlign, isTouchDevice, useRichTextEditorContext } from 'mui-tiptap';
import { Editor } from '@tiptap/react';
import { MenuButtonAddImage, MenuButtonAddTable, MenuButtonBlockquote, MenuButtonBold, MenuButtonBulletedList, MenuButtonCode, MenuButtonCodeBlock, MenuButtonEditLink, MenuButtonHorizontalRule, MenuButtonIndent, MenuButtonItalic, MenuButtonOrderedList, MenuButtonRedo, MenuButtonRemoveFormatting, MenuButtonStrikethrough, MenuButtonSubscript, MenuButtonSuperscript, MenuButtonTaskList, MenuButtonUnderline, MenuButtonUndo, MenuButtonUnindent, MenuSelectFontFamily, MenuSelectFontSize, MenuSelectHeading, MenuSelectTextAlign } from './controls';
import { MenuDivider, isTouchDevice } from 'mui-tiptap';
import { MenuButtonAcceptAllChanges, MenuButtonAcceptChanges, MenuButtonRejectAllChanges, MenuButtonRejectChanges, MenuButtonTrackChangesToggler } from './controls/TrackChanges/MenuButtonTrackChanges';
import MenuButtonFootnote from './controls/Footnote/MenuButtonFootnote';
import MenuButtonMathEditor from './controls/MathEditor/MenuButtonMathEditor';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const HomeTabMenus = () => {
  return (
    <>
      <MenuSelectFontFamily
        options={[
          { label: "Comic Sans", value: "Comic Sans MS, Comic Sans" },
          { label: "Cursive", value: "cursive" },
          { label: "Monospace", value: "monospace" },
          { label: "Serif", value: "serif" },
          { label: "Roboto", value: "" },
        ]}
        // Display our default font "Roboto" as the rendered label when no font
        // is currently set
        emptyLabel="Roboto"
        // We provide a custom "Roboto" option above where the value is "" and
        // will unset the font-family (and we place that alphabetically amongst
        // the options), so we don't need a separate "Default" unsetting option
        // shown
        hideUnsetOption
      />
      <MenuDivider />
      <MenuSelectHeading />
      <MenuDivider />
      <MenuSelectFontSize />
      <MenuDivider />
      <MenuButtonBold />
      <MenuButtonItalic />
      <MenuButtonUnderline />
      <MenuButtonStrikethrough />
      <MenuButtonSubscript />
      <MenuButtonSuperscript />
      <MenuDivider />
      <MenuButtonEditLink />
      <MenuDivider />
      <MenuSelectTextAlign />
      <MenuDivider />
      <MenuButtonOrderedList />
      <MenuButtonBulletedList />
      <MenuButtonTaskList />
      {/* On touch devices, we'll show indent/unindent buttons, since they're
      unlikely to have a keyboard that will allow for using Tab/Shift+Tab. These
      buttons probably aren't necessary for keyboard users and would add extra
      clutter. */}
      {isTouchDevice() && (
        <>
          <MenuButtonIndent />
          <MenuButtonUnindent />
        </>
      )}
      <MenuDivider />
      <MenuButtonBlockquote />
      <MenuDivider />
    </>
  )
}

const InsertTabMenus = () => {
  return (
    <>
      <MenuButtonCode />

      <MenuButtonCodeBlock />

      <MenuDivider />
      <MenuButtonAddImage
        onClick={() => {
          const url = window.prompt("Image URL");

          if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
          }
        }}
      />

      <MenuDivider />

      <MenuButtonHorizontalRule />

      <MenuButtonAddTable />

      <MenuDivider />

      <MenuButtonRemoveFormatting />

      <MenuDivider />

      <MenuButtonUndo />
      <MenuButtonRedo />


      <MenuDivider />

      <MenuButtonTrackChangesToggler />
      <MenuButtonAcceptChanges
       />
      <MenuButtonRejectChanges />
      <MenuButtonAcceptAllChanges />
      <MenuButtonRejectAllChanges />

      <MenuDivider />

      <MenuButtonFootnote />
      <MenuButtonMathEditor />
    </>
  )
}

export default function Navbar() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const edtior = useRichTextEditorContext();
  // console.log(edtior);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab style={{ padding: '5px' }} label="Home" {...a11yProps(0)} />
          <Tab style={{ padding: '5px' }} label="Insert" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <HomeTabMenus />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <InsertTabMenus />
      </CustomTabPanel>
    </Box>
  );
}