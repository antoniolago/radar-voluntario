import { ContainerFilter } from "@/components/OpportunitiesList/styles";
import Table from "@/components/Table";
import { Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
import { Box, Grid } from "@mui/joy";
import { OpportunityService } from "@/api/opportunity";
import { InstitutionService } from "@/api/institution";

const Opportunities = () => {
	const [openAlertDialog, setOpenAlertDialog] = useState(false);
	const [institutionId, setInstitutionId] = useState('0');

    const { data: institutionData } = InstitutionService.useGetInstitution();

	const { data } = OpportunityService.useGetOpportunityList(institutionId);

    useEffect(() => {
        if(institutionData != undefined && institutionData.length > 0){
            setInstitutionId(institutionData[0]!.id!);
        }
    }, [institutionData])

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
			field: 'name',
			headerName: 'Oportunidade',
			// flex: 0.1,
			minWidth: 200,
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

					{params.row.online ?
						'Online'
						: 'Endereço'}

				</>
			),
			minWidth: 100,
			headerName: 'Endereço',
			// flex: 0.2,
			align: "center",
			headerAlign: "center"
		},
		{
			field: 'date',
			minWidth: 180,
			renderCell: (params: GridRenderCellParams<any>) => (
				<>
					{isMobile &&
						<Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
							Quando:
						</Typography>
					}
					{
						params.formattedValue != undefined &&
						params.formattedValue.split(",")[0]
					}
				</>
			),
			headerName: 'Data',
			// flex: 0.2
		},
		{
			field: 'volunteers',
			minWidth: 100,
			align: 'center',
			// renderHeader(params: any) {
			// 	return (params.value);
			// },
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
			// flex: 0.2
		},
		{
			field: 'published',
			minWidth: 100,
			headerName: 'Publicado',
			// flex: 0.3,
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


	return (
		<PageContainer>

			<Box sx={{ display: 'flex' }}>
				<Typography variant="h5" sx={{ marginRight: '10px' }}>Oportunidades </Typography>
				<Button
					component={Link}
					to="/edicao/oportunidade"
					variant="outlined"
					color="primary"
					sx={{ height: '30px' }}
				>
					+ Adicionar
				</Button>
			</Box>
			{/* <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}> */}
			{/* <Grid container spacing={1}>
				<Grid xs={isMobile ? 8 : 6} >
					<TextField
						// value={search} 
						fullWidth
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
				</Grid>
				<Grid xs={isMobile ? 4 : 6} sx={{ textAlign: 'right' }}>

				</Grid>
			</Grid> */}

			{/* </div > */}
			<Box sx={{
				'.MuiDataGrid-root': {
					height: '75dvh'
				}
			}}>

				{
					data !== undefined && data.length > 0 ?

						<DefaultDataGrid
							enablePagination={true}
							toolbarProps={{ showQuickFilter: true, showFilterButton: true }}
							datagridProps={{
								className: isMobile ? "vertical-grid" : "",
								columns: columns,
								density: isMobile ? "compact" : "standard",
								rows: data as any,
								rowCount: data?.length,
								disableVirtualization: true,
								// checkboxSelection: true,
								disableRowSelectionOnClick: true,
								// disableColumnMenu: isMobile ? true : false,
								pageSizeOptions: isMobile ? [25, 50, 100] : [25, 50, 100],
								initialState: {
									pagination: {
										paginationModel: {
											pageSize: isMobile ? 5 : 25
										}
									}
								}
							}}
						/>
						: (
							<div>Nenhuma oportunidade cadastrada</div>
						)}

			</Box >
			{/* <Table rows={data} columns={columns} /> */}

			<AlertDialog
				title={"Excluir oportunidade"}
				description={"Você tem certeza que deseja excluir esta oportunidade?"}
				confirmText={"Sim, excluir oportunidade"}
				open={openAlertDialog}
				setOpen={setOpenAlertDialog}
				handleClick={deleteAccount} />
		</PageContainer>

	);
}

export default Opportunities;
