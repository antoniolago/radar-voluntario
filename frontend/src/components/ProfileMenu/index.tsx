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
const ProfileMenu = (props: any) => {
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
        handleCloseMenu();
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
                            marginRight: '15px',
                            alignItems: 'center',
                            border: '3px solid white',
                            borderRadius: '30px',
                            cursor: 'pointer'
                        }}
                        onClick={handleOpenMenu}
                    >
                        <Avatar
                            alt="User"
                            src={user.picture}
                            sx={{
                                width: 32,
                                height: 32,
                            }}
                        />
                        {/* <SettingsIcon sx={{ marginLeft: '8px', color: ''}} /> */}
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
                    <Typography variant="body2">
                        Olá {user?.name}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate('/perfil')}>
                    <SettingsIcon />
                    <Typography
                        variant="body2"
                        sx={{ marginLeft: '5px' }}>
                        Configurações
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <LogoutIcon />
                    <Typography
                        variant="body2"
                        sx={{ marginLeft: '5px' }}>
                        Sair
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default ProfileMenu;