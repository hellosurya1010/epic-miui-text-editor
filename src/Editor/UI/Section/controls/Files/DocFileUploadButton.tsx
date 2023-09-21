import InboxIcon from '@mui/icons-material/MoveToInbox';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import axios from "axios";
import { useRichTextEditorContext } from "mui-tiptap";
import * as laravel from '../../../../../../utils/laravel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export function DocFileUploadButton() {
    const editor = useRichTextEditorContext();
    // const [style, setStyle] = React.useState('');
    return (
        <>
            <label htmlFor='docFileUpload'>
                <ListItem key={"Open file"} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <CloudUploadIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Open file"} />
                    </ListItemButton>
                </ListItem>
            </label>
            <input
                style={{ display: 'none' }}
                type="file"
                id='docFileUpload'
                accept='.docx'
                onChange={(e) => {
                    const { files } = e.target;
                    if (files?.length) {
                        editor?.commands.docFileUpload({file: files[0]});
                    }
                }}
            />
        </>
    );
}
