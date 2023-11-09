import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { Link, useNavigate } from "react-router-dom";
import { PageContainer } from "@/styles/styles";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DefaultDataGrid from "@/components/DataGrid";
import { TemaService } from "@/api/tema";
import { Box } from "@mui/joy";
import { OpportunityService } from "@/api/opportunity";
import { InstitutionService } from "@/api/institution";

const Opportunities = () => {
    const navigate = useNavigate()

	const [institutionId, setInstitutionId] = useState('0');

    const { data: institutionData } = InstitutionService.useGetInstitution();
	const { data } = OpportunityService.useGetOpportunityList(institutionId);
	const { mutateAsync: deleteOpportunity  } = OpportunityService.useDeleteOpportunity();

    useEffect(() => {
        if(institutionData != undefined && institutionData.length > 0){
            setInstitutionId(institutionData[0]!.id!);
        }
    }, [institutionData])

	const deleteAccount = async (id: string, callback: any) => {
		const response = await deleteOpportunity(id);
		callback(response);
	}

	const onEdit = (id: string) => {
		navigate("/edicao/oportunidade/" + id)
	}

	const onView = (id: string) => {
		const urlBase = window.location.origin;
		window.open(`${urlBase}/oportunidade/${id}`, '_blank');
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
		}
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
			
			<Box sx={{
				'.MuiDataGrid-root': {
					height: '75dvh'
				}
			}}>

				{
					data !== undefined && data.length > 0 ?

						<DefaultDataGrid
							enablePagination={true}
							canDelete={true}
							onDelete={deleteAccount}
							canUpdate={true}
							onEdit={onEdit}
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
							<div>Nenhuma oportunidade cadastrada</div>
						)}

			</Box >
		</PageContainer>

	);
}

export default Opportunities;
