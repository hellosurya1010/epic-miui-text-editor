import DownloadIcon from '@mui/icons-material/Download';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRichTextEditorContext } from 'mui-tiptap';

export const HtmlToDocxFileDownloadButton = () => {

    const editor = useRichTextEditorContext();
    
    return (
        <ListItem key={"Download file"} disablePadding>
            <ListItemButton
            onClick={() => {
                editor?.commands.downloadAsDocx();
            }}
            >
                <ListItemIcon>
                    <DownloadIcon />
                </ListItemIcon>
                <ListItemText primary={"Download file"} />
            </ListItemButton>
        </ListItem>
    )
}
