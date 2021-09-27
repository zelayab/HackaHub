import React, { useContext, useState } from 'react';

import { authContext } from '../../context/appContext';
import { Box } from '@mui/system';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AppBar, IconButton, Toolbar, Typography, Link, Drawer, ListItem, ListItemText  } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoreIcon from '@mui/icons-material/MoreVert';

const Navbar = (props) => {
    const { isMobile } = props;
    const [anchorEl, setAnchorEl] = useState(null);

    const { userData, userLogout } = useContext(authContext);

    const handleLogout = async (e) => {
        e.preventDefault();

        userLogout();
    }
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);  
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {
                        isMobile ?
                        <>
                            {/* icono de button  */}
                            <Box>
                                <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                // aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                 size="large"
                                 aria-label="show more"
                                // aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                // onClick={handleMobileMenuOpen}
                                color="inherit"
                                >
                                    <AccountCircle />
                                    
                                </IconButton>
                            </Box>
                        </>
                        :
                        <></>
                    }

                    <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>
                      HackaJob
                    </Typography>

                    {
                        userData.loading || isMobile ?
                            <span></span>
                        :
                             userData.logged ?
                            <>
                                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                    <AssignmentIcon />
                                </IconButton>
                                <Link 
                                        href="/"
                                        color="inherit" 
                                        underline="none"
                                        sx={{ mr: 2 }}
                                        onClick={handleLogout}
                                >
                                    Logout
                                </Link>
                            </>
                            :
                            <>
                            </>
                    }
                    
                </Toolbar>
            </AppBar>
        </Box>
    )}

        export default Navbar;