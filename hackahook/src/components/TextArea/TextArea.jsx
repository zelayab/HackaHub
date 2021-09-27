import { useState } from 'react';
import { Typography, Button, Grid, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;

export default function TextArea(props) {
    console.log("qweqweqeqw")
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditar = () => {
        console.log('editar button');
    }

    const handleBorrar = () => {
        console.log('borrar button');
    }

    return (
        <Paper elevation={1} sx={{ p: 4, m: 2 }}>
            <Grid container>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Typography variant="h5" component="h1">
                        {props.title}
                    </Typography>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls="long-menu"
                        aria-expanded={open ? 'true' : undefined}
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
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        <MenuItem onClick={handleEditar}>
                            Editar
                        </MenuItem>
                        <MenuItem onClick={handleBorrar}>
                            Borrar
                        </MenuItem>
                    </Menu>
                </Grid>
                <Grid item
                    xs={12}
                    sm={12}
                    sx={{ textAlign: { sm: "right" } }}
                >
                    <Typography
                        variant="subtitle2"
                        component="h3"
                        sx={{
                            textAlign: 'left',
                        }}>
                        {props.subtitle}
                    </Typography>
                    {
                        props.enterprise ? <></>
                            :
                            <Button onClick={() => props.handleOpen(props.index)} size="small" variant="contained" endIcon={<SendIcon />}>
                                {props.btnText}
                            </Button>
                    }

                </Grid>
            </Grid>
        </Paper>
    );
}