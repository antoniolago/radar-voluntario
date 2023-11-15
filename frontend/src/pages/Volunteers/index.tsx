import { PageContainer } from '@/styles/styles';
import { Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import Table from '@/components/Table';
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { getCityState } from '@/utils/addressUtils';
import { TemaService } from '@/api/tema';
import { VolunteerService } from '@/api/volunteers';

function Volunteers() {
	const { isMobile } = TemaService.useGetIsMobile();
    const { data } = VolunteerService.useGetVolunteer();
    
	
	const renderActions = (params: any) => {
		return (
			<>
                <Button
                component={Link}
                to={"/voluntario/" + params.row.id}
                variant="outlined"
                color="primary"
                size="small"
            >
                Ver mais
            </Button>
			</>
		)
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
			field: 'phone',
			headerName: 'Telefone',
			// flex: 0.1,
			minWidth: 200,
			align: "center",
			headerAlign: "center",
		},
		{
			field: 'registrations',
			headerName: 'Total de oportunidades inscritas',
			// flex: 0.1,
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
    
	const mockedRows = [
		{ name: 'Voluntário 1', address: 'Cidade/UF', phone: "(51) 99600-0717", registrations: 1, id: 1 },
		{ name: 'Voluntário 2', address: 'Cidade/UF', phone: "(51) 99600-0717", registrations: null, id: 2 },
		{ name: 'Voluntário 4', address: 'Cidade/UF', phone: "(51) 99600-0717", registrations: 1, id: 4 },
		{ name: 'Voluntário 4', address: 'Cidade/UF', phone: "(51) 99600-0717", registrations: 1, id: 4 },
	];
	// const [data, setData] = useState<any>(mockedRows);

	
    return (
        <PageContainer>
            <Typography mb={4} variant="h5" component="h2"> Voluntários </Typography>
			{
				data.length > 0 ? 
				<Table rows={data} columns={columns} />
				:
				'Nenhum voluntário cadastrado'
			}
        </PageContainer>
    )
}

export default Volunteers