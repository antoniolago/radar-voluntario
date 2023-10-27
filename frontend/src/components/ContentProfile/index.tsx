import { Avatar, Box, Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Chip } from "@mui/joy";
import { getToken, setToken, useApi } from "@/api";
import { AuthService } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { GoogleButton } from "../GoogleButton";
const ContentProfile = (props: any) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { data: user, isLoading: isLoadingUser, refetch: refetchUser } = AuthService.useGetUser();
    const navigate = useNavigate()
    const handleOpenMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setToken("");
        navigate("/");
    }

    return (
        <>

            {isLoadingUser ?
                <Loading color="warning" />
                : user?.name != undefined && getToken() != "" ?

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid white',
                            borderStyle: 'outset',
                            padding: '6px',
                            borderRadius: '30px',
                            cursor: 'pointer'
                        }}
                        onClick={handleOpenMenu}
                    >
                        <Avatar
                            alt="User"
                            sx={{
                                width: 32,
                                height: 32,
                            }}
                        />
                        <SettingsIcon sx={{ marginLeft: '8px', color: '' }} />
                    </Box>
                    :
                    <GoogleButton />
                // <Button
                //     variant="contained"
                //     color="success"
                //     onClick={() => navigate("/login")}>
                //     Logue-se
                // </Button>
            }
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                style={{ marginTop: '6px' }}
            >
                <MenuItem>
                    <Typography variant="body2" className="ml-1">
                        Olá {user?.name}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                    <SettingsIcon />
                    <Typography variant="body2" className="ml-1">
                        Configurações
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                    <LogoutIcon />
                    <Typography variant="body2" className="ml-1" onClick={handleLogout}>
                        Sair
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default ContentProfile;