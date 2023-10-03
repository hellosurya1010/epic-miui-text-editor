
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SettingsIcon from '@mui/icons-material/Settings';
import { ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import * as React from 'react';
import { TOCConfigDialog } from '../TOC/TOCConfigDialog';

export const SettingsButton = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const dialogContentRef = React.useRef<HTMLDivElement | null>(null);

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <React.Fragment>
            <Button size='small' variant="text" onClick={handleClickOpen}>
                <SettingsIcon fontSize='small' />
            </Button>
            <Dialog
                fullWidth
                maxWidth={'lg'}
                open={open}
                onClose={handleClose}
                fullScreen
            >
                <DialogTitle>Settings</DialogTitle>
                <DialogContent ref={dialogContentRef} style={{ padding: 0 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container style={{ maxHeight: `${dialogContentRef.current?.offsetHeight}px` }}>
                            <Grid item xs={2.5} style={{ height: '100%', overflowY: 'auto' }}>
                                <List disablePadding>
                                    {['TOC',].map((text, index) => (
                                        <ListItem disableGutters key={index} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                            <Grid item padding={'10px'} xs={9.5}>
                                <TOCConfigDialog />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
