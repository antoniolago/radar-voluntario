import OportunitiesList from '@/components/OpportunitiesList';
import { Box, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import BackButton from '@/components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer } from '@/styles/styles';
import facebookLogo from '../../assets/facebook.svg';
import instagramLogo from '../../assets/instagram.svg';
import DefaultDataGrid from '@/components/DataGrid';
import { TemaService } from '@/api/tema';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { InstitutionService } from '@/api/institution';
import { Modal, ModalClose, ModalDialog, Skeleton, Tooltip } from '@mui/joy';
import { useEffect, useState } from 'react';
import NewInstitutionForm from '@/components/NewInstitutionForm';
import { AuthService } from '@/api/auth';

function Institutions() {
    const [value, setValue] = useState(0);
    const [openAddOrganizationModal, setOpenAddOrganizationModal] = useState(false);

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

    const { data: curUser } = AuthService.useGetUser();
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Nome',
            flex: 0.2,
            minWidth: 200,
            align: "center",
            headerAlign: "center"
        },
        {
            field: 'about',
            headerName: 'Sobre',
            flex: 0.4,
            minWidth: 200,
            align: "left",
            headerAlign: "left"
        },
        {
            field: 'opportunities',
            headerName: 'Oportunidades',
            flex: 0.1,
            minWidth: 200,
            align: "left",
            headerAlign: "left",
            renderCell: (params: GridRenderCellParams<any>) => (
                <>
                    {
                        params.row.opportunities.length
                    }
                </>
            ),
            sortComparator: (opportunity1, opportunity2) => (opportunity1.length - opportunity2.length)
        }
    ];

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        bgcolor: 'background.paper',
        border: '1px solid #4a4a4a',
        borderRadius: '3px',
        boxShadow: 24,
        p: 4,
        height: '70dvh',
        overflowY: 'auto'
    };
    const valuesPathname: { [key: string]: string } = {
        "0": "/organizacoes",
        "1": "/organizacoes/minhas"
    }
    const pathnameValues: { [key: string]: number } = {
        "/organizacoes": 0,
        "/organizacoes/minhas": 1
    }
    const navigate = useNavigate()
    const { isMobile } = TemaService.useGetIsMobile();
    useEffect(() => {
        setValue(pathnameValues[location.pathname]);
    }, [location.pathname])
    const deleteOrganization = () => {

    };
    const onView = (e: any) => {
        console.log(e)
        navigate(`/organizacao/${e.id}`)
    }
    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        const pathnameValues: { [key: string]: string } = {
            "0": "/organizacoes",
            "1": "/organizacoes/minhas"
        }
        navigate(pathnameValues[newValue.toString()]);
    };
    const {
        data: allInstitutions,
        isLoading: isLoadingAllInstitutions,
        isError: isAllInstitutionsError,
        isRefetching: isRefetchingAllInstitutions
    } = InstitutionService.useGetInstitutions();
    const {
        data: userInstitutions,
        isLoading: isLoadingUserInstitutions,
        isError: isUserInstitutionsError,
        isRefetching: isRefetchingInstitutions,
    } = InstitutionService.useGetUserInstitutions();

    var gridHeight = '65dvh';
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
                <Tab label="Organizações" {...a11yProps(0)}
                // onClick={() => {
                // 	setValue(0);
                // 	navigate(valuesPathname["0"])
                // }}
                />
                {curUser != undefined && <Tab label="Minhas Organizações" {...a11yProps(1)} />}
                {/* <Tab label="Conta" {...a11yProps(1)} /> */}
            </Tabs>
            <CustomTabPanel value={value} index={0}>
                <Grid container>
                    <Grid item sx={{ width: '100%' }}>
                        {allInstitutions != undefined &&
                            <Skeleton
                                loading={isLoadingAllInstitutions || isAllInstitutionsError || isRefetchingInstitutions || isRefetchingAllInstitutions}
                                height={gridHeight}
                                sx={{
                                    height: gridHeight,
                                    '.MuiDataGrid-root': {
                                        height: gridHeight,
                                    },
                                }}
                                variant="rectangular">
                                {allInstitutions &&

                                    <Box sx={{
                                        '.MuiDataGrid-root': {
                                            height: gridHeight
                                        },
                                    }}>
                                        <DefaultDataGrid
                                            enablePagination={true}
                                            canView={true}
                                            onView={onView}
                                            onInsert={() => setOpenAddOrganizationModal(true)}
                                            canInsert={true}
                                            toolbarProps={{ showQuickFilter: true, showFilterButton: true, addNewRowLabel: "Nova Organização" }}
                                            datagridProps={{
                                                className: isMobile ? "vertical-grid" : "",
                                                columns: columns,
                                                density: isMobile ? "compact" : "standard",
                                                rows: allInstitutions as any,
                                                rowCount: allInstitutions?.length,
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
                            </Skeleton>
                        }
                    </Grid>
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Grid container>
                    <Grid item sx={{ width: '100%' }}>
                        {/* <Skeleton
                            loading={isLoadingUserInstitutions || isUserInstitutionsError}
                            height={gridHeight}
                            sx={{
                                height: gridHeight,
                                '.MuiDataGrid-root': {
                                    height: gridHeight,
                                },
                            }}
                            variant="rectangular"> */}
                        {userInstitutions != undefined &&

                            <Box sx={{
                                '.MuiDataGrid-root': {
                                    height: gridHeight
                                },
                            }}>
                                <DefaultDataGrid
                                    enablePagination={true}
                                    canView={true}
                                    onView={onView}
                                    onInsert={() => setOpenAddOrganizationModal(true)}
                                    canInsert={true}
                                    toolbarProps={{
                                        showQuickFilter: true,
                                        showFilterButton: true,
                                        addNewRowLabel: "Nova Organização"
                                    }}
                                    datagridProps={{
                                        className: isMobile ? "vertical-grid" : "",
                                        columns: columns,
                                        density: isMobile ? "compact" : "standard",
                                        rows: userInstitutions as any,
                                        rowCount: userInstitutions?.length,
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
                            open={openAddOrganizationModal}
                            onClose={() => setOpenAddOrganizationModal(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <ModalDialog sx={{ overflowY: 'auto' }}>
                                <ModalClose />
                                <Typography> Nova Organização:</Typography>
                                <br />
                                <NewInstitutionForm setShowModal={setOpenAddOrganizationModal} />
                            </ModalDialog>
                        </Modal>
                        {/* </Skeleton> */}
                    </Grid>
                </Grid>
            </CustomTabPanel>

        </Paper>
    )
}

export default Institutions;
