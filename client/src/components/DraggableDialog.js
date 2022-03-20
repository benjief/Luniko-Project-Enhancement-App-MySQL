import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import '../styles/DialogComponents.css';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function DraggableDialog({
    dialogText = ""
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div
            className="draggable-dialog-container">
            <Button
                className="mui-draggable-dialog-button"
                variant="contained"
                onClick={handleClickOpen}>
                <p>?</p>
            </Button>
            <Dialog
                className="draggable-dialog"
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                {/* <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                </DialogTitle> */}
                <DialogContent>
                    <DialogContentText>
                        {dialogText}
                    </DialogContentText>
                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Okay
                    </Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
}