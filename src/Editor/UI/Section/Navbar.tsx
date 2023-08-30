import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { MenuButtonAddImage, MenuButtonAddTable, MenuButtonBlockquote, MenuButtonBold, MenuButtonBulletedList, MenuButtonCode, MenuButtonCodeBlock, MenuButtonEditLink, MenuButtonHorizontalRule, MenuButtonIndent, MenuButtonItalic, MenuButtonOrderedList, MenuButtonRedo, MenuButtonRemoveFormatting, MenuButtonStrikethrough, MenuButtonSubscript, MenuButtonSuperscript, MenuButtonTaskList, MenuButtonUnderline, MenuButtonUndo, MenuButtonUnindent, MenuControlsContainer, MenuSelectFontFamily, MenuSelectHeading, MenuSelectTextAlign } from './controls';
import { LinkBubbleMenu, MenuButtonAddImage, MenuButtonAddTable, MenuButtonBlockquote, MenuButtonBold, MenuButtonBulletedList, MenuButtonCode, MenuButtonCodeBlock, MenuButtonEditLink, MenuButtonHighlightColor, MenuButtonHorizontalRule, MenuButtonIndent, MenuButtonItalic, MenuButtonOrderedList, MenuButtonRedo, MenuButtonRemoveFormatting, MenuButtonStrikethrough, MenuButtonSubscript, MenuButtonSuperscript, MenuButtonTaskList, MenuButtonTextColor, MenuButtonUnderline, MenuButtonUndo, MenuButtonUnindent, MenuControlsContainer, MenuSelectFontFamily, MenuSelectHeading, MenuSelectTextAlign, TableBubbleMenu } from 'mui-tiptap';
import { MenuDivider, isTouchDevice, useRichTextEditorContext } from 'mui-tiptap';
import { MenuButtonAcceptAllChanges, MenuButtonAcceptChanges, MenuButtonRejectAllChanges, MenuButtonRejectChanges, MenuButtonTrackChangesToggler } from './controls/TrackChanges/MenuButtonTrackChanges';
import MenuButtonFootnote from './controls/Footnote/MenuButtonFootnote';
import MenuButtonMathEditor from './controls/MathEditor/MenuButtonMathEditor';
import { Button, Paper, Theme, colors } from '@mui/material';
import FileSaveButton from './controls/FileSaveButton/FileSaveButton';
import { useTheme } from '@emotion/react';


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
        <Box>
          <Typography style={{ display: 'flex', alignItems: 'center' }}>{children}</Typography>
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

const HomeTabMenus = ({theme}: {theme: Theme}) => {
  return (
    <>
      <MenuButtonUndo />
      <MenuButtonRedo />
      <MenuDivider />
      <FileSaveButton />
      <MenuDivider />
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
      {/* <MenuSelectFontSize />
      <MenuDivider /> */}
      <MenuButtonBold />
      <MenuButtonItalic />
      <MenuButtonUnderline />
      <MenuButtonStrikethrough />
      <MenuButtonSubscript />
      <MenuButtonSuperscript />
      <MenuDivider />
      <MenuButtonEditLink />
      <LinkBubbleMenu />
      <MenuDivider />
      <MenuSelectTextAlign />
      <MenuDivider />
      <MenuButtonOrderedList />
      <MenuButtonBulletedList />
      <MenuButtonTaskList />


      <MenuButtonTextColor
        defaultTextColor={theme.palette.text.primary}
        swatchColors={[
          { value: "#000000", label: "Black" },
          { value: "#ffffff", label: "White" },
          { value: "#888888", label: "Grey" },
          { value: "#ff0000", label: "Red" },
          { value: "#ff9900", label: "Orange" },
          { value: "#ffff00", label: "Yellow" },
          { value: "#00d000", label: "Green" },
          { value: "#0000ff", label: "Blue" },
        ]}
      />

      <MenuButtonHighlightColor
        swatchColors={[
          { value: "#595959", label: "Dark grey" },
          { value: "#dddddd", label: "Light grey" },
          { value: "#ffa6a6", label: "Light red" },
          { value: "#ffd699", label: "Light orange" },
          // Plain yellow matches the browser default `mark` like when using Cmd+Shift+H
          { value: "#ffff00", label: "Yellow" },
          { value: "#99cc99", label: "Light green" },
          { value: "#90c6ff", label: "Light blue" },
          { value: "#8085e9", label: "Light purple" },
        ]}
      />


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
  const editor = useRichTextEditorContext();
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
      <TableBubbleMenu />

      <MenuDivider />
      <MenuButtonRemoveFormatting />
      <MenuDivider />
      <MenuDivider />
      <MenuButtonTrackChangesToggler />
      <MenuButtonAcceptChanges />
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
  const [value, setValue] = React.useState(1);
  const editor = useRichTextEditorContext();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const theme = useTheme();


  const TabButton = (props: { label: string, index: number }) => {
    const style = {
      textTransform: 'none',
      borderRadius: '0',
      borderBottom: `2px solid ${props.index == value ? colors.blue['400'] : 'transparent'}`
    };
    return (<Button
      style={style}
      onClick={() => setValue(props.index)}
      size="small"
    >
      {props.label}
    </Button>)
  }

  return (
    <>
      <Paper elevation={4} sx={{ width: '100%' }} style={{ background: 'linear-gradient(184deg, rgba(223,239,250,1) 0%, rgba(142,177,223,1) 100%)', color: '#fff !important', padding: '0 15px', position: 'fixed', top: 0, left: 0 }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <TabButton index={1} label='Home' />
          <TabButton index={2} label='Insert' />
        </div>
        <MenuControlsContainer>
          {value == 1 && <HomeTabMenus theme={theme} />}
          {value == 2 && <InsertTabMenus />}
        </MenuControlsContainer>
      </Paper>
    </>
  );
}


// export default function Navbar() {
//   const [value, setValue] = React.useState(0);
//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   // const edtior = useRichTextEditorContext();
//   // console.log(edtior);

//   return (
//     <Box sx={{ width: '100%'}}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//           <Tab style={{ maxHeight: 10, padding: 0 }}  label="Home" {...a11yProps(0)} />
//           <Tab style={{ maxHeight: 10, padding: 0 }}  label="Insert" {...a11yProps(1)} />
//         </Tabs>
//       <CustomTabPanel value={value} index={0}>
//         <HomeTabMenus />
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         <InsertTabMenus />
//       </CustomTabPanel>
//       </Box>
//     </Box>
//   );
// }