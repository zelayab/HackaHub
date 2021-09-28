import { useState } from 'react';

import AlertDialog from '../Dialog/Dialog'

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;

const DotsBootcamp = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const dotsOpen = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //
    const [descripcion, setDescripcion] = useState('');
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        setDescripcion(e.target.value);
    }

    const handleDialogClose = () => {
        setOpen(false);
    }

    const handleDialogReject = () => {
        setOpen(false);
    }

    const handleDialogAccept = () => {
        setOpen(false);
        console.log(descripcion)
        props.handleEditar(descripcion);
    }

    const handleDialogOpen = () => {
        setOpen(true);
    }

    console.log(props.index);

    return (
        <>
            <AlertDialog
                open={open}
                handleReject={handleDialogReject}
                handleAccept={handleDialogAccept}
                handleClose={handleDialogClose}
                title="Editar la descripcion de tu bootcamp"
                text="Inserta una descripcion nueva tu bootcamp"

                insertTextField="true"
                handleChange={(e) => setDescripcion(e.target.value)}
            />
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={dotsOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                {
                    props.enterprise ? <MoreVertIcon /> : <></>
                }
            </IconButton>

            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={dotsOpen}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={handleDialogOpen}>
                    Editar
                </MenuItem>
                <MenuItem onClick={handleDialogOpen}>
                    Borrar
                </MenuItem>
            </Menu>
        </>
    )
}


export default DotsBootcamp;