import { useState, useRef } from 'react';
import { Box, Button, Container, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import { FooterButton, FormContainer, ImageContainer, InputGroup, PreviewImage, VisuallyHiddenInput } from './styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AccountEdit from '../../components/AccountEdit';
import PhoneInput from '@/components/PhoneInput';
import { toast } from 'sonner';

const InstitutionEdit = () => {

	const [value, setValue] = useState(0);
	const [image, setImage] = useState();

	interface TabPanelProps {
		children?: React.ReactNode;
		index: number;
		value: number;
	}

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	const inputRef = useRef(null);

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	const handleImageChange = (event: any) => {
		const file = event.target.files[0]
		setImage(file);
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

	const onSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		toast.success('Perfil atualizado');
	}


	return (
		<div className="page-container">
			<Typography mb={3} variant="h5">Configurações</Typography>
			<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
				<Tab label="Editar Perfil" {...a11yProps(0)} />
				<Tab label="Conta" {...a11yProps(1)} />
			</Tabs>
			<CustomTabPanel value={value} index={0}>
				<FormContainer onSubmit={onSubmit}>
					<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
						<Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={6} >
							<TextField
								required
								label="Organização"
								variant="outlined"
								inputProps={{ maxLength: 255 }} />
							<TextField
								label="Sobre"
								multiline
								required
								rows={5}
								defaultValue=""
								inputProps={{ maxLength: 1024 }} />

							<TextField
								required
								label="Responsável"
								variant="outlined"
								inputProps={{ maxLength: 255 }} />

							<PhoneInput
								required={true}
								label="Telefone contato" />

							<ImageContainer>
								{image ? (
									<PreviewImage src={URL.createObjectURL(image)} />
								) : (
									<PreviewImage src="/preview-image.png" />
								)}
								<Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
									Upload file
									<VisuallyHiddenInput required type="file" onChange={handleImageChange} ref={inputRef} />
								</Button>
							</ImageContainer>
						</Grid>
						<Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={6}>
							<TextField
								required
								label="CEP"
								variant="outlined" />
							<TextField
								required
								label="Endereço"
								variant="outlined"
								inputProps={{ maxLength: 255 }} />
								
							<TextField
								required
								label="Bairro"
								variant="outlined"
								inputProps={{ maxLength: 255 }} />
								
							<InputGroup>
								<TextField
									required
									label="UF"
									variant="outlined" />
								<TextField
									required
									label="Cidade"
									variant="outlined" />
									
							</InputGroup>
							<Typography fontWeight={600} variant="subtitle1">Redes sociais</Typography>
							<InputGroup>
								<TextField
									label="Facebook"
									variant="outlined" 
									inputProps={{ maxLength: 255 }} />
									
								<TextField
									label="Instagram"
									variant="outlined" 
									inputProps={{ maxLength: 255 }} />
									
							</InputGroup>
						</Grid>
					</Grid>
					<FooterButton>
						<Button type="submit" size="large" color="success" variant="contained">
							Salvar
						</Button>
					</FooterButton>
				</FormContainer>
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<AccountEdit />
			</CustomTabPanel>
		</div>
	);
}

export default InstitutionEdit;
