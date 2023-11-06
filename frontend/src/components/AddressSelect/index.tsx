import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Grid, IconButton, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddressForm from './AddressForm';
const AddressSelect = (props: any) => {
    const [openAddOrganizationModal, setOpenAddOrganizationModal] = React.useState(false);
    // TODO FETCH ALL ADDRESSES
    const addresses = [
        {
            value: 'Teste',
            label: 'TTTTT',
        },
    ];
    React.useEffect(() => {

    }, []);
    return (
        <Grid container>
            <Grid md={10}>
                <TextField
                    id="outlined-select-currency"
                    select
                    size="small"
                    fullWidth
                    label="Sede"
                    defaultValue="EUR"
                    helperText="Caso o endereço desejado não exista na lista, o adicione."
                >
                    {addresses.map((address: any) => (
                        <MenuItem key={address.value} value={address.value}>
                            {address.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid md={2}>
                <IconButton
                    variant="outlined"
                    style={{ marginLeft: '10px', marginTop: '2px' }}
                    color="primary"
                    onClick={() => setOpenAddOrganizationModal(true)}
                    aria-label="Adicionar Endereço">
                    <AddCircleOutlineIcon />
                </IconButton>

                <Modal
                    open={openAddOrganizationModal}
                    onClose={() => setOpenAddOrganizationModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <ModalDialog sx={{ overflowY: 'auto' }}>
                        <ModalClose />
                        <Typography> Novo endereço:</Typography>
                        <AddressForm />
                    </ModalDialog>
                </Modal>
            </Grid>
        </Grid>
    );
}

export default AddressSelect;
