import { TextField } from "@mui/material";

const AddressSelect = () => {
    return (
        <>
            <TextField
                required
                label="CEP"
                variant="outlined" />
            <TextField
                required
                label="Endereço"
                variant="outlined"
                inputProps={{ maxLength: 255 }} />

            <TextField
                required
                label="Bairro"
                variant="outlined"
                inputProps={{ maxLength: 255 }} />

            <TextField
                required
                label="UF"
                variant="outlined" />
            <TextField
                required
                label="Cidade"
                variant="outlined" />
        </>
    );
}

export default AddressSelect;