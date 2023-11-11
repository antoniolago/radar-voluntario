import { PageContainer } from '@/styles/styles';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { Link, useParams } from "react-router-dom";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TemaService } from '@/api/tema';
import DefaultDataGrid from '@/components/DataGrid';
import { RegistrationService } from '@/api/registration';
import { getCityState } from '@/utils/addressUtils';
import { displayDateOnTable } from '@/utils/dateUtils';

function Registrations() {

    const { data } = RegistrationService.useGetRegistrationList();

	const renderActions = (params: any) => {
		return (
			<>
				<Button
					component={Link}
					to={"/oportunidade/" + params.row.id}
					variant="outlined"
					color="primary"
					size="small"
				>
					Ver mais
				</Button>
			</>
		)
	}

	const { isMobile } = TemaService.useGetIsMobile();

	const onView = (id: string) => {
		const urlBase = window.location.origin;
		window.open(`${urlBase}/oportunidade/${id}`, '_blank');
	}

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Oportunidade',
			minWidth: 200,
			align: "center",
			headerAlign: "center",
		},
		{
			field: 'institution.name',
			headerName: 'Instituição',
			// flex: 0.1,
			minWidth: 200,
			align: "center",
			headerAlign: "center",
			renderCell: (params: GridRenderCellParams<any>) => (
				params.row.institution.name
			)
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
						displayDateOnTable(params.row.start_date, params.row.start_end)
					}
				</>
			),
			headerName: 'Data',
		}
	];

	return (
		<PageContainer>
			<Typography mb={4} variant="h5" component="h2"> Suas inscrições em oportunidades </Typography>
			
			<Box sx={{
				'.MuiDataGrid-root': {
					height: '75dvh'
				}
			}}>

				{
					data !== undefined && data.length > 0 ?

						<DefaultDataGrid
							enablePagination={true}
							canView={true}
							onView={onView}
							toolbarProps={{ showQuickFilter: true, showFilterButton: true }}
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
						: (
							<div>Você não se inscreveu como voluntário para nenhuma oportunidade</div>
						)}

			</Box >

		</PageContainer>
	)
}

export default Registrations