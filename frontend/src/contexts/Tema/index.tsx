import { createContext, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ptBR } from '@mui/x-data-grid';
// import ReactGA from 'react-ga4';
export const TemaContext = createContext<any>({} as any);

export const Tema = (props: any) => {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(localStorage.getItem('tema') == 'dark');
	const [isMobile, setisMobile] = useState<boolean>();
	const [width, setWidth] = useState<number>(window.innerWidth);
	// const trocaLogo = (temaSelecionado: string) => {
	// document.querySelectorAll('.logoEspaco').forEach((logo: any) => {
	// 	if(temaSelecionado == 'tema-escuro'){
	// 		logo.src = LogoEspacoEscuro
	// 	}else{
	// 		logo.src = LogoEspaco
	// 	}
	// })
	// }

	const trocaLogo = (isDarkThemeLogo: boolean) => {
		document.querySelectorAll('.logoEspaco').forEach((logo: any) => {
			// logo.src = isDarkThemeLogo ? LogoEspacoEscuro : LogoEspaco;
		})
	}
	useEffect(() => {
		localStorage.setItem('tema', isDarkTheme ? 'dark' : 'light');
		trocaLogo(isDarkTheme)
		// ReactGA.event({
		// 	category: 'Tema',
		// 	action: isDarkTheme ? "Tema escuro" : "Tema claro" + " selecionado"
		// });
	}, [isDarkTheme]);
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		setisMobile(width <= 768);
	}, [width]);
	useEffect(() => {
		handleWindowSizeChange();
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		}
	}, []);

	const darkTheme = createTheme({
		components: {
			MuiTypography: {
				defaultProps: {
				  variantMapping: {
					h1: 'h3',
				  },
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					input: {
						'&:-webkit-autofill': {
							WebkitTextFillColor: 'black'
						}
					},
				},
			},
			MuiInputLabel: {
				styleOverrides: {
					root: {
						fontWeight: 'Normal',
						marginBottom: "3px"
					}
				}
			}
		},
		palette: {
			background: {
				default: '#11141e',//'#0e2b42',
				paper: 'rgb(45 42 42)'
			},
			mode: 'dark',
			primary: {
				light: '#757ce8',
				main: '#5575c0',//1642a7',
				dark: '#1b1849',
				contrastText: '#fafafa',
			},
			secondary: {
				light: '#fff',
				main: '#fafafa',
				dark: '#707070',
				contrastText: '#000',
			},

		},
	
		// typography: {
		// 	fontFamily: 'Poppins',
		// },
	},
		ptBR);
	const lightTheme = createTheme({
		components: {
			MuiTypography: {
				defaultProps: {
				  variantMapping: {
					h1: 'h3',
				  },
				},
			},
			MuiInputLabel: {
				styleOverrides: {
					root: {
						fontWeight: 'Normal',
						marginBottom: "3px"
					}
				}
			}
		},
		palette: {
			background: {
				default: '#fafafa',
				paper: '#fafafa'
			},
			secondary: {
				light: '#fff',
				main: '#5575c0',
				dark: '#707070',
				contrastText: '#fafafa',
			},
			mode: 'light'
		}
	},
		ptBR);
	return (
		//@ts-ignore
		<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
			<CssBaseline />
			{/* @ts-ignore */}
			<TemaContext.Provider value={{ isDarkTheme, setIsDarkTheme, isMobile }}>
				{props.children}
			</TemaContext.Provider >
		</ThemeProvider>
	);
};