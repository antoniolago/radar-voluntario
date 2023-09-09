import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Box, ListItemButton } from '@mui/material';

const drawerWidth = 240;
export interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}
export const DrawerHeader = styled('div')(({ theme }: any) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));
export const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop: any) => prop !== 'open' })<AppBarProps>(
	({ theme, open }: any) => ({
		backgroundColor: theme.palette.mode == "dark" ? '#000' : theme.palette.primary.main,
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(open && {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		}),
	}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop: any) => prop !== 'open' })(
	({ theme, open }: any) => ({
		width: drawerWidth,
		flexShrink: 0,
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

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});
export const Container = styled(Box)`
	display: grid;
	grid-template-areas:
		'sidebar header'
		'sidebar content'
		'footer footer';
	grid-template-columns: 235px auto;
	grid-template-rows: max-content auto 20px;
	grid-gap: 15px;
	padding: 15px;
	min-height: 100vh;
	background: var(--background);

	/* Extra small devices (phones, 768px and down) */
	@media only screen and (max-width: 768px) {
		grid-template-areas:
			'sidebar'
			'header'
			'content'
			'footer';
		grid-template-columns: 100%;
		grid-template-rows: max-content max-content auto auto;
		padding: 0 15px 15px 15px;
	}
`;


export const EnvironmentBadge = styled(Box)`
	border-radius: 16px;
    font-size: 10px;
    border-style: groove;
    padding: 4px;
    border-width: 1px;
    margin-left: 5px;
    bottom: 3px;
    position: relative;
`;