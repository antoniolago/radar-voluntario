import { PageContainer } from '@/styles/styles';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { Link, useParams } from "react-router-dom";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TemaService } from '@/api/tema';
import DefaultDataGrid from '@/components/DataGrid';
import { RegistrationService } from '@/api/registration';
import { getCityState } from '@/utils/addressUtils';
import { displayDateOnTable } from '@/utils/dateUtils';
import Loading from '@/components/Loading';

function Registrations() {

	const { data, isLoading } = RegistrationService.useGetRegistrationList();


	const { isMobile } = TemaService.useGetIsMobile();

	const onView = (data: any) => {
		const urlBase = window.location.origin;
		window.open(`${urlBase}/organizacao/${data.institution_id}/oportunidade/${data.id}`, '_blank');
	}

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Oportunidade',
			minWidth: 200,
			align: "center",
			flex: 0.3,
			headerAlign: "center",
		},
		{
			field: 'institution.name',
			headerName: 'Instituição',
			flex: 0.2,
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
			flex: 0.2,
			align: "center",
			headerAlign: "center"
		},
		{
			field: 'date',
			minWidth: 180,
			flex: 0.2,
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
			<Typography mb={4} variant="h5" component="h2"> Suas inscrições </Typography>

			<Box sx={{
				'.MuiDataGrid-root': {
					height: '75dvh'
				}
			}}>
				{isLoading ? (
					<Loading />
				) : (data == undefined || data.length === 0 &&
					<div>Você não se inscreveu como voluntário para nenhuma oportunidade</div>
					)
				}


				{data !== undefined && data.length > 0 &&

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
					/>}

			</Box >

		</PageContainer>
	)
}

export default Registrations