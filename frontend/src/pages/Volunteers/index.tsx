import { PageContainer } from '@/styles/styles';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { getCityState } from '@/utils/addressUtils';
import { TemaService } from '@/api/tema';
import { VolunteerService } from '@/api/volunteers';
import Loading from '@/components/Loading';
import DefaultDataGrid from '@/components/DataGrid';

function Volunteers() {
	const { isMobile } = TemaService.useGetIsMobile();
	const { data, isLoading } = VolunteerService.useGetVolunteersList();
    const navigate = useNavigate()


	const onView = (params: any) => {
		navigate('/voluntario/'+params.id);
	}


	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Oportunidade',
			minWidth: 200,
            flex: 0.3,
			align: "center",
			headerAlign: "center",
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
						: getCityState(params.row.address)}

				</>
			),
			minWidth: 100,
			headerName: 'Endereço',
			flex: 0.3,
			align: "center",
			headerAlign: "center"
		},
		{
			field: 'phone',
			headerName: 'Telefone',
			flex: 0.2,
			minWidth: 200,
			align: "center",
			headerAlign: "center",
		},
		{
			field: 'registrations',
			headerName: 'Total de oportunidades inscritas',
			flex: 0.2,
			minWidth: 200,
			align: "center",
			headerAlign: "center",
			renderCell: (params: GridRenderCellParams<any>) => (
				<>
					{params.row.opportunities.length}
				</>
			),
		},
	];

    const gridHeight = "50dvh";

	return (
		<PageContainer>
			<Typography mb={4} variant="h5" component="h2"> Voluntários </Typography>

			{isLoading ? (
				<Loading />
			) : (data == undefined || data.length === 0 &&
				<div>Nenhum voluntário cadastrado</div>
			)}

			{data !== undefined && data.length > 0 &&
				// <Table rows={data} columns={columns} />

			<Grid container>
				<Grid item sx={{ width: '100%' }}>
						<Box sx={{
							'.MuiDataGrid-root': {
								height: gridHeight
							},
						}}>
							<DefaultDataGrid
								enablePagination={true}
								canView={true}
								onView={onView}
								canInsert={true}
								toolbarProps={{
									showQuickFilter: true,
									showFilterButton: true,
									addNewRowLabel: "Adicionar Organização"
								}}
								datagridProps={{
									className: isMobile ? "vertical-grid" : "",
									columns: columns,
									density: isMobile ? "compact" : "standard",
									rows: data as any,
									rowCount: data?.length,
									disableVirtualization: true,
									disableRowSelectionOnClick: true,
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
						</Box>
				</Grid>
			</Grid>

			}
		</PageContainer>
	)
}

export default Volunteers