import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Grid, IconButton, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddressForm from './AddressForm';
import { createPortal } from 'react-dom';
import { IAddress } from '@/types/address';
interface IAddressSelectProps {
    context: "newOrganization" | "newActivity";
    addreses?: IAddress[];
    setAddress?: any;
    selectedAddress?: IAddress;
}
const AddressSelect = (props: IAddressSelectProps) => {
    const [openNewAddressModal, setOpenNewAddressModal] = React.useState(false);
    const [addresses, setAddresses] = React.useState<IAddress[]>([]);
    React.useEffect(() => {

    }, [addresses]);
    // React.useEffect(() => {
    //     if(props.selectedAddress){
    //         setAddresses([props.selectedAddress])
    //     }
    // }, [props.selectedAddress])
    return (
        <Grid container>
            <Grid xs={11} md={11} lg={11}>
                <TextField
                    id="select-address"
                    select
                    size="small"
                    disabled={props.context == "newOrganization"}
                    fullWidth
                    label={props.selectedAddress?.name || "Endereço"}
                    defaultValue=""
                    helperText={props.context == "newOrganization" ? 
                    "Adicione um endereço no botão ao lado do campo" : "Caso o endereço desejado não exista na lista, o adicione."}
                >
                    {addresses.map((address: IAddress) => (
                        <MenuItem key={address.id} value={address.id}>
                            {address.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid xs={1} md={1} lg={1}>
                <IconButton
                    variant="outlined"
                    style={{ marginLeft: '10px', marginTop: '2px' }}
                    color="primary"
                    onClick={() => setOpenNewAddressModal(true)}
                    aria-label="Adicionar Endereço">
                    <AddCircleOutlineIcon />
                </IconButton>
                {createPortal(
                    <Modal
                        open={openNewAddressModal}
                        onClose={() => setOpenNewAddressModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <ModalDialog sx={{ overflowY: 'auto' }}>
                            <ModalClose />
                            <Typography> Novo endereço:</Typography>
                            <AddressForm
                                context={props.context}
                                setAddress={props.setAddress}
                                setShowModal={setOpenNewAddressModal}
                            />
                        </ModalDialog>
                    </Modal>,
                    document.body
                )}
            </Grid>
        </Grid>
    );
}

export default AddressSelect;
