import { ContainerLoading } from './styles';
import CircularProgress from '@mui/material/CircularProgress'
const Loading = (props: any) => {
	return (
		//@ts-ignore
		<div style={{ textAlign: '-webkit-center' }}>
			<ContainerLoading>
				<CircularProgress size={props.size} />
			</ContainerLoading>
		</div>
	);
}

export default Loading;
