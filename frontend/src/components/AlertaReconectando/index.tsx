import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import Warning from '@mui/icons-material/Warning';

const AlertaReconectando = () => {
    return (
        <Alert
            variant="soft"
            color="danger"
            invertedColors
            startDecorator={
                <CircularProgress size="lg">
                    <Warning />
                </CircularProgress>
            }
            sx={{ alignItems: 'flex-start', gap: '1rem' }}
        >
            <Box sx={{ flex: 1 }}>
                <Typography level="title-md">Perdemos a conexão</Typography>
                <Typography level="body-md">
                    Estamos tentando conectar novamente, por favor aguarde...
                </Typography>
                {/* <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button variant="outlined" size="sm">
                        Open network settings
                    </Button>
                    <Button variant="solid" size="sm">
                        Try again
                    </Button>
                </Box> */}
            </Box>
        </Alert>
    )
}
export default AlertaReconectando;