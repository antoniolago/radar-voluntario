import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Table from "../Table";
import { ContainerFilter } from "./styles";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const OpportunitiesList = (props: { institutionId?: number }) => {

    const [search, setSearch] = useState('');
    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const clearFilter = () => {
        setSearch('');
        setSelectedInstitution('');
        setSelectedCity('');
    }

    const goToOportunity = (id: any) => {
        alert(id)
    }

    const renderDetailsButton = (params: any) => {
        return (
            <Button
                component={Link}
                to={"oportunidade/" + params.row.id}
                variant="outlined"
                color="primary"
                size="small"
            >
                Ver mais
            </Button>
        )
    }

    const columns = [
        { field: 'title', headerName: 'Oportunidade' },
        { field: 'address', headerName: 'Endereço' },
        { field: 'date', headerName: 'Data' },
        {
            field: 'id',
            headerName: 'Ações',
            sortable: false,
            width: 180,
            renderCell: renderDetailsButton
        },
    ];

    const mockedRows = [
        { title: 'Oportunidade nome 1', address: 'Cidade/UF', date: "10/12/2023", id: 1 },
        { title: 'Oportunidade nome 2', address: 'Cidade/UF', date: "10/11/2023", id: 2 },
        { title: 'Oportunidade nome 3', address: 'Cidade/UF', date: "23/11/2023", id: 3 },
        { title: 'Oportunidade nome 4', address: 'Cidade/UF', date: "26/11/2023", id: 4 },
    ];
    const [data, setData] = useState<any>(mockedRows);

    const institutionList = [
        { value: '1', label: 'Organização 1' },
        { value: '2', label: 'Organização 2' },
        { value: '3', label: 'Organização 3' },
    ]

    const cityList = [
        { value: '1', label: 'Cidade 1' },
        { value: '2', label: 'Cidade 2' },
        { value: '3', label: 'Cidade 3' },
    ]

    const handleSearch = (event: any) => {
        let value = event.target.value;
        setSearch(event.target.value);

        const fields = columns.map((column) => column.field);

        let test = data.filter((item: any) => {
            return fields.some(chave => {
                if (typeof item[chave] === 'string' && item[chave].toLowerCase().includes(value.toLowerCase())) {
                    console.log(true, item[chave]);
                    return true;
                }
                return false;
            });
        })
    }


    return (
        <>
            <Table rows={data} columns={columns} />
        </>

    );
}
export default OpportunitiesList;
