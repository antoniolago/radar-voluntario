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
import BusinessIcon from '@mui/icons-material/Business';
import { useContext, useEffect, useState } from 'react';
import { AppBar, BadgeAmbiente, DrawerHeader, closedMixin, openedMixin } from './styles';
import { Collapse, Grid, Paper } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { useLocation, useNavigate } from 'react-router';
import { TemaContext } from '@/contexts/Tema';
import { matchPath } from 'react-router';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { useGetAppSettings } from '@/api/appsettings';
import { AuthService } from '@/api/auth';
import Loading from '../Loading';
import ThemeSelector from '../ThemeSelector';
import MapIcon from '@mui/icons-material/Map';
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleIcon from '@mui/icons-material/People';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { GoogleButton } from '../GoogleButton';
import { TemaService } from '@/api/tema';
import { Toaster } from 'sonner';
import { getToken, isLogado, setToken } from '@/api';
import ProfileMenu from '../ProfileMenu';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import LocationOnIcon from '@mui/icons-material/LocationOn';
export const menuItems = [
    {
        id: 'home',
        text: 'Início',
        icon: <ExploreIcon />,
        path: '/',
        authentication: false,

    },
    {
        id: 'opportunity',
        text: 'Atividades',
        icon: <LocationOnIcon />,
        path: '/atividades',
        authentication: false,
    },
    {
        id: 'organizacoes',
        text: 'Organizações',
        icon: <Diversity2Icon />,
        path: '/organizacoes',
        authentication: false,

    },
    // {
    //     id: 'institutionProfile',
    //     text: 'Perfil Organização',
    //     icon: <BusinessIcon />,
    //     path: '/perfilInstituicao'
    // },
    {
        id: 'volunteersList',
        text: 'Voluntários',
        icon: <PeopleIcon />,
        path: '/voluntarios',
        authentication: true,
    },
    // {
    //     id: 'registers',
    //     text: 'Inscrições',
    //     icon: <ChecklistIcon />,
    //     path: '/inscricoes',
    //     authentication: true,

    // },
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
    const { isMobile } = TemaService.useGetIsMobile();
    // const { data: user } = useGetUser();
    const [collapseStates, setCollapseStates] = useState<any>(
        {
            'cadastro': false,
            'financeiro': false
        }
    );

    const Drawer = styled(MuiDrawer, {
        shouldForwardProp: (prop: any): boolean => {
            return prop !== 'open' || isMobile!;
        }
    })(
        ({ theme, open }: any) => ({
            width: 224,
            // flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );
    const navigate = useNavigate()
    const { pathname } = useLocation();
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

    var isMapPage = pathname == "/";
    return (
        <>
            <Toaster richColors position="top-center" expand visibleToasts={9} />
            <Grid container sx={{ display: 'flex', flexWrap: 'wrap', height: '100%' }}>
                <Grid item xs={isMobile ? 0 : 12} md={isMobile ? 0 : 12}>
                    <div style={{ position: "relative", width: '100%', height: '60px' }}>
                        <AppBar position="fixed" open={open} sx={{ height: '60px' }}>
                            <Toolbar sx={{
                                justifyContent: "space-between",
                                paddingRight: "0",
                                height: '60px'
                            }}>
                                <IconButton
                                    color="inherit"
                                    aria-label="Abrir menu"
                                    onClick={toggleDrawer}
                                    edge="start"
                                    sx={{
                                        marginRight: 5,
                                    }}
                                >
                                    <MenuIcon />
                                </ IconButton>
                                <Typography className="mr-4" component="div" sx={{ flex: 'auto', display: 'flex' }}>
                                    Radar Voluntário
                                    <div>
                                    </div>
                                </Typography>
                                <ProfileMenu />
                            </Toolbar>
                        </AppBar>
                    </div>
                </Grid>
                <Grid item xs="auto" sx={{ display: 'flex' }}>
                    <Drawer sx={{
                        // display: !open && isMobile ? 'none' : '', 
                        position: isMobile ? "absolute" : "relative",
                        width: isMobile ? '250px' : '100%',
                        // marginTop: isMobile ? '80px' : '0',
                        ".MuiPaper-root": {
                            width: '100%',
                            position: isMobile ? "absolute" : 'relative',
                            marginTop: isMobile ? '60px' : '0px',
                            height: isMobile ? 'calc(100dvh - 60px)' : '100%'
                        }
                    }}
                        variant={isMobile ? "temporary" : "permanent"}
                        onClose={toggleDrawer}
                        open={open}
                        elevation={14}
                    >
                        {/* <DrawerHeader>
                            <Typography variant="h6" noWrap sx={{ flex: 'auto' }}>
                                <Typography sx={{ cursor: "pointer" }} onClick={() => navigate('/home')}>
                                    Radar Voluntário
                                </Typography>
                            </Typography>
                            <IconButton onClick={toggleDrawer}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </DrawerHeader>
                        <Divider /> */}
                        <List>
                            {menuItems.map((item) => (
                                <div key={item.id}>

                                    {(item.authentication === false || isLogado()) &&

                                        <ListItem
                                            key={item.id}
                                            disablePadding
                                            sx={{ display: 'block' }}
                                            onClick={() => navigate(item.path)}
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
                                                    {item?.icon}
                                                </ListItemIcon>
                                                {open && <ListItemText primary={item.text} />}
                                            </ListItemButton>
                                        </ListItem>
                                    }

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

                </Grid>
                <Grid item
                    xs sx={{
                        position: 'relative',
                        top: isMobile ? '60px' : '0',
                        height: '100%',
                        padding: isMapPage ? 0 : '10px'
                    }}>{props.children}</Grid>
            </Grid>
        </>
    );
}
export default Layout;