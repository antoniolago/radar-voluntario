import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Modal, ModalClose, ModalDialog, Skeleton } from "@mui/joy";
import { OpportunityService } from "@/api/opportunity";
import DefaultDataGrid from "../DataGrid";
import { TemaService } from "@/api/tema";
import OpportunityEdit from "@/pages/OpportunityEdit";
import { getCityState } from "@/utils/addressUtils";
import { displayDateOnTable } from "@/utils/dateUtils";

const OpportunitiesList = (props: { institutionId?: string, isUserOwner?: boolean }) => {
    const [openAddActivityModal, setOpenAddActivityModal] = useState(false);
	const { mutateAsync: deleteOpportunity  } = OpportunityService.useDeleteOpportunity();
    const [opportunityId, setOpportunityId] = useState<string>("0");

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

    const onDelete = async (id: string, callback: any) => {
		const response = await deleteOpportunity(id);
		callback(response);
	}
	const onView = (data: any) => {
		const urlBase = window.location.origin;
		window.open(`${urlBase}/organizacao/${data.institution_id}/oportunidade/${data.id}`, '_blank');
	}

	const onEdit = (id: string) => {
        setOpenAddActivityModal(true);
        setOpportunityId(id)
	}

    useEffect(() => {
        if(!openAddActivityModal){
            setOpportunityId("0")
        }
    }, [openAddActivityModal])

    
    
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Oportunidade',
            minWidth: 200,
            flex: 0.3
        },
        {
            field: 'address',
            headerName: 'Endereço',
            minWidth: 200,
            flex: 0.2,
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
        },
        {
            field: 'date',
            headerName: 'Data',
            minWidth: 200,
            flex: 0.2,
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
    const { isMobile } = TemaService.useGetIsMobile();
    const { data, isLoading, isError, isRefetching } =  props.isUserOwner ?
                     OpportunityService.useGetOpportunityList(props.institutionId!) : 
                     OpportunityService.useGetOpportunityPublishedList(props.institutionId!)
    const gridHeight = "50dvh";
    return (
        <>
            <Skeleton
                loading={isLoading || isError || isRefetching}
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
                            canView={true}
                            canUpdate={true}
                            canDelete={true}
                            onView={onView}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            toolbarProps={{
                                showQuickFilter: true,
                                showFilterButton: true,
                                addNewRowLabel: "Adicionar Atividade"
                            }}
                            onInsert={() => setOpenAddActivityModal(true)}
                            canInsert={props.isUserOwner == true}
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
                        <OpportunityEdit opportunityId={opportunityId} institutionId={props.institutionId!} setShowModal={() => setOpenAddActivityModal(false)} />
                    </ModalDialog>
                </Modal>
            </Skeleton>

        </>

    );
}
export default OpportunitiesList;
