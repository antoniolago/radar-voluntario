import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Grid, IconButton, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddressForm from './AddressForm';
import { createPortal } from 'react-dom';
import { IAddress } from '@/types/address';
import { InstitutionService } from '@/api/institution';
import { useParams } from 'react-router-dom';
import MapComponent from '../MapComponent';
interface IAddressSelectProps {
    context: "newOrganization" | "newActivity" | "editOrganization";
    addreses?: IAddress[];
    setAddress?: any;
    selectedAddress?: IAddress;
}
const AddressSelect = (props: IAddressSelectProps) => {
    // const [selectedAddress, setSelectedAddress] = React.useState<IAddress|undefined>()
    const [openNewAddressModal, setOpenNewAddressModal] = React.useState(false);
    // const [addresses, setAddresses] = React.useState<IAddress[]>([]);
    const { id } = useParams();
    const { data: addresses, refetch } = InstitutionService.useGetInstitutionAddresses(id);
    React.useEffect(() => {
        if (id != undefined) refetch();
    }, [id]);
    // React.useEffect(() => {
    //     if(props.selectedAddress){
    //         setAddresses([props.selectedAddress])
    //     }
    // }, [props.selecteedAddress])

    const handleNewAddress = (address: IAddress) => {
        addresses?.push(address);
        props.setAddress(address);
    }

    const generateAddressValue = (address: IAddress) => {
        return `${address.latitude}-${address.longitude}`;
    }

    const getValue = () => {
        if(props.context == "newOrganization")
            return '';
        else
        return props.selectedAddress != undefined ? generateAddressValue(props.selectedAddress) : ''
    }

    return (
        <Grid container>
            <Grid xs={10} md={10} lg={11}>
                <TextField
                    id="select-address"
                    select
                    size="small"
                    disabled={props.context == "newOrganization"}
                    fullWidth
                    value={getValue()}
                    onChange={(e: any) => {
                        var address = addresses?.filter(
                            (address) => generateAddressValue(address) === e.target.value)[0]
                        // setSelectedAddress(address);
                        props.setAddress(address);
                    }}
                    label={props.context == "newOrganization" ? props.selectedAddress?.name || "Endereço" : "Endereço"}                    
                    defaultValue=""
                    helperText={props.context == "newOrganization" ?
                        "Adicione um endereço no botão ao lado do campo" : "Caso o endereço desejado não exista na lista, o adicione."}
                >
                    {addresses?.map((address: IAddress) => (
                        <MenuItem key={address.id} value={generateAddressValue(address)}>
                            {address.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid xs={2} md={2} lg={1}>
                <IconButton
                    variant="plain"
                    style={{
                        width: '80%',
                        height: '40px',
                        textAlign: 'center'
                    }}
                    color="success"
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
                            {openNewAddressModal &&
                                <AddressForm
                                context={props.context}
                                setAddress={props.setAddress}
                                addNewAddress={handleNewAddress}
                                setShowModal={setOpenNewAddressModal}
                                />
                            }
                        </ModalDialog>
                    </Modal>,
                    document.body
                )}
            </Grid>
            {props.selectedAddress != undefined &&
                <Grid xs={12} sx={{ height: '150px', mb: 3 }}>
                    <MapComponent
                        previewMode
                        position={
                            [
                                props.selectedAddress?.latitude,
                                props.selectedAddress?.longitude
                            ]
                        }
                    />
                </Grid>}
        </Grid>
    );
}

export default AddressSelect;
