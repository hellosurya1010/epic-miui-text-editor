import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRichTextEditorContext } from 'mui-tiptap';
import { AttributresForTOCElement, DEFAULT_TOC_ELEMENTS, TOC_ELEMENTS } from '../../../../Extensions/Extensions/TableOfContents/TableOfContents';
import { DOMSerializer } from 'prosemirror-model';


interface TabPanelProps {
    children?: React.ReactNode;
    index: string;
    value: string;
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

function a11yProps(index: keyof typeof TOC_ELEMENTS) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
        value: index,
    };
}

const HeadingAnchor = ({ heading }: { heading: AttributresForTOCElement }) => {
    const { node, id } = heading;
    const { attrs: { level } } = node;
    const styles = [1, 2, 3, 4, 5, 6].reduce((acc, level) => {
        const descLevel = Math.abs(6 - level) + 1;
        const style: React.CSSProperties = {
            fontWeight: 300 + (100 * descLevel),
            display: 'block',
            fontSize: `${10 + descLevel}px`,
            color: '#000',
            paddingLeft: `${(level - 1) * 10}px`,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        }
        acc[level] = style;
        return acc;
    }, {});
    return <a href={`/#${id}`} className='toc-active' style={styles[level ?? 1]}>{heading.node.textContent}</a>
}

const TableAnchor = ({ table }: { table: AttributresForTOCElement }) => {
    const { node, id } = table;
    const editor = useRichTextEditorContext();
    const { attrs: { level } } = node;
    const getTHContented = (): string => {
        const thContents: string[] = [];
        node.content.forEach((rowNode) => {
            // Iterate through the cells of each row
            rowNode.content.forEach((cellNode) => {
                // Check if the cell node is a header cell (<th>)
                if (cellNode.type.name === 'table_header') {
                    // Get the text content of the header cell and push it to the array
                    const headerText = cellNode.textContent;
                    thContents.push(headerText);
                }
            });
        });
        return thContents.join(' ');
    }
    console.log(getTHContented());
    return <a href={`/#${id}`} className='toc-active' style={{ border: '1px solid black', padding: '10px 20px' }}>{node.content?.content[0].textContent}</a>
}

export default function TOCTabs() {
    const [value, setValue] = React.useState<keyof typeof TOC_ELEMENTS>(DEFAULT_TOC_ELEMENTS);
    const editor = useRichTextEditorContext();
    const handleChange = (event: React.SyntheticEvent, newValue: keyof typeof TOC_ELEMENTS) => {
        editor?.commands.setCurrentTocTrackingElement(newValue);
        setValue(newValue);
    };
    const elements: AttributresForTOCElement[] = editor?.storage.tableOfContents[editor.storage.tableOfContents.currentlyTrackingElement] ?? [];

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <h4 style={{ textAlign: 'center', margin: '0' }}>Table of contents</h4>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs scrollButtons variant='scrollable' value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Headings" {...a11yProps(TOC_ELEMENTS.heading)} />
                    <Tab label="Images" {...a11yProps(TOC_ELEMENTS.image)} />
                    <Tab label="Tables" {...a11yProps(TOC_ELEMENTS.table)} />
                </Tabs>
            </Box>
            <Box overflow={'auto'} height={'500px'} >
                <CustomTabPanel value={value} index={TOC_ELEMENTS.heading}>
                    {TOC_ELEMENTS.heading == value && elements.map((heading, index) => <HeadingAnchor key={index} heading={heading} />)}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={TOC_ELEMENTS.table}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
                        {TOC_ELEMENTS.table == value && elements.map((table, index) => <TableAnchor key={index} table={table} />)}
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={TOC_ELEMENTS.image}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
                        {TOC_ELEMENTS.image == value && elements.map(element => {
                            return <a href={`/#${element.id}`}><img style={{ aspectRatio: 'auto' }} src={element.node.attrs.src} width={'80px'} /></a>;
                        })}
                    </div>
                </CustomTabPanel>
            </Box>
        </Box>
    );
}
