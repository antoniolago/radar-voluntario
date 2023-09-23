import { ContainerLoading } from './styles';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'

const Loading = (props: CircularProgressProps) => {
	return (
		//@ts-ignore
		<div style={{ textAlign: '-webkit-center' }}>
			<ContainerLoading>
				<CircularProgress size={props.size} color={props.color || "primary"}/>
			</ContainerLoading>
		</div>
	);
}

export default Loading;
