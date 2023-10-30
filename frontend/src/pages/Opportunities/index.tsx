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
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DefaultDataGrid from "@/components/DataGrid";
import { TemaService } from "@/api/tema";

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
				<IconButton component={Link} to={"/edicao/oportunidade/" + params.row.id} aria-label="edit" color="primary">
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

	const columns: GridColDef[] = [
		{
			field: 'title',
			headerName: 'Oportunidade',
			flex: 0.1,
			minWidth: 100,
			align: "center",
			headerAlign: "center"
		},
		{
			field: 'address',
			renderCell: (params: GridRenderCellParams<any>) => (
				<>
					{isMobile &&
						<Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
							Endereço:
						</Typography>
					}
					{params.formattedValue.split(",")[0]}
				</>
			),
			minWidth: 100,
			headerName: 'Endereço',
			flex: 0.2,
			align: "center",
			headerAlign: "center"
		},
		{
			field: 'date',
			minWidth: 100,
			renderCell: (params: GridRenderCellParams<any>) => (
				<>
					{isMobile &&
						<Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
							Quando:
						</Typography>
					}
					{params.formattedValue.split(",")[0]}
				</>
			),
			headerName: 'Data', 
			flex: 0.2
		},
		{
			field: 'volunteers',
			minWidth: 100,
			align: 'center',
			renderCell: (params: GridRenderCellParams<any>) => (
				<>
					{isMobile &&
						<Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
							Voluntários inscritos:
						</Typography>
					}
					{params.formattedValue}
				</>
			),
			headerName: 'Voluntários inscritos',
			flex: 0.2
		},
		{
			field: 'published',
			minWidth: 100,
			headerName: 'Publicado',
			flex: 0.3,
			renderCell: renderPublishedIcon
		},
		{
			field: 'id',
			headerName: 'Ações',
			align: 'center',
			headerAlign: 'center',
			sortable: false,
			minWidth: 120,
			renderCell: renderActions
		},
	];

	const { isMobile } = TemaService.useGetIsMobile();
	const mockedRows = [
		{ title: 'Oportunidade nome 1', address: 'Cidade/UF', date: "10/12/2023", volunteers: 1, published: true, id: 1 },
		{ title: 'Oportunidade nome 2', address: 'Cidade/UF', date: "10/11/2023", volunteers: null, published: false, id: 2 },
		{ title: 'Oportunidade nome 4', address: 'Cidade/UF', date: "26/11/2023", volunteers: 1, published: true, id: 4 },
		{ title: 'Oportunidade nome 4', address: 'Cidade/UF', date: "26/11/2023", volunteers: 1, published: true, id: 5 },
	];
	const [data, setData] = useState<any>(mockedRows);

	return (
		<>
			<Typography mb={8} variant="h5">Oportunidades</Typography>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
			<DefaultDataGrid
				datagridProps={{
					sx: {
						// '.boleto-situacao-A': {
						//     backgroundColor: "yellow"
						// }
					},
					className: isMobile ? "vertical-grid" : "",
					columns: columns,
					density: isMobile ? "compact" : "standard",
					rows: data as any,
					rowCount: data?.length,
					// checkboxSelection: true,
					disableRowSelectionOnClick: true,
					// disableColumnMenu: isMobile ? true : false,
					pageSizeOptions: isMobile ? [5, 10, 25] : [25, 50, 100],
					initialState: {
						// columns: {
						//     columnVisibilityModel: {
						//         // Hide columns status and traderName, the other columns will remain visible
						//         dataLeitura: false
						//     },
						// },
						pagination: {
							paginationModel: {
								pageSize: isMobile ? 5 : 25
							}
						}
					}
				}}
			/>
			{/* <Table rows={data} columns={columns} /> */}

			<AlertDialog
				title={"Excluir oportunidade"}
				description={"Você tem certeza que deseja excluir esta oportunidade?"}
				confirmText={"Sim, excluir oportunidade"}
				open={openAlertDialog}
				setOpen={setOpenAlertDialog}
				handleClick={deleteAccount} />
		</>
	);
}

export default Opportunities;
