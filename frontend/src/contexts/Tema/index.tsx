import { createContext, useEffect, useState } from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ptBR } from '@mui/x-data-grid';
import {
	experimental_extendTheme as materialExtendTheme,
	Experimental_CssVarsProvider as MaterialCssVarsProvider,
	THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { useColorScheme as useMaterialColorScheme } from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
// import ReactGA from 'react-ga4';
export const TemaContext = createContext<any>({} as any);
const materialTheme = materialExtendTheme({
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				input: {
					root: {
						background: 'black'
					}
				},
			},
		},
	}
});

export const Tema = (props: any) => {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(localStorage.getItem('tema') == 'dark');
	// const trocaLogo = (temaSelecionado: string) => {
	// document.querySelectorAll('.logoEspaco').forEach((logo: any) => {
	// 	if(temaSelecionado == 'tema-escuro'){
	// 		logo.src = LogoEspacoEscuro
	// 	}else{
	// 		logo.src = LogoEspaco
	// 	}
	// })
	// }

	const TemaAux = (props: any) => {
		const { mode, setMode: setMaterialMode } = useMaterialColorScheme();
		const { setMode: setJoyMode } = useJoyColorScheme();

		useEffect(() => {
			var curTheme: any = props.isDarkTheme ? 'dark' : 'light';
			localStorage.setItem('tema', curTheme);

			setJoyMode(curTheme);
			setMaterialMode(curTheme);
			// ReactGA.event({
			// 	category: 'Tema',
			// 	action: isDarkTheme ? "Tema escuro" : "Tema claro" + " selecionado"
			// });
		}, [props.isDarkTheme]);
		return (
			<>
				{props.children}
			</>
		)
	}
	const trocaLogo = (isDarkThemeLogo: boolean) => {
		document.querySelectorAll('.logoEspaco').forEach((logo: any) => {
			// logo.src = isDarkThemeLogo ? LogoEspacoEscuro : LogoEspaco;
		})
	}
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	// useEffect(() => {
	// 	setisMobile(width <= 768);
	// }, [width]);
	useEffect(() => {
		handleWindowSizeChange();
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		}
	}, []);

	// const darkTheme = createTheme({
	// 	components: {
	// 		MuiTypography: {
	// 			defaultProps: {
	// 				variantMapping: {
	// 					h1: 'h3',
	// 				},
	// 			},
	// 		},
	// 		MuiOutlinedInput: {
	// 			styleOverrides: {
	// 				input: {
	// 					'&:-webkit-autofill': {
	// 						WebkitTextFillColor: 'black'
	// 					}
	// 				},
	// 			},
	// 		},
	// 		MuiInputLabel: {
	// 			styleOverrides: {
	// 				root: {
	// 					fontWeight: 'Normal',
	// 					marginBottom: "3px"
	// 				}
	// 			}
	// 		}
	// 	},
	// 	palette: {
	// 		background: {
	// 			default: '#11141e',//'#0e2b42',
	// 			paper: 'rgb(45 42 42)'
	// 		},
	// 		mode: 'dark',
	// 		primary: {
	// 			light: '#757ce8',
	// 			main: '#5575c0',//1642a7',
	// 			dark: '#1b1849',
	// 			contrastText: '#fafafa',
	// 		},
	// 		secondary: {
	// 			light: '#fff',
	// 			main: '#fafafa',
	// 			dark: '#707070',
	// 			contrastText: '#000',
	// 		},

	// 	},

	// 	// typography: {
	// 	// 	fontFamily: 'Poppins',
	// 	// },
	// },
	// 	ptBR);
	// const lightTheme = createTheme({
	// 	components: {
	// 		MuiTypography: {
	// 			defaultProps: {
	// 				variantMapping: {
	// 					h1: 'h3',
	// 				},
	// 			},
	// 		},
	// 		MuiInputLabel: {
	// 			styleOverrides: {
	// 				root: {
	// 					fontWeight: 'Normal',
	// 					marginBottom: "3px"
	// 				}
	// 			}
	// 		}
	// 	},
	// 	palette: {
	// 		background: {
	// 			default: '#fafafa',
	// 			paper: '#fafafa'
	// 		},
	// 		secondary: {
	// 			light: '#fff',
	// 			main: '#5575c0',
	// 			dark: '#707070',
	// 			contrastText: '#fafafa',
	// 		},
	// 		mode: 'light'
	// 	}
	// },
	// 	ptBR);
	return (
		<MaterialCssVarsProvider  //defaultMode="dark"
			// theme={isDarkTheme ? darkTheme : lightTheme}
			theme={{ [MATERIAL_THEME_ID]: materialTheme }}
		>
			<JoyCssVarsProvider>
				<TemaContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
					<TemaAux isDarkTheme={isDarkTheme}>
						{props.children}
					</TemaAux>
				</TemaContext.Provider>
			</JoyCssVarsProvider>
		</MaterialCssVarsProvider>
	);
};