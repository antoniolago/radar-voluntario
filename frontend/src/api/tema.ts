import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useGetIsMobile = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [isMobile, setisMobile] = useState<boolean>();
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
    
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
    return { isMobile, width }
}

export const TemaService = {
    useGetIsMobile
}