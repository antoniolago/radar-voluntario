import { PageContainer } from '@/styles/styles';
import { Box, Breadcrumbs, Grid, Paper, Typography, Link } from '@mui/material';
import {Skeleton } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { getCityState } from '@/utils/addressUtils';
import { TemaService } from '@/api/tema';
import { VolunteerService } from '@/api/volunteers';
import Loading from '@/components/Loading';
import DefaultDataGrid from '@/components/DataGrid';

function VolunteersOpportunity() {

    const { idInstitution, idOpportunity } = useParams();

	const { isMobile } = TemaService.useGetIsMobile();
	const { data, isLoading } = VolunteerService.useGetVolunteersListByOpportunity(idOpportunity!);
    const navigate = useNavigate()

	const onView = (params: any) => {
		navigate('/voluntario/'+params.user.id);
	}

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Voluntário',
			minWidth: 200,
            flex: 0.3,
			align: "center",
			headerAlign: "center",
			renderCell: (params: GridRenderCellParams<any>) => (
                params.row.user.name
            )
            },
		{
			field: 'email',
			minWidth: 100,
			headerName: 'Email',
			flex: 0.3,
			align: "center",
			headerAlign: "center",
            renderCell: (params: GridRenderCellParams<any>) => (
                params.row.user.email
            )
		},
		{
			field: 'phone',
			headerName: 'Telefone',
			flex: 0.2,
			minWidth: 200,
			align: "center",
			headerAlign: "center",
            renderCell: (params: GridRenderCellParams<any>) => (
                params.row.user.phone
            )
		},
	];

    const gridHeight = "50dvh";
	return (
        <Paper elevation={3} sx={{ p: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
            <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate("/organizacoes")}>
                Organizações
            </Link>
            <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate("/organizacao/"+data?.institution.id)}>
                {data.institution?.name}
            </Link>

            <Typography color="text.primary">{data.name}</Typography>
        </Breadcrumbs>
        <Typography
                sx={{ textAlign: "center" }}
                m={1}
                variant="h5"
                component="h2">
                {data.name}
            </Typography>
        <Skeleton
        height={gridHeight}
        loading={isLoading}
        variant="rectangular">
        {data != undefined && data.users != undefined && data.users.length > 0 ?
            <Box sx={{
                '.MuiDataGrid-root': {
                    height: gridHeight
                },
            }}>

                <DefaultDataGrid
                    enablePagination={true}
                    canView={true}
                    onView={onView}
                    tituloDeleteDialog="Confirmação de exclusão"
                    textoDeleteDialog="Você tem certeza que deseja deletar esta atividade permanentemente?                           "
                    toolbarProps={{
                        showQuickFilter: true,
                        showFilterButton: true,
                        addNewRowLabel: "Nova Atividade"
                    }}
                    datagridProps={{
                        className: isMobile ? "vertical-grid" : "",
                        columns: columns,
                        density: isMobile ? "compact" : "standard",
                        rows: data.users as any,
                        rowCount: data?.users.length,
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
        : "Nenhum voluntário inscrito para esta oportunidade"    
    }
      
    </Skeleton>

    </Paper>

   
	)
}

export default VolunteersOpportunity