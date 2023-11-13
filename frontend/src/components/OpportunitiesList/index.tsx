import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Table from "../Table";
import { ContainerFilter } from "./styles";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { GridColDef } from "@mui/x-data-grid";
import { Modal, ModalClose, ModalDialog, Skeleton } from "@mui/joy";
import { OpportunityService } from "@/api/opportunity";
import DefaultDataGrid from "../DataGrid";
import { TemaService } from "@/api/tema";
import OpportunityEdit from "@/pages/OpportunityEdit";

const OpportunitiesList = (props: { institutionId?: number }) => {
    const { id } = useParams();
    const [openAddActivityModal, setOpenAddActivityModal] = useState(false);
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

    const columns: GridColDef[] = [
        {
            field: 'title',
            headerName: 'Oportunidade',
            minWidth: 200,
            flex: 0.3
        },
        {
            field: 'address',
            headerName: 'Endereço',
            minWidth: 200,
            flex: 0.2
        },
        {
            field: 'date',
            headerName: 'Data',
            minWidth: 200,
            flex: 0.2
        },
        {
            field: 'id',
            headerName: 'Ações',
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            minWidth: 150,
            flex: 0.3,
            renderCell: renderDetailsButton
        },
    ];

    const mockedRows = [
        { title: 'Oportunidade nome 1', address: 'Cidade/UF', date: "10/12/2023", id: 1 },
        { title: 'Oportunidade nome 2', address: 'Cidade/UF', date: "10/11/2023", id: 2 },
        { title: 'Oportunidade nome 3', address: 'Cidade/UF', date: "23/11/2023", id: 3 },
        { title: 'Oportunidade nome 4', address: 'Cidade/UF', date: "26/11/2023", id: 4 },
    ];
    const isMobile = TemaService.useGetIsMobile();
    const { data, isLoading, isError } = OpportunityService.useGetOpportunityList(id!);
    const gridHeight = "50dvh";
    return (
        <>
            <Skeleton
                loading={isLoading || isError}
                height={gridHeight}
                variant="rectangular">
                {data != undefined &&
                    <Box sx={{
                        '.MuiDataGrid-root': {
                            height: gridHeight
                        },
                    }}>
                        <DefaultDataGrid
                            enablePagination={true}
                            // canView={true}
                            // onView={onView}
                            toolbarProps={{
                                showQuickFilter: true,
                                showFilterButton: true,
                                addNewRowLabel: "Adicionar Atividade"
                            }}
                            onInsert={() => setOpenAddActivityModal(true)}
                            canInsert={true}
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
                    </Box>
                }
                <Modal
                    open={openAddActivityModal}
                    onClose={() => setOpenAddActivityModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <ModalDialog sx={{ overflowY: 'auto' }}>
                        <ModalClose />
                        <Typography> Nova Oportunidade:</Typography>
                        <br />
                        <OpportunityEdit />
                    </ModalDialog>
                </Modal>
            </Skeleton>

        </>

    );
}
export default OpportunitiesList;
