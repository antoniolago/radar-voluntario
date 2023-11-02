import { useRef, useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { ImageContainer, PreviewImage } from './styles';
import { FooterButton, FormContainer, InputGroup, VisuallyHiddenInput } from '../../pages/ProfileEdit/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'sonner';
import MaskedTextField from 'react-masked-mui-textfield';

const InstitutionForm = () => {
	const [image, setImage] = useState();
    const inputRef = useRef(null);

	const handleImageChange = (event: any) => {
		const file = event.target.files[0]
		setImage(file);
	}

	const onSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		toast.success('Perfil atualizado');
	}

	return (
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

					<MaskedTextField
						name="Telefone"
						size="small"
						required={true}
						placeholder="(00) 00000-0000"
						mask="(00) 00000-0000"
						variant="outlined" />

					<ImageContainer>
						{image ? (
							<PreviewImage src={URL.createObjectURL(image)} />
						) : (
							<PreviewImage src="/preview-image.png" />
						)}
						{/* A foto virá da google */}
						{/* <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
							Carregar imagem
							<VisuallyHiddenInput required type="file" onChange={handleImageChange} ref={inputRef} />
						</Button> */}
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
	);
}

export default InstitutionForm;
