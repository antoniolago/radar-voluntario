import BackButton from '@/components/BackButton';
import { PageContainer } from '@/styles/styles';
import { Grid, Typography } from '@mui/material';
import { ContactDetails, VolunteerImage } from './styles';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import facebookLogo from '../../assets/facebook.svg';
import instagramLogo from '../../assets/instagram.svg';
import { VolunteerService } from '@/api/volunteers';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '@/components/Loading';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { TemaService } from '@/api/tema';
import { displayDateOnTable } from '@/utils/dateUtils';
import DefaultDataGrid from '@/components/DataGrid';

function VolunteerDetails() {
    const { id } = useParams();
    const { data: volunteer, isLoading } = VolunteerService.useGetVolunteer(id ?? "");
    const { data: opportunities, isLoading: isLoadingTable } = VolunteerService.useGetVolunteersOpportunities(id ?? "");
    const { isMobile } = TemaService.useGetIsMobile();
    const navigate = useNavigate()

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Oportunidade',
            minWidth: 200,
            align: "center",
            flex: 0.3,
            headerAlign: "center",
        },
        {
            field: 'institution',
            headerName: 'Instituição',
            flex: 0.2,
            minWidth: 200,
            align: "center",
            headerAlign: "center",
            renderCell: (params: GridRenderCellParams<any>) => (
                params.row.institution.name
            )
        },
        {
            field: 'date',
            minWidth: 180,
            flex: 0.2,
            renderCell: (params: GridRenderCellParams<any>) => (
                <>
                    {isMobile &&
                        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                            Quando:
                        </Typography>
                    }
                    {
                        displayDateOnTable(params.row.start_date, params.row.start_end)
                    }
                </>
            ),
            headerName: 'Data',
        }
    ];

    const onView = (data: any) => {
        navigate(`/organizacao/${data.institution_id}/oportunidade/${data.id}`);
    }

    const showContacts = () => {
        return (volunteer.facebook != '' && volunteer.facebook != null && volunteer.facebook != undefined) ||
            (volunteer.phone != '' && volunteer.phone != null && volunteer.phone != undefined) ||
            (volunteer.instagram != '' && volunteer.instagram != null && volunteer.instagram != undefined)

    }

    return (
        <PageContainer>
            <BackButton redirectTo='/voluntarios' />
            <Typography mb={5} variant="h5">
                Perfil do Voluntário
            </Typography>
            <Grid sx={{ display: "flex", justifyContent: "space-around" }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                {isLoading ?
                    <Loading />
                    :
                    <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={5} sm={12} md={5} >
                        <div style={{ textAlign: "center" }} >
                            <VolunteerImage src={volunteer?.picture} />
                            <Typography mb={4} variant="h6"> {volunteer.name} </Typography>
                        </div>
                        <Typography textAlign={"justify"} mb={4} variant="body1" component="p">
                            {volunteer.about}
                        </Typography>

                        {showContacts() &&
                            <>
                                <Typography mb={2} variant="h6"> Contatos </Typography>
                                <ContactDetails>
                                    {volunteer.phone != '' && volunteer.phone != null && volunteer.phone != undefined &&
                                        <div className="info">
                                            <LocalPhoneIcon className="icon" /> <div> {volunteer.phone} </div>
                                        </div>
                                    }
                                    {volunteer.instagram != '' && volunteer.instagram != null && volunteer.instagram != undefined &&
                                        <div className="info">
                                            <img src={instagramLogo} />
                                            <div className='social-media'>
                                                {volunteer.instagram}
                                            </div>
                                        </div>
                                    }
                                    {volunteer.facebook != '' && volunteer.facebook != null && volunteer.facebook != undefined &&
                                        <div className="info">
                                            <img src={facebookLogo} />
                                            <div className='social-media'>
                                                {volunteer.facebook}
                                            </div>
                                        </div>
                                    }
                                </ContactDetails>
                            </>
                        }
                    </Grid>
                }

                <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={7} sm={12} md={7} >
                    <Typography textAlign={"center"} mb={2} variant="h6">
                        Inscrições
                    </Typography>

                    {isLoading ? (
                        <Loading />
                    ) : (opportunities == undefined || opportunities.length === 0 &&
                        <div>Voluntário não está inscrito em nenhuma atividade</div>
                    )
                    }

                    {opportunities !== undefined && opportunities.length > 0 &&

                        <DefaultDataGrid
                            enablePagination={true}
                            canView={true}
                            onView={onView}
                            toolbarProps={{ showQuickFilter: true, showFilterButton: true }}
                            datagridProps={{
                                className: isMobile ? "vertical-grid" : "",
                                columns: columns,
                                density: isMobile ? "compact" : "standard",
                                rows: opportunities as any,
                                rowCount: opportunities?.length,
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
                        />}


                </Grid>
            </Grid>
        </PageContainer>

    )
}

export default VolunteerDetails