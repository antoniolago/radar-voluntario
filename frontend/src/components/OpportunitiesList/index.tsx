import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import Table from "../Table";
import { ContainerFilter } from "./styles";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";

const OpportunitiesList = () => {

const  [search, setSearch] =  useState('');
const  [selectedInstitution, setSelectedInstitution] =  useState('');
const  [selectedCity, setSelectedCity] =  useState('');

useEffect(() => {
    //filter data
}, [search, selectedCity, selectedInstitution]);

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
            onClick={() => goToOportunity(params.row.id)}
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
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 180,
        renderCell: renderDetailsButton
    },
];

const mockedRows = [
    { title: 'Snow', address: 'Jon', date: "10/12/2023", id: 1 },
    { title: 'Snow', address: 'Jon', date: "10/11/2023", id: 2 },
    { title: 'Snow', address: 'Jon', date: "23/11/2023", id: 3 },
    { title: 'Snow', address: 'Jon', date: "26/11/2023", id: 4 },
];

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
                    id="outlined-basic" 
                    label="Buscar"
                    variant="outlined"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    />
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Organização</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedInstitution}
                        label="Organização"
                        onChange={(e) => {
                            setSelectedInstitution(e.target.value);
                        }}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Cidade</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedCity}
                        label="Cidade"
                        onChange={(e) => {
                            setSelectedCity(e.target.value);
                        }}                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    <IconButton aria-label="delete" onClick={clearFilter}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </ContainerFilter>

            <Table rows={mockedRows} columns={columns} />
        </>

    );
}
export default OpportunitiesList;
