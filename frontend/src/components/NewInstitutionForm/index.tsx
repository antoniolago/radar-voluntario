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
import AddressSelect from '../AddressSelect';
import { createPortal } from 'react-dom';
// import { Grid } from '@mui/joy';

const NewInstitutionForm = (props: any) => {
	const [image, setImage] = useState();
	const inputRef = useRef(null);

	const handleImageChange = (event: any) => {
		const file = event.target.files[0]
		setImage(file);
	}

	const onSubmitt = (data: any, e: any) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.target.id != "new-organization-form") return;
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
		<FormContainer onSubmit={handleSubmit(onSubmitt)} id="new-organization-form">
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
				<Grid item sx={{ display: "flex", flexDirection: "column" }} xs={6} sm={12} md={6} >
					<TextField
						{...register("name")}
						required
						label="Nome Organização"
						name="name"
						size={"small"}
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

					{/* <TextField
						required
						{...register("ownerName")}
						label="Responsável"
						variant="outlined"
						inputProps={{ maxLength: 255 }} /> */}

					<MaskedTextField
						{...register("telephone")}
						size="small"
						label="Telefone"
						required={true}
						placeholder="(00) 00000-0000"
						mask="(00) 00000-0000"
						variant="outlined" />
					<Typography fontWeight={600} variant="subtitle1">Redes sociais</Typography>

					<InputGroup>
						<TextField
							label="Facebook"
							size={"small"}
							variant="outlined"
							inputProps={{ maxLength: 255 }} />

						<TextField
							label="Instagram"
							size={"small"}
							variant="outlined"
							inputProps={{ maxLength: 255 }} />

					</InputGroup>
				</Grid>
				<Grid item sx={{ display: "flex", flexDirection: "column" }} xs={6} sm={12} md={6}>

					<Card sx={{ mb: 3 }}>
						{/* <div>
							<Typography>Foto de perfil da organização</Typography>
						</div> */}
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
					<AddressSelect />
				</Grid>
			</Grid>

			<Grid>
				{/* <pre>{JSON.stringify(getValues(), null, 4)}</pre> */}
				<Grid md={12} style={{ textAlign: "right" }}>
					<Button
						color="primary"
						variant='outlined'
						onClick={() => props.setShowModal(false)}
						// onClick={() => reset({})} 
						style={{ marginRight: "10px" }}
					>
						CANCELAR
					</Button>
					<Button 
						variant='contained'
						form="new-organization-form"
						type="submit"
						// size="large"
						id="new-organization-form-btn">
						SALVAR
					</Button>
				</Grid>
			</Grid>
			{/* <FooterButton>
				<Button
					form="new-organization-form"
					type="submit"
					size="large"
					color="success"
					variant="contained"
					id="new-organization-form-btn">
					Salvar
				</Button>
			</FooterButton> */}
		</FormContainer>
	);
}

export default NewInstitutionForm;
