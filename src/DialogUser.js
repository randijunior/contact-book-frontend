import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import React from 'react';



export default function DialogUser() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () =>{
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return(
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Abrir dialog
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Configurações</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Teste
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );

}