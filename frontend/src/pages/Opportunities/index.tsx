import { Button, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PageContainer } from "@/styles/styles";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DefaultDataGrid from "@/components/DataGrid";
import { TemaService } from "@/api/tema";
import { OpportunityService } from "@/api/opportunity";
import { InstitutionService } from "@/api/institution";
import { displayDateOnTable } from "@/utils/dateUtils";
import { getCityState } from "@/utils/addressUtils";
import { Box } from "@mui/joy";
import { AuthService } from "@/api/auth";
import { RegistrationService } from "@/api/registration";
import { toast } from "sonner";

const Opportunities = () => {
	const navigate = useNavigate()

	const [value, setValue] = useState(0);
	const [institutionId, setInstitutionId] = useState('0');

	const location = useLocation()
	// const { data: institutionData } = InstitutionService.useGetInstitution();
	const { data } = OpportunityService.useGetOpportunityList(institutionId);
	const { data: volunteeredOpps } = RegistrationService.useGetRegistrationList();
	const { mutateAsync: deleteOpportunity } = OpportunityService.useDeleteOpportunity();

	// useEffect(() => {
	//     if(institutionData != undefined && institutionData.length > 0){
	//         setInstitutionId(institutionData[0]!.id!);
	//     }
	// }, [institutionData])
	useEffect(() => {
		const pathnameValues: { [key: string]: number } = {
			"/atividades": 0,
			"/atividades/inscrito": 1,
			// "/atividades/minhas": 2
		}
		setValue(pathnameValues[location.pathname]);
	}, [location.pathname])
	const deleteAccount = async (id: string, callback: any) => {
		const response = await deleteOpportunity(id);
		callback(response);
	}

	const onEdit = (id: string) => {
		navigate("/edicao/oportunidade/" + id)
	}

	const onView = (data: any) => {
		const urlBase = window.location.origin;
		window.open(`${urlBase}/organizacao/${data.institution_id}/oportunidade/${data.id}`, '_blank');
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
			renderCell: (params: GridRenderCellParams<any>) => (
				<>
					{isMobile &&
						<Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
							Quando:
						</Typography>
					}
					{
						displayDateOnTable(params.row.start_date, params.row.end_date)
					}
				</>
			),
			headerName: 'Data',
			// flex: 0.2
		},
		{
			field: 'vacancies',
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
					{params.row.users.length} / {params.row.vacancies}
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

	interface TabPanelProps {
		children?: React.ReactNode;
		index: number;
		value: number;
	}
	function CustomTabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				style={{ padding: "0px 13px" }}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box >
						{children}
					</Box>
				)}
			</div>
		);
	}
	const { isMobile } = TemaService.useGetIsMobile();

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		const pathnameValues: { [key: string]: string } = {
			"0": "/atividades",
			"1": "/atividades/inscrito"
		}
		navigate(pathnameValues[newValue.toString()]);
	};
	const { data: curUser } = AuthService.useGetUser();
	return (
		<Paper elevation={4}>
			{/* <Grid container spacing={1}>
                <Grid item xs={4} md={2}>
                    <BackButton redirectTo='/' />
                </Grid>
                <Grid item xs>
                    <Typography sx={{ textAlign: "left" }} variant="h5" component="h2">
                        Organizações
                    </Typography>
                </Grid>
            </Grid> */}

			<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
				<Tab label="Atividades" {...a11yProps(0)} />
				<Tab disabled={curUser == undefined} label="atividades inscrito" {...a11yProps(1)} />
				{/* <Tab label="Conta" {...a11yProps(1)} /> */}
			</Tabs>
			<CustomTabPanel value={value} index={0}>

				<Box sx={{
					'.MuiDataGrid-root': {
						height: '75dvh'
					}
				}}>

					<DefaultDataGrid
						enablePagination={true}
						canDelete={true}
						onDelete={deleteAccount}
						canUpdate={true}
						onEdit={onEdit}
						canView={true}
						onView={onView}
						canInsert={true}
						onInsert={() => {
							toast.message("Escolha uma organização para adicionar a nova atividade")
							navigate("/organizacoes/minhas");
						}}
						toolbarProps={{ showQuickFilter: true, showFilterButton: true, addNewRowLabel: "Nova atividade" }}
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

				</Box >
			</CustomTabPanel>

			<CustomTabPanel value={value} index={1}>

				<Box sx={{
					'.MuiDataGrid-root': {
						height: '75dvh'
					}
				}}>

					<DefaultDataGrid
						enablePagination={true}
						canDelete={true}
						onDelete={deleteAccount}
						canUpdate={true}
						onEdit={onEdit}
						canView={true}
						onView={onView}
						canInsert={true}
						onInsert={() => navigate("/organizacoes/minhas")}
						toolbarProps={{ showQuickFilter: true, showFilterButton: true, addNewRowLabel: "Nova atividade" }}
						datagridProps={{
							className: isMobile ? "vertical-grid" : "",
							columns: columns,
							density: isMobile ? "compact" : "standard",
							rows: volunteeredOpps as any,
							rowCount: volunteeredOpps?.length,
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

				</Box >
			</CustomTabPanel>
		</Paper>

	);
}

export default Opportunities;