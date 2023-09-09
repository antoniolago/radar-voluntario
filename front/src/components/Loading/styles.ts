import { Box, keyframes, styled } from "@mui/material";

export const ContainerLoading = styled(Box)`
	max-width: 150px;
	//margin: 20px auto;
	text-align: -webkit-center;
	position: relative;
	svg{
		//Cores das arestas do desenho do lápis
		g g g g path{
			stroke:var(--boxbackground-negativo);
		}
		//Cores das arestas do lápis
		g g g g g path{
			stroke:var(--nenhuma);
		}
	}
`;

// Create the keyframes
const loading = keyframes`
    0% {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: 0px;
        left: 0px;
        width: 72px;
        height: 72px;
        opacity: 0;
    }
`;

export const LoadingContent = styled('div')`
	display: inline-block;
	position: relative;
	width: ${(props: any) => (props.size ? props.size + "px" : "80px")};
	height: ${(props: any) => (props.size ? props.size + "px" : "80px")};

	div {
		position: absolute;
		border: 4px solid #175180;
		opacity: 1;
		border-radius: 50%;
		animation: ${loading} 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	div:nth-child(2) {
		animation-delay: -0.5s;
	}
`;
