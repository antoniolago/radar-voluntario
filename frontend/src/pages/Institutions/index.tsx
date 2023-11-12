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
import { Skeleton } from '@mui/joy';
import { useState } from 'react';

function Institutions() {
    const [value, setValue] = useState(0);
    const { id } = useParams();

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
            align: "center",
            headerAlign: "center"
        }
    ];

    const navigate = useNavigate()
    const { isMobile } = TemaService.useGetIsMobile();
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
        setValue(newValue);
    };
    const { 
        data: allInstitutions, 
        isLoading: isLoadingAllInstitutions, 
        isError: isAllInstitutionsError
    } = InstitutionService.useGetInstitutions();
    const { 
        data: userInstitutions, 
        isLoading: isLoadingUserInstitutions,
        isError: isUserInstitutionsError
    } = InstitutionService.useGetUserInstitutions();
    var gridHeight = '60dvh';
    return (
        <Paper elevation={4} sx={{ p: 2 }}>
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
                <Tab label="Organizações" {...a11yProps(0)} />
                <Tab label="Minhas Organizações" {...a11yProps(1)} />
                {/* <Tab label="Conta" {...a11yProps(1)} /> */}
            </Tabs>
            <CustomTabPanel value={value} index={0}>
                <Grid container>
                    <Grid item sx={{ width: '100%' }}>
                        {allInstitutions != undefined &&
                            <Skeleton
                                loading={isLoadingAllInstitutions || isAllInstitutionsError}
                                height={gridHeight}
                                sx={{
                                    height: gridHeight, 
                                    '.MuiDataGrid-root': {
                                        height: gridHeight,
                                    },
                                }}
                                variant="rectangular">
                                {allInstitutions &&
                                    <DefaultDataGrid
                                        enablePagination={true}
                                        canView={true}
                                        onView={onView}
                                        toolbarProps={{ showQuickFilter: true, showFilterButton: true }}
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
                                }
                            </Skeleton>
                        }
                    </Grid>
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Grid container>
                    <Grid item sx={{ width: '100%' }}>
                        {userInstitutions != undefined &&
                            <Skeleton
                                loading={isLoadingUserInstitutions || isUserInstitutionsError}
                                height={gridHeight}
                                sx={{
                                    height: "70vh", 
                                    '.MuiDataGrid-root': {
                                        height: gridHeight,
                                    },
                                }}
                                variant="rectangular">
                                {userInstitutions &&
                                    <DefaultDataGrid
                                        enablePagination={true}
                                        canView={true}
                                        onView={onView}
                                        toolbarProps={{ showQuickFilter: true, showFilterButton: true }}
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
                                }
                            </Skeleton>
                        }
                    </Grid>
                </Grid>
            </CustomTabPanel>

        </Paper>
    )
}

export default Institutions;
