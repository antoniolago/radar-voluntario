import OpportunitiesList from '@/components/OpportunitiesList';
import { Breadcrumbs, Grid, Link, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { InsitutionImage, SocialMedialList } from './styles';
import facebookLogo from '../../assets/facebook.svg';
import instagramLogo from '../../assets/instagram.svg';
import { InstitutionService } from '@/api/institution';
import EditIcon from '@mui/icons-material/Edit';
import { Button, DialogActions, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog } from '@mui/joy';
import { AuthService } from '@/api/auth';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';

function InstitutionDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [openConfirmDeletionAlert, setOpenConfirmDeletionAlert] = useState<boolean>(false);

    const { mutate, data: deleteResponse, isLoading: isLoadingDelete } = InstitutionService.useDeleteInstitution();
    const {
        data: institution,
        isLoading,
        isError
    } = InstitutionService.useGetInstitution(id);
    const { data: curUser } = AuthService.useGetUser();
    const isUserOwner = institution?.owner_id == curUser?.id
    useEffect(() => {
        if(deleteResponse?.status == 200)
            navigate('/organizacoes');
    }, [deleteResponse])
    return (
        <>
            <Paper elevation={3} sx={{ p: 2 }}>
                {/* <BackButton redirectTo='/organizacoes' /> */}
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={() => navigate("/organizacoes")}>
                        Organizações
                    </Link>
                    <Typography color="text.primary">{institution?.name}</Typography>
                </Breadcrumbs>
                {institution != undefined &&
                    <>
                        <Typography
                            sx={{ textAlign: "center" }}
                            m={1}
                            variant="h5"
                            component="h2">
                            {institution.name}
                            {isUserOwner &&
                                <>
                                    <Button
                                        variant='plain'
                                        sx={{ ml: 3, p: '0 5px' }}
                                        size='sm'
                                        color="warning"
                                        onClick={() => navigate("edit")}>
                                        <EditIcon />
                                    </Button>
                                    <Button
                                        variant='plain'
                                        sx={{ ml: 3, p: '0 5px' }}
                                        size='sm'
                                        color="danger"
                                        onClick={() => setOpenConfirmDeletionAlert(true)}>
                                        <DeleteForeverIcon />
                                    </Button>
                                </>
                            }
                        </Typography>
                        <Typography sx={{ textAlign: "justify" }} variant="body1" component="p"> {institution.about} </Typography>

                        <SocialMedialList>
                            {institution.instagram != '' && institution.instagram != null && institution.instagram != undefined &&
                                <div className="info">
                                    <img src={instagramLogo} />
                                    <div className='social-media'>
                                        {institution.instagram}
                                    </div>
                                </div>
                            }

                            {institution.facebook != '' && institution.facebook != null && institution.facebook != undefined &&
                                <div className="info">
                                    <img src={facebookLogo} />
                                    <div className='social-media'>
                                        {institution.facebook}
                                    </div>
                                </div>
                            }
                        </SocialMedialList>
                        {/* TEMPORARY DISABLE!!! */}
                        {/* <Grid sx={{ textAlign: "center" }} item xs={6} sm={12} md={6} >
                        <InsitutionImage src="/preview-image.png" />
                    </Grid> */}

                        <OpportunitiesList isUserOwner={isUserOwner} institutionId={id} />

                    </>

                }

            </Paper>
            <div>
                <Modal
                    open={openConfirmDeletionAlert}
                    onClose={() => setOpenConfirmDeletionAlert(false)}
                    aria-labelledby="dialogo-confirma-delete-titulo"
                    aria-describedby="dialogo-confirma-delete-descricao"
                >
                    <ModalDialog variant="outlined" role="alertdialog">
                        <ModalClose />
                        <DialogTitle id="dialogo-confirma-delete-titulo" sx={{ mb: 2 }}>
                            <WarningRoundedIcon />
                            Confirmação de deleção de organização
                        </DialogTitle>
                        <DialogContent>
                            <DialogContent id="dialogo-confirma-delete-descricao">
                                Você tem certeza que deseja deletar esta organização permanentemente?
                            </DialogContent>
                        </DialogContent>
                        <DialogActions>
                            <LoadingButton
                                color='error'
                                // color="danger"
                                onClick={() => mutate(institution?.id!)} 
                                autoFocus
                                variant='contained'
                                form="new-organization-form"
                                // size="large"
                                id="new-organization-form-btn"
                                loading={isLoadingDelete}
                                loadingPosition="center"
                            >
                                DELETAR
                                <DeleteForeverIcon sx={{ml: 1}}/>
                            </LoadingButton>
                            <Button color="neutral" variant='outlined' onClick={() => setOpenConfirmDeletionAlert(false)}>CANCELAR</Button>
                        </DialogActions>
                    </ModalDialog>
                </Modal>
            </div>
        </>
    )
}

export default InstitutionDetails;
