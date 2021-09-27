import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { authContext } from '../../context/appContext';
import { Box } from '@mui/system';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AppBar, IconButton, Toolbar, Typography, Link, Button, Menu, MenuItem } from '@mui/material';
import CreateBootcamp from '../CreateBootcamp/CreateBootcamp';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';

const Navbar = (props) => {
    let history = useHistory();

    const { isMobile } = props;
    const [anchorEl, setAnchorEl] = useState(null);

    const { userData, userLogout, userInformation, postBootcamp } = useContext(authContext);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleRedirect = () => {
        history.push(userInformation.type ? '/mybootcamp' : '/subscriptions');
        setAnchorEl(null);
    };

    const handleLogout = async (e) => {
        e.preventDefault();

        userLogout();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* Brand */}
                    <Typography onClick={() => history.push('/')} component="div" variant="h6" sx={{ flexGrow: 1 }}>
                        HackaJob
                    </Typography>

                    {/* Right Buttons*/}
                    {
                        (userData.loading || !userData.logged) ?
                            <></>
                            :
                            <>
                                <IconButton onClick={() => history.push('/home')} size="medium" aria-label="show 4 new mails" color="inherit">
                                    <HomeIcon />
                                </IconButton>
                                <IconButton onClick={handleRedirect} sx={{ mr: { xs: 0, sm: userInformation.type ? 3 : 0 } }} size="medium" aria-label="show 4 new mails" color="inherit">
                                    <WorkIcon />
                                </IconButton>

                                {
                                    !userInformation.type ? <></>
                                        :
                                        <CreateBootcamp userInformation={userInformation} postBootcamp={postBootcamp} />

                                }

                                <IconButton
                                    size="medium"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {/* <MenuItem onClick={}>
                                        {userInformation.type ? "Mis Bootcamp" : "Mis Inscripciones"}
                                    </MenuItem> */}
                                    <MenuItem onClick={handleLogout}>Salir</MenuItem>
                                </Menu>
                            </>
                    }

                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default Navbar;