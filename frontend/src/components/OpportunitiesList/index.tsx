import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Table from "../Table";
import { ContainerFilter } from "./styles";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; 

const OpportunitiesList = () => {

const  [search, setSearch] =  useState('');
const  [selectedInstitution, setSelectedInstitution] =  useState('');
const  [selectedCity, setSelectedCity] =  useState('');

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
            to={"oportunidade/"+params.row.id}
            variant="outlined"
            color="primary"
            size="small"
        >
            Ver mais
        </Button>
    )
}

const columns = [
    { field: 'title', headerName: 'Oportunidade', flex: 1 },
    { field: 'address', headerName: 'Endereço', flex: 1 },
    { field: 'date', headerName: 'Data', flex: 1 },
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
const  [data, setData] = useState<any>(mockedRows);

const institutionList = [
    { value: '1', label: 'Organização 1'},
    { value: '2', label: 'Organização 2'},
    { value: '3', label: 'Organização 3'},
]

const cityList = [
    { value: '1', label: 'Cidade 1'},
    { value: '2', label: 'Cidade 2'},
    { value: '3', label: 'Cidade 3'},
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
            <div style={{ margin: "3rem 0 2rem 0", textAlign: 'center' }}>
                <Typography variant="h5" component="h2"> Busque por oportunidades</Typography>
            </div>
            <ContainerFilter
                noValidate
                autoComplete="off"
            >
                <TextField 
                    value={search} 
                    label="Buscar"
                    variant="outlined"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    />
                <FormControl >
                    <InputLabel>Organização</InputLabel>
                    <Select
                        value={selectedInstitution}
                        label="Organização"
                        onChange={(e) => {
                            setSelectedInstitution(e.target.value);
                        }}
                    >
                        {institutionList.map((institution) => 
                            <MenuItem value={institution.value}>{institution.label}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl >
                    <InputLabel>Cidade</InputLabel>
                    <Select
                        value={selectedCity}
                        label="Cidade"
                        onChange={(e) => {
                            setSelectedCity(e.target.value);
                        }}                   
                        >
                            {cityList.map((city) => 
                            <MenuItem value={city.value}>{city.label}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <div>
                    <IconButton aria-label="delete" onClick={clearFilter}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </ContainerFilter>

            <Table rows={data} columns={columns} />
        </>

    );
}
export default OpportunitiesList;
