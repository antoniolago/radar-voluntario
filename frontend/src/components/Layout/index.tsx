import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Logout from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import 'react-toastify/dist/ReactToastify.css';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useContext, useEffect, useState } from 'react';
import { AppBar, EnvironmentBadge, Drawer, DrawerHeader } from './styles';
import { Collapse } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { TemaContext } from '@/contexts/Tema';
import { matchPath } from 'react-router';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { useGetAppSettings } from '@/api/appsettings';
import { useGetUser } from '@/api/auth';
import Loading from '../Loading';
import ThemeSelector from '../ThemeSelector';
import MapIcon from '@mui/icons-material/Map';
import ExploreIcon from '@mui/icons-material/Explore';
import { GoogleButton } from '../GoogleButton';
import { ToastContainer } from 'react-toastify';

export const menuItems = [
    {
        id: 'home',
        text: 'Início',
        icon: <ExploreIcon />,
        path: '/home'
    },
    // {
    //     id: 'financeiro',
    //     text: 'Financeiro',
    //     icon: <AccountBalanceWallet />,
    //     path: '/financeiro',
    //     subItems: [
    //         {
    //             text: 'Em Aberto',
    //             icon: <ReceiptIcon sx={{ width: '18px' }} />,
    //             path: '/financeiro',
    //         },
    //         {
    //             text: 'Quitados',
    //             icon: <TaskAltIcon sx={{ width: '18px' }} />,
    //             path: '/financeiro/quitados',
    //         },
    //         // Add more subItems here as needed
    //     ],
    // },
    // Add more top-level items here as needed
];
const Layout = (props: any) => {
    const { isDarkTheme, setIsDarkTheme } = useContext(TemaContext);
    // const { data: user } = useGetUser();
    const [collapseStates, setCollapseStates] = useState<any>(
        {
            'cadastro': false,
            'financeiro': false
        }
    );
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const { data: appSettings } = useGetAppSettings();
    const { data: user, isLoading: isLoadingUser, refetch: refetchUser } = useGetUser();

    const toggleCollapseState = (id: string) => {
        setCollapseStates((prevCollapseStates: any) => ({
            ...prevCollapseStates,
            [id]: !collapseStates[id],
        }));
    };

    useEffect(() => {
        //Inicializa o accordeon das categorias conforme a página atual
        var path = pathname.split("/")[1].replace('/', '')
        if (path in collapseStates) {
            toggleCollapseState(path)
        }
        //Inicializa o estado do drawer conforme o localStorage
        localStorage.getItem('drawerOpen') == 'true' ? setOpen(true) : setOpen(false);
    }, []);

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        localStorage.setItem('drawerOpen', !open ? 'true' : 'false');
        setOpen(!open);
    }
    const InnerListItemButton = styled(ListItemButton)(({ theme }: any) => ({
        paddingBottom: '5px',
        paddingTop: '5px',
        paddingLeft: open ? '30px' : '15px'
    }));
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        navigate("/");
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar sx={{ justifyContent: "space-between", paddingRight: "0" }}>
                        <IconButton
                            color="inherit"
                            aria-label="Abrir menu"
                            onClick={toggleDrawer}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className="mr-4" component="div" sx={{ flex: 'auto', display: 'grid' }}>
                            {/* {user?.firstName} */}
                            {/* <div style={{ height: '20px' }}>
                                <SituacaoIcon sx={{ width: '10px', color: "green" }} />
                                <span style={{ fontSize: "15px", top: '-1px', position: 'relative', color: 'green' }}>{usuario?.situacao}</span>
                            </div> */}
                        </Typography>
                        {isLoadingUser ?
                            <Loading color="warning" />
                            : user?.IsVerified ?
                                <IconButton
                                    color="inherit"
                                    aria-label="logout"
                                    onClick={handleLogout}
                                >
                                    <Logout />
                                </IconButton>
                                :
                                <GoogleButton />
                            // <Button
                            //     variant="contained"
                            //     color="success"
                            //     onClick={() => navigate("/login")}>
                            //     Logue-se
                            // </Button>
                        }
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} elevation={14}>
                    <DrawerHeader>
                        <Typography variant="h6" noWrap sx={{ flex: 'auto' }}>
                            <Typography sx={{ cursor: "pointer" }} onClick={() => navigate('/home')}>
                                Radar Voluntário
                                {appSettings?.ENVIRONMENT != "main" &&
                                    <EnvironmentBadge component="span">
                                        {appSettings?.ENVIRONMENT}
                                    </EnvironmentBadge>
                                }
                            </Typography>
                        </Typography>
                        <IconButton onClick={toggleDrawer}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {menuItems.map((item: any) => (
                            <div key={item.id}>
                                <ListItem
                                    key={item.id}
                                    disablePadding
                                    sx={{ display: 'block' }}
                                    onClick={
                                        item.subItems
                                            ? () => toggleCollapseState(item.id)
                                            : () => navigate(item.path)
                                    }
                                >
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                        selected={matchPath(item.path + "/*" as string, pathname) !== null}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        {open && <ListItemText primary={item.text} />}
                                        {item.subItems ? (
                                            collapseStates[item.id] ? (
                                                <ExpandLess sx={{ width: '18px' }} />
                                            ) : (
                                                <ExpandMore sx={{ width: '18px' }} />
                                            )
                                        ) : null}
                                    </ListItemButton>
                                </ListItem>
                                {item.subItems ? (
                                    <Collapse
                                        in={collapseStates[item.id]}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding>
                                            {item.subItems?.map((subItem: any) => (
                                                <ListItem
                                                    key={subItem.path}
                                                    sx={{ padding: 0 }}
                                                >
                                                    <InnerListItemButton
                                                        onClick={() => navigate(subItem.path)}
                                                        selected={matchPath(subItem.path, pathname) !== null}>
                                                        <ListItemIcon>
                                                            <SubdirectoryArrowRightIcon sx={{ width: '10px' }} />
                                                            {subItem.icon}
                                                        </ListItemIcon>
                                                        {open && <ListItemText primary={subItem.text} />}
                                                    </InnerListItemButton>
                                                </ListItem>
                                            ))}
                                        </List>
                                        <Divider />
                                    </Collapse>
                                ) : null}
                            </div>
                        ))}
                    </List>
                    <List sx={{
                        flex: 'auto',
                        display: 'flex',
                        placeItems: 'self-end',
                        paddingBottom: '0'
                    }}>
                        <ListItem key="4" disablePadding sx={{ display: 'block' }}>
                            <Divider />
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    // padding: 0,
                                }}
                                onClick={() => setIsDarkTheme(!isDarkTheme)}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ThemeSelector size={40} />

                                </ListItemIcon>
                                {open &&
                                    <ListItemText primary={"Seletor de Tema"} sx={{ opacity: open ? 1 : 0 }} />
                                }
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, margin: '15px' }}>
                    <DrawerHeader />
                    {props.children}
                    {/* <Footer /> */}
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light" />
                </Box>
            </Box >
        </>
    );
}
export default Layout;