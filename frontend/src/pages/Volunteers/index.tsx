import BackButton from '@/components/BackButton';
import { PageContainer } from '@/styles/styles';
import { Button, IconButton, Typography } from '@mui/material';
import { Link, useParams } from "react-router-dom";
import Table from '@/components/Table';
import { useState } from 'react';

function Volunteers() {
    
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

	const columns = [
		{ field: 'name', headerName: 'Nome', flex: 1 },
		{ field: 'address', headerName: 'Endereço', flex: 1 },
		{ field: 'phone', headerName: 'Telefone', flex: 1 },
		{ field: 'volunteers', headerName: 'Inscrições em atividades', flex: 1 },
		{
			field: 'id',
			headerName: 'Ações',
			sortable: false,
			width: 180,
			renderCell: renderActions
		},
	];

    
	const mockedRows = [
		{ name: 'Voluntário 1', address: 'Cidade/UF', phone: "(51) 99600-0717", volunteers: 1, id: 1 },
		{ name: 'Voluntário 2', address: 'Cidade/UF', phone: "(51) 99600-0717", volunteers: null, id: 2 },
		{ name: 'Voluntário 4', address: 'Cidade/UF', phone: "(51) 99600-0717", volunteers: 1, id: 4 },
		{ name: 'Voluntário 4', address: 'Cidade/UF', phone: "(51) 99600-0717", volunteers: 1, id: 4 },
	];
	const [data, setData] = useState<any>(mockedRows);

    return (
        <PageContainer>
            <BackButton redirectTo='/' />
            <Typography mb={4} variant="h5" component="h2"> Voluntários </Typography>
			<Table rows={data} columns={columns} />
        </PageContainer>
    )
}

export default Volunteers