import React, { useEffect, useRef, useState } from 'react';
import AxiosResponse from 'axios';
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
import { IAddress } from '@/types/address';
import { apiRoutes } from '@/routes';
import { useApi } from '@/api';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingButton } from "@mui/lab";
import { InstitutionService } from '@/api/institution';
// import { Grid } from '@mui/joy';

const NewInstitutionForm = (props: any) => {
    const { id } = useParams();

	const [image, setImage] = useState();
	const api = useApi();
	const [address, setAddress] = useState<IAddress | undefined>();
	const inputRef = useRef(null);
	const navigate = useNavigate();
	const handleImageChange = (event: any) => {
		const file = event.target.files[0]
		setImage(file);
	}
	const { mutate: create, isLoading, isSuccess, isError, data } = InstitutionService.usePostNewInstitution();
	const { mutate: update } = InstitutionService.usePutInstitution(id);
	const { data: institution, isLoading: isLoadingInstitution } = InstitutionService.useGetInstitution(id);
	
	
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
	useEffect(() => {
		if (institution != undefined && id!= undefined)
			reset({
				id: institution.id,
				about: institution.about,
				facebook: institution.facebook,
				instagram: institution.instagram,
				owner_id: institution.owner_id,
				name: institution.name,
				telephone: institution.telephone,
				picture: institution.picture,
			})
			if(institution?.address){
				setAddress(institution?.address)
			}
	}, [institution])
	const onSubmit = (data: Institution, e: any) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.target.id != "new-organization-form") return;
		if (address != undefined) {
			data.address = address;
		}
		if(data.id){
			update(data)
		}else{
			console.log("create", data);
			create(data);
		}
	}

	useEffect(() => {
		if (data?.data.id != undefined)
			props.setShowModal(false);
	}, [data])

	return (
		<FormContainer onSubmit={handleSubmit(onSubmit)} id="new-organization-form">
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
				<Grid item sx={{ display: "flex", flexDirection: "column" }} xs={6} sm={12} md={6} >
					<TextField
						{...register("name")}
						required
						label="Nome Organização"
						name="name"
						size={"small"}
						variant="outlined"
						inputProps={{ maxLength: 255 }} 
						InputLabelProps={{ shrink: true }}/>
					<TextField
						label="Sobre"
						{...register("about")}
						multiline
						// required
						rows={5}
						defaultValue=""
						inputProps={{ maxLength: 1024 }} 
						InputLabelProps={{ shrink: true }}/>

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
						// required
						defaultValue=""
						placeholder="(00) 00000-0000"
						mask="(00) 00000-0000"
						variant="outlined"
						InputLabelProps={{ shrink: true }} />
					{/* <Typography fontWeight={600} variant="subtitle1">Redes sociais</Typography> */}
					<InputGroup>
						<TextField
							{...register("facebook")}
							label="Facebook"
							size={"small"}
							variant="outlined"
							inputProps={{ maxLength: 255 }}
							InputLabelProps={{ shrink: true }} />

						<TextField
							{...register("instagram")}
							label="Instagram"
							size={"small"}
							variant="outlined"
							inputProps={{ maxLength: 255 }} 
							InputLabelProps={{ shrink: true }}/>

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
								<VisuallyHiddenInput required={false} type="file" onChange={handleImageChange} ref={inputRef} />
							</Button>
						</CardContent>
					</Card>
					<AddressSelect
						context={institution != undefined ? "editOrganization" :"newOrganization"}
						setAddress={setAddress}
						selectedAddress={address}
					/>
				</Grid>
			</Grid>

			<Grid>
				{/* <pre>{JSON.stringify(getValues(), null, 4)}</pre> */}
				<Grid item md={12} style={{ textAlign: "right" }}>
					<Button
						color="primary"
						variant='outlined'
						onClick={() => {
							if (props?.setShowModal != undefined)
								props.setShowModal(false)
							else
								navigate(-1);
						}}
						// onClick={() => reset({})} 
						style={{ marginRight: "10px" }}
					>
						CANCELAR
					</Button>

					<LoadingButton
						color="primary"
						// onClick={handleSubmit}
						type="submit"
						variant='contained'
						form="new-organization-form"
						// size="large"
						id="new-organization-form-btn"
						loading={isLoading}
						loadingPosition="center"
					>
						Confirmar
					</LoadingButton>
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
