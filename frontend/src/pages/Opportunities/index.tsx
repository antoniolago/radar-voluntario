import { ContainerFilter } from "@/components/OpportunitiesList/styles";
import Table from "@/components/Table";
import { Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AlertDialog from "@/components/AlertDialog";
import { Link } from "react-router-dom";
import { PageContainer } from "@/styles/styles";

const Opportunities = () => {
    const [openAlertDialog, setOpenAlertDialog] = useState(false);

	const deleteAccount = () => {
        alert("Oportunidade excluída");
        setOpenAlertDialog(false);
    }

	const handleDelete = (opportunityId: number) => {
		setOpenAlertDialog(true);
	}

	const renderActions = (params: any) => {
		return (
			<>
				<IconButton onClick={() => handleDelete(params.row.id)} aria-label="delete" color="error">
					<DeleteIcon />
				</IconButton>
				<IconButton component={Link} to={"/edicao/oportunidade/"+params.row.id}  aria-label="edit" color="primary">
					<EditIcon />
				</IconButton>
			</>
		)
	}


	const renderPublishedIcon = (params: any) => {

		if (params.row.published) {
			return (
				<CheckIcon fontSize="small" color="success" />
			)
		}
		return '';

	}

	const columns = [
		{ field: 'title', headerName: 'Oportunidade', flex: 1 },
		{ field: 'address', headerName: 'Endereço', flex: 1 },
		{ field: 'date', headerName: 'Data', flex: 1 },
		{ field: 'volunteers', headerName: 'Voluntários inscritos', flex: 1 },
		{ field: 'published', headerName: 'Publicado', flex: 1, renderCell: renderPublishedIcon },
		{
			field: 'id',
			headerName: 'Ações',
			sortable: false,
			width: 180,
			renderCell: renderActions
		},
	];



	const mockedRows = [
		{ title: 'Oportunidade nome 1', address: 'Cidade/UF', date: "10/12/2023", volunteers: 1, published: true, id: 1 },
		{ title: 'Oportunidade nome 2', address: 'Cidade/UF', date: "10/11/2023", volunteers: null, published: false, id: 2 },
		{ title: 'Oportunidade nome 4', address: 'Cidade/UF', date: "26/11/2023", volunteers: 1, published: true, id: 4 },
		{ title: 'Oportunidade nome 4', address: 'Cidade/UF', date: "26/11/2023", volunteers: 1, published: true, id: 4 },
	];
	const [data, setData] = useState<any>(mockedRows);

	return (
		<PageContainer>
			<Typography mb={8} variant="h5">Oportunidades</Typography>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
				<TextField
					sx={{ marginBottom: '1em', width: '350px' }}
					// value={search} 
					label="Buscar"
					variant="outlined"
					onChange={(e) => {
						// setSearch(e.target.value);
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
				<Button component={Link} to="/edicao/oportunidade" variant="contained" color="primary">
					Cadastrar oportunidade
				</Button>
			</div>

			<Table rows={data} columns={columns} />

            <AlertDialog 
                title={"Excluir oportunidade"}
                description={"Você tem certeza que deseja excluir esta oportunidade?"}
                confirmText={"Sim, excluir oportunidade"}
                open={openAlertDialog} 
                setOpen={setOpenAlertDialog} 
                handleClick={deleteAccount}/>
		</PageContainer>
	);
}

export default Opportunities;
