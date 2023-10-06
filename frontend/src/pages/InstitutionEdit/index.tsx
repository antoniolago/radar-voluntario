import * as React from 'react';
import { Box, Button, Container, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import { FormContainer, InputGroup, VisuallyHiddenInput } from './styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const InstitutionEdit = () => {
	const [state, setState] = React.useState({
		gilad: true,
		jason: false,
		antoine: false,
	});

	const { gilad, jason, antoine } = state;
	const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	interface TabPanelProps {
		children?: React.ReactNode;
		index: number;
		value: number;
	}
	function CustomTabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						{children}
					</Box>
				)}
			</div>
		);
	}

	return (
		<>
			<Typography variant="h5">Configurações</Typography>
			<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
				<Tab label="Editar Perfil" {...a11yProps(0)} />
				<Tab label="Conta" {...a11yProps(1)} />
			</Tabs>
			<CustomTabPanel value={value} index={0}>
				<FormContainer>
					<Grid container spacing={2}>
						<Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6}>
							<TextField id="outlined-basic" label="Organização" variant="outlined" />
							<TextField
								id="outlined-multiline-static"
								label="Sobre"
								multiline
								rows={6}
								defaultValue="Default Value" />
							<TextField id="outlined-basic" label="Responsável" variant="outlined" />
							<TextField id="outlined-basic" label="Telefone Contato" variant="outlined" />
							<div>
								<Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
									Upload file
									<VisuallyHiddenInput type="file" />
								</Button>
							</div>
						</Grid>
						<Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6}>
							<TextField id="outlined-basic" label="Endereço" variant="outlined" />
							<TextField id="outlined-basic" label="Bairro" variant="outlined" />
							<InputGroup>
								<TextField id="outlined-basic" label="UF" variant="outlined" />
								<TextField id="outlined-basic" label="Cidade" variant="outlined" />
							</InputGroup>
							<Typography fontWeight={600} variant="subtitle1">Redes sociais</Typography>
							<InputGroup>
								<TextField id="outlined-basic" label="Facebook" variant="outlined" />
								<TextField id="outlined-basic" label="Instagram" variant="outlined" />
							</InputGroup>
						</Grid>
					</Grid>
				</FormContainer>
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				Item Two
			</CustomTabPanel>
		</>
	);
}

export default InstitutionEdit;
