import { useState } from 'react';
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FooterButton, FormContainer, InputGroup } from '../ProfileEdit/styles';
import { toast } from 'sonner';
import BackButton from '@/components/BackButton';

const OpportunityEdit = () => {
    const { id } = useParams();
    const [onlineOpportunity, setOnlineOpportunity] = useState(false);
    const [addressId, setAddressId] = useState('');


    const handleChangeOnineOpportinity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnlineOpportunity(event.target.checked);
    };

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        toast.success('Oportunidade atualizada');
    }

    return (
        <>
            <BackButton redirectTo="/oportunidades" />

            <Typography mb={5} variant="h5">
                {id ? 'Editar' : 'Cadastrar'} oportunidade
            </Typography>
            <FormContainer onSubmit={onSubmit}>
                    <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={6} >

                        <TextField
                            required
                            label="Título"
                            variant="outlined"
                            inputProps={{ maxLength: 255 }} />
                        <TextField
                            label="Descrição"
                            multiline
                            required
                            rows={5}
                            defaultValue=""
                            inputProps={{ maxLength: 1024 }} />

                        <TextField
                            label="Número de voluntários"
                            required
                            type="number"
                        />

                        <FormControl>
                            <FormControlLabel control={<Switch defaultChecked />} label="Publicar oportunidade" />
                        </FormControl>

                        <FormControl >
                            <InputLabel>Categorias</InputLabel>
                            <Select label="Organização">
                                {/* {interestsList.map((interest) =>
                                <MenuItem value={interest.value}>{interest.label}</MenuItem>
                            )} */}
                            </Select>
                        </FormControl>

                        {/* TODO: add datepicker */}
                        <TextField
                            label="Data"
                            multiline
                            required
                            inputProps={{ maxLength: 10 }} />

                        <InputGroup>
                            <TextField
                                required
                                label="Hora início"
                                variant="outlined" />
                            <TextField
                                required
                                label="Hora fim"
                                variant="outlined" />
                        </InputGroup>
                    </Grid>
                    <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={6}>
                        <FormControl sx={{padding :"8.5px 14px" }}>
                            <FormControlLabel
                                control={<Switch
                                    checked={onlineOpportunity}
                                    onChange={handleChangeOnineOpportinity}
                                    defaultChecked />}
                                label="Oportunidade online" />
                        </FormControl>

                        {!onlineOpportunity &&
                            <>
                                <FormControl >
                                    <InputLabel>Endereço</InputLabel>
                                    <Select
                                        onChange={(e) => (setAddressId(e.target.value))}
                                        value={addressId}
                                        label="Organização">
                                        <MenuItem value={'1'}>Rua x, Bairro, Cidade - UF</MenuItem>
                                        <MenuItem value={'0'}>Outro</MenuItem>
                                    </Select>
                                </FormControl>

                                {addressId === '0' &&
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

                                        <InputGroup>
                                            <TextField
                                                required
                                                label="UF"
                                                variant="outlined" />
                                            <TextField
                                                required
                                                label="Cidade"
                                                variant="outlined" />
                                        </InputGroup>
                                    </>

                                }
                            </>

                        }


                    </Grid>
                <FooterButton>
                    <Button type="submit" size="large" color="success" variant="contained">
                        Salvar
                    </Button>
                </FooterButton>
            </FormContainer>
        </>
    );
}

export default OpportunityEdit;
