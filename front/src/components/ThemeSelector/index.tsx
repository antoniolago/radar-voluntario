import { useContext } from 'react';
// @ts-ignore
import { DarkModeToggle } from "react-dark-mode-toggle-2";
import { TemaContext } from '@/contexts/Tema';

const ThemeSelector = (props: any) => {
	const {isDarkTheme, setIsDarkTheme} = useContext(TemaContext);
	return (
		<DarkModeToggle
		  onChange={setIsDarkTheme}
		  isDarkMode={isDarkTheme}
		  className={props.className}
		  size={props.size || 80}
		  speed={3}
		/>
	);
}

export default ThemeSelector;
