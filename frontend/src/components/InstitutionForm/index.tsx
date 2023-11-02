import { useRef, useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { ImageContainer, PreviewImage } from './styles';
import { FooterButton, FormContainer, InputGroup, VisuallyHiddenInput } from '../../pages/ProfileEdit/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'sonner';
import MaskedTextField from 'react-masked-mui-textfield';
import { Institution } from '@/types/institution';
import { useForm } from 'react-hook-form';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
// import { Grid } from '@mui/joy';

const InstitutionForm = () => {
	const [image, setImage] = useState();
	const inputRef = useRef(null);

	const handleImageChange = (event: any) => {
		const file = event.target.files[0]
		setImage(file);
	}

	const onSubmit = async (data: any) => {
		console.log(data)
		toast.success('Perfil atualizado');
	}

	const {
		register,
		setError,
		clearErrors,
		formState: { errors },
		handleSubmit,
		control,
		setValue,
		getValues,
		formState,
		watch,
		reset,
	} = useForm<Institution>({
		// shouldUnregister: false,
		shouldFocusError: true,
		// resolver: yupResolver(validationSchema) as Resolver<AtualizacaoCadastralType, object>
	});
	const { isDirty, dirtyFields } = formState;
	var form = {
		register,
		setError,
		clearErrors,
		errors,
		handleSubmit,
		control,
		setValue,
		watch,
		getValues,
		isDirty,
		// dirtyFields
	};
	return (
		<FormContainer onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
				<Grid item sx={{ display: "flex", flexDirection: "column" }} xs={6} sm={12} md={6} >
					<TextField
						{...register("name")}
						required
						label="Nome Organização"
						name="name"
						variant="outlined"
						inputProps={{ maxLength: 255 }} />
					<TextField
						label="Sobre"
						{...register("about")}
						multiline
						required
						rows={5}
						defaultValue=""
						inputProps={{ maxLength: 1024 }} />

					<TextField
						required
						{...register("ownerName")}
						label="Responsável"
						variant="outlined"
						inputProps={{ maxLength: 255 }} />

					<MaskedTextField
						{...register("telephone")}
						size="small"
						required={true}
						placeholder="(00) 00000-0000"
						mask="(00) 00000-0000"
						variant="outlined" />
					<Card sx={{ width: 320 }}>
						<div>
							<Typography>Foto de perfil da organização</Typography>
						</div>
						<AspectRatio minHeight="120px" maxHeight="200px">
							{image ? (
								<PreviewImage src={URL.createObjectURL(image)} />
							) : (
								<PreviewImage src="/preview-image.png" />
							)}
						</AspectRatio>
						<CardContent orientation="horizontal">
							<Button fullWidth component="label" variant="contained" startIcon={<CloudUploadIcon />}>
								Carregar imagem
								<VisuallyHiddenInput required type="file" onChange={handleImageChange} ref={inputRef} />
							</Button>
						</CardContent>
					</Card>
				</Grid>
				<Grid item sx={{ display: "flex", flexDirection: "column" }} xs={6} sm={12} md={6}>
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
