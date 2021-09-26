import React, { useContext, useState } from 'react';

import { authContext } from '../../context/appContext';
import { Box } from '@mui/system';
import { AppBar, IconButton, Toolbar, Typography, Link, Drawer, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'

const Navbar = (props) => {
    const { isMobile } = props;

    const { userData, userLogout } = useContext(authContext);

    const [openDrawer, setOpenDrawer] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();

        userLogout();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {
                        isMobile ?
                        <>
                            <Drawer
                                anchor={"right"}
                                open={openDrawer}
                                onClose={() => setOpenDrawer(false)}
                            >
                                <ListItem button>
                                    <ListItemText>
                                        Sign In
                                    </ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>
                                        Sign Up
                                    </ListItemText>
                                </ListItem>
                            </Drawer>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={() => setOpenDrawer(!openDrawer)}
                            >
                                <MenuIcon />
                            </IconButton>
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
                                <Link 
                                    href="/login" 
                                    color="inherit" 
                                    underline="none"
                                    sx={{ mr: 2 }}
                                >
                                    Sign In
                                </Link>
                                <Link 
                                    href="/register" 
                                    color="inherit" 
                                    underline="none"
                                >
                                    Sign Up
                                </Link>
                            </>
                    }
                    
                </Toolbar>
            </AppBar>
        </Box>
    )}

        export default Navbar;