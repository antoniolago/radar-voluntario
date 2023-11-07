import BackButton from '@/components/BackButton';
import { PageContainer } from '@/styles/styles';
import { Button, IconButton, Typography } from '@mui/material';
import { Link, useParams } from "react-router-dom";
import Table from '@/components/Table';
import { useState } from 'react';

function Registrations() {
    const { id } = useParams();

    
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

	const columns = [
		{ field: 'opportunity', headerName: 'Oportunidade' },
		{ field: 'institution', headerName: 'Organização' },
		{ field: 'address', headerName: 'Endereço' },
		{ field: 'date', headerName: 'Data' },
		{
			field: 'id',
			headerName: 'Ações',
			sortable: false,
			width: 180,
			renderCell: renderActions
		},
	];

    
	const mockedRows = [
		{ opportunity: 'Voluntário 1', institution: 'Instituicao 1', address: 'Cidade/UF', date: "2023-10-10", id: 1 },
		{ opportunity: 'Voluntário 2', institution: 'Instituicao 2', address: 'Cidade/UF', date: "2023-10-10", id: 2 },
		{ opportunity: 'Voluntário 4', institution: 'Instituicao 4', address: 'Cidade/UF', date: "2023-10-10", id: 4 },
		{ opportunity: 'Voluntário 4', institution: 'Instituicao 4', address: 'Cidade/UF', date: "2023-10-10", id: 4 },
	];
	const [data, setData] = useState<any>(mockedRows);

    return (
        <PageContainer>
            <Typography mb={4} variant="h5" component="h2"> Oportunidades Inscritas </Typography>
			<Table rows={data} columns={columns} />
        </PageContainer>
    )
}

export default Registrations