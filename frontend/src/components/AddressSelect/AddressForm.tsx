import { Button, Grid } from "@mui/joy";
import { Box, FormHelperText, InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import Loading from "../Loading";
import MaskedTextField from "react-masked-mui-textfield";
import { useForm } from "react-hook-form";
import MapComponent from "../MapComponent";
import { useApi } from "@/api";
import { toast } from "sonner";
import { BrasilApiAddress } from "@/types/brasil-api-cep-search-return";
import { IAddress } from "@/types/address";
import { Coordenates } from "@/types/coords";

interface IAddressFormProps {
    setShowModal: (x: any) => void;
    addNewAddress: (x: any) => void;
    context: "newOrganization" | "newActivity" | "editOrganization";
    setAddress?: any;
}
const AddressForm = (props: IAddressFormProps) => {
    const [carregando, setCarregandoEndereco] = useState(false);
    const [selectedCoordenate, setSelectedCoordenate] = useState<Coordenates>();
    const [position, setPosition] = useState<L.LatLngExpression | undefined>();
    const [showMap, setShowMap] = useState(false);
    const [zip_codeContemBairro, setCepContemBairro] = useState(true);
    const [zip_codeContemLogradouro, setCepContemLogradouro] = useState(true);
    const apiViaCep = axios.create({
        baseURL: "https://viacep.com.br/ws/",
    });
    const apiBrasilApi = axios.create({
        baseURL: "https://brasilapi.com.br/",
    });
    apiViaCep.interceptors.request.use(async (config: any) => {
        return config;
    });
    //TODO ADD MAP IN SELECTION MODE

    // useEffect(() => {
    // 	var zip_code = form.getValues("zip_code")[0];
    // 	if(zip_code != ''){
    // 		buscaCep(zip_code);
    // 	}
    // }, [])

    const {
        register,
        setError,
        clearErrors,
        formState: { errors },
        handleSubmit,
        control,
        setValue,
        getValues,
        formState,
        watch,
        reset,
    } = useForm<IAddress>({
        // shouldUnregister: false,
        shouldFocusError: true,
        // resolver: yupResolver(validationSchema) as Resolver<AtualizacaoCadastralType, object>
    });
    const { isDirty, dirtyFields } = formState;
    var form = {
        register,
        setError,
        clearErrors,
        errors,
        handleSubmit,
        control,
        setValue,
        watch,
        getValues,
        isDirty,
        // dirtyFields
    };
    const buscaCep = (zip_code: any) => {
        zip_code = zip_code.replace("-", "");
        if (zip_code.length == 8) {
            apiViaCep.get(zip_code + "/json/")
                .then((resposta: any) => {
                    console.log("Teste")
                    if (resposta.data.erro) {
                        form.setValue('street', "");
                        form.setValue('neighborhood', "");
                        form.setValue('city', "");
                        form.setValue('state', "");
                        form.setError('zip_code', { type: 'custom', message: 'Insira um CEP válido' });
                    }
                    var endereco = resposta.data.logradouro;
                    var neighborhood = resposta.data.bairro;
                    var city = resposta.data.localidade?.toUpperCase()?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '');
                    var state = resposta.data.uf;
                    setCepContemLogradouro(endereco == "" ? false : true);
                    setCepContemBairro(neighborhood == "" ? false : true);
                    form.setValue('street', endereco);
                    form.setValue('city', city);
                    form.setValue('neighborhood', neighborhood);
                    form.setValue('state', state);
                    form.clearErrors(['street', 'neighborhood', 'city', 'zip_code']);
                })
                .catch((error: any) => {
                    console.log(error);
                })
                .finally(() => {
                    apiBrasilApi.get(`api/cep/v2/${zip_code}`)
                        .then((res: AxiosResponse<BrasilApiAddress>) => {
                            if(res.data.location.coordinates.latitude && res.data.location.coordinates.longitude){

                                setPosition(
                                    {
                                        lat: +res.data.location.coordinates.latitude,
                                        lng: +res.data.location.coordinates.longitude
                                    }
                                    );
                                }
                            setShowMap(true);
                        })
                });
        } else if (zip_code.length > 0) {
            form.setError('zip_code', { type: 'custom', message: 'Insira um CEP válido' });
        } else {
            form.clearErrors(['street', 'neighborhood', 'city', 'zip_code']);
        }
    }
    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.id != "form-new-address") return;
        const api = useApi();
        var request: IAddress = data;
        console.log(selectedCoordenate, 'selectedCoordenate')
        if (selectedCoordenate == undefined) {
            //TODO ADICIONAR MELHOR SINALIZACAO DE QUE É NECESSARIO CLICAR NO MAPA
            toast.error("Por favor marque no mapa a localização precisa do local");
            return;
        }
        request.latitude = selectedCoordenate.latitude;
        request.longitude = selectedCoordenate.longitude;
        // if (props.context == "newActivity") {
        //     api.post("address").then(
        //         (res: AxiosResponse) => {
        //             toast.success("Endereço adicionado com sucesso")
        //             props.setShowModal(false);
        //         }
        //     )
        // } else {
            props.addNewAddress(request);
            toast.success("Endereço adicionado com sucesso")
            props.setShowModal(false);
        // }
    }
    return (
        <Box
            id="form-new-address"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            // noValidate
        >
            {carregando ? (
                <Loading />
            ) : (
                <>
                    <Typography>
                        Alguns campos são preenchidos automaticamente através do
                        CEP fornecido.
                    </Typography>
                    <br />
                    <Grid container spacing={1}>
                        <Grid xs={12} md={6}>
                            <InputLabel>
                                Nome
                                <Box component="span" style={{ color: "red" }}> *</Box>
                            </InputLabel>
                            <TextField
                                {...form.register("name")}
                                size='small'
                                placeholder="Ex: Sede estadual"
                                // error={form.errors?.zip_code?.message != undefined}
                                style={{ width: "100%", margin: 0 }}
                                variant="outlined"
                                required
                            />
                            {/* <FormHelperText error={true}>{form.errors?.zip_code?.message as any}</FormHelperText> */}
                        </Grid>
                        <Grid xs={6} md={6}>
                            <InputLabel>
                                CEP
                                <Box component="span" style={{ color: "red" }}> *</Box>
                            </InputLabel>
                            <MaskedTextField
                                {...form.register("zip_code")}
                                size='small'
                                placeholder="00000-000"
                                onChange={(e: any) => buscaCep(e.target.value)}
                                mask="00000-000"
                                error={form.errors?.zip_code?.message}
                                style={{ width: "100%", margin: 0 }}
                                variant="outlined"
                                required
                            />
                            <FormHelperText error={true}>{form.errors?.zip_code?.message as any}</FormHelperText>
                        </Grid>
                        <Grid xs={6} md={4}>
                            <InputLabel>
                                Estado
                                <Box component="span" style={{ color: "red" }}> *</Box>
                            </InputLabel>
                            <TextField
                                disabled
                                style={{ width: '100%', margin: 0 }}
                                size="small"
                                defaultValue={form.getValues("state")}
                                {...form?.register('state')} />
                        </Grid>
                        <Grid xs={6} md={4}>
                            <InputLabel>
                                Cidade
                                <Box component="span" style={{ color: "red" }}> *</Box>
                            </InputLabel>
                            <TextField
                                disabled
                                {...form.register("city")}
                                defaultValue={form.getValues("city")}
                                style={{ width: '100%', margin: 0 }}
                                size="small" />
                        </Grid>
                        <Grid xs={6} md={4}>
                            <InputLabel>
                                Bairro
                                <Box component="span" style={{ color: "red" }}> *</Box>
                            </InputLabel>
                            <TextField
                                {...form.register("neighborhood")}
                                size='small'
                                error={form.errors?.neighborhood?.message != ""}
                                style={{ width: "100%", margin: 0 }}
                                disabled={zip_codeContemBairro}
                                variant="outlined"
                                label={zip_codeContemBairro ? "" : "Informe seu neighborhood..."}
                            />
                            <FormHelperText error={true}>{form.errors?.neighborhood?.message as any}</FormHelperText>
                        </Grid>
                        <Grid xs={12} md={4}>
                            <InputLabel>
                                Logradouro
                                <Box component="span" style={{ color: "red" }}> *</Box>
                            </InputLabel>
                            <TextField
                                {...form.register("street")}
                                size='small'
                                disabled={zip_codeContemLogradouro}
                                error={form.errors?.street?.message != ""}
                                style={{ width: "100%", margin: 0 }}
                                variant="outlined"
                                placeholder={zip_codeContemLogradouro ? "" : "Informe seu endereço..."}
                                required
                            />
                            <FormHelperText error={true}>{form.errors?.street?.message as any}</FormHelperText>
                        </Grid>
                        <Grid xs={6} md={4}>
                            <InputLabel>
                                Número
                                <Box component="span" style={{ color: "red" }}> *</Box>
                            </InputLabel>
                            <TextField
                                {...form.register("number")}
                                size='small'
                                error={form.errors?.number?.message != undefined}
                                style={{ width: "100%", margin: 0 }}
                                type="number"
                                variant="outlined"
                                required
                            />
                            <FormHelperText error={true}>{form.errors?.number?.message as any}</FormHelperText>
                        </Grid>
                        <Grid xs={6} md={4}>
                            <InputLabel>
                                Complemento
                            </InputLabel>
                            <TextField
                                {...form.register("complement")}
                                size='small'
                                // error={form.errors?.complement?.message != ""}
                                style={{ width: "100%", margin: 0 }}
                                variant="outlined"
                            />
                            {/* <FormHelperText error={true}>{form.errors?.complement?.message as any}</FormHelperText> */}
                        </Grid>
                    </Grid>
                    <br />
                    {showMap &&
                        <>
                            <Grid container>
                                <Grid xs={12} md={12} style={{ height: '160px', width: '100%' }}>
                                    <MapComponent
                                        selectionMode
                                        position={position}
                                        setSelectedCoordenate={setSelectedCoordenate}
                                    />
                                    <FormHelperText>Toque no mapa e mova o marcador para a localização exata do local</FormHelperText>
                                </Grid>
                            </Grid>
                            <br />
                        </>
                    }
                    <br />
                    <Grid>
                        {/* <pre>{JSON.stringify(getValues(), null, 4)}</pre> */}
                        <Grid style={{ textAlign: "right" }}>
                            <Button
                                color="primary"
                                variant='outlined'
                                onClick={() => props?.setShowModal(false)}
                                // onClick={() => reset({})} 
                                style={{ marginRight: "10px" }}
                            >
                                CANCELAR
                            </Button>
                            <Button variant='solid' type="submit"
                                form="form-new-address"
                                id="form-new-address-btn">
                                SALVAR
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
}

export default AddressForm;
