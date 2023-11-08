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

const AddressForm = (props: any) => {
    const [carregando, setCarregandoEndereco] = useState(false);
    const [showMap, setShowMap] = useState(true);
    const [cepContemBairro, setCepContemBairro] = useState(true);
    const [cepContemLogradouro, setCepContemLogradouro] = useState(true);
    const apiViaCep = axios.create({
        baseURL: "https://viacep.com.br/ws/",
    });
    apiViaCep.interceptors.request.use(async (config: any) => {
        return config;
    });
    //TODO ADD MAP IN SELECTION MODE

    // useEffect(() => {
    // 	var cep = form.getValues("cep")[0];
    // 	if(cep != ''){
    // 		buscaCep(cep);
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
    } = useForm<any>({
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
    const buscaCep = (cep: any) => {
        cep = cep.replace("-", "");
        if (cep.length == 8) {
            apiViaCep.get(cep + "/json/")
                .then((resposta: any) => {
                    if (resposta.data.erro) {
                        form.setValue('logradouro', "");
                        form.setValue('bairro', "");
                        form.setValue('cidade', "");
                        form.setValue('estado', "");
                        form.setError('cep', { type: 'custom', message: 'Insira um CEP válido' });
                    }
                    var endereco = resposta.data.logradouro;
                    var bairro = resposta.data.bairro;
                    var cidade = resposta.data.localidade.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    var estado = resposta.data.uf;
                    if (endereco == "") {
                        setCepContemLogradouro(false);
                    } else {
                        setCepContemLogradouro(true);
                    }
                    if (bairro == "") {
                        setCepContemBairro(false);
                    } else {
                        setCepContemBairro(true);
                    }

                    form.setValue('logradouro', endereco);
                    form.setValue('cidade', cidade);
                    form.setValue('bairro', bairro);
                    form.setValue('estado', estado);
                    form.clearErrors(['logradouro', 'bairro', 'cidade', 'cep']);

                })
                .catch((error: any) => {
                    console.log(error);
                });
        } else if (cep.length > 0){
            form.setError('cep', { type: 'custom', message: 'Insira um CEP válido' });
        } else {
            form.clearErrors(['logradouro', 'bairro', 'cidade', 'cep']);
        }
    }
    const onSubmit = (data: any, e: any) => {
        if(e.target.id != "form-new-address") return;
        const api = useApi();
        api.post("endereco").then((res: AxiosResponse) => toast.success("Endereço adicionado com sucesso"))
        props.setShowModal(false);
    }
    return (
        <Box
            id="form-new-address"
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            // noValidate
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
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
                    <Grid container spacing={2}>
                        <Grid md={6}>
                            <InputLabel>
                                Nome
                                <Box component="span" style={{ color: "red" }}> *</Box>
                            </InputLabel>
                            <TextField
                                {...form.register("nome")}
                                size='small'
                                placeholder="Ex: Sede estadual"
                                // error={form.errors?.cep?.message != undefined}
                                style={{ width: "100%", margin: 0 }}
                                variant="outlined"
                                required
                            />
                            {/* <FormHelperText error={true}>{form.errors?.cep?.message as any}</FormHelperText> */}
                        </Grid>
                        <Grid md={6}>
                            <InputLabel>
                                CEP
                                <Box component="span" style={{ color: "red" }}> *</Box>
                            </InputLabel>
                            <MaskedTextField
                                {...form.register("cep")}
                                size='small'
                                placeholder="00000-000"
                                onChange={(e: any) => buscaCep(e.target.value)}
                                mask="00000-000"
                                error={form.errors?.cep?.message}
                                style={{ width: "100%", margin: 0 }}
                                variant="outlined"
                                required
                            />
                            <FormHelperText error={true}>{form.errors?.cep?.message as any}</FormHelperText>
                        </Grid>
                        <Grid md={4}>
                            <InputLabel>
                                Estado
                                <Box component="span" style={{ color: "red" }}> *</Box>
                            </InputLabel>
                            <TextField
                                disabled
                                style={{ width: '100%', margin: 0 }}
                                size="small"
                                defaultValue={form.getValues("estado")}
                                {...form?.register('estado')} />
                        </Grid>
                        <Grid md={4}>
                            <InputLabel>
                                Cidade
                                <Box component="span" style={{ color: "red" }}> *</Box>
                            </InputLabel>
                            <TextField
                                disabled
                                {...form.register("cidade")}
                                defaultValue={form.getValues("cidade")}
                                style={{ width: '100%', margin: 0 }}
                                size="small" />
                        </Grid>
                        <Grid md={4}>
                            <InputLabel>
                                Bairro
                                <Box component="span" style={{ color: "red" }}> *</Box>
                            </InputLabel>
                            <TextField
                                {...form.register("bairro")}
                                size='small'
                                error={form.errors?.bairro?.message != ""}
                                style={{ width: "100%", margin: 0 }}
                                disabled={cepContemBairro}
                                variant="outlined"
                                label={cepContemBairro ? "" : "Informe seu bairro..."}
                            />
                            <FormHelperText error={true}>{form.errors?.bairro?.message as any}</FormHelperText>
                        </Grid>
                        <Grid md={4}>
                            <InputLabel>
                                Logradouro
                                <Box component="span" style={{ color: "red" }}> *</Box>
                            </InputLabel>
                            <TextField
                                {...form.register("logradouro")}
                                size='small'
                                disabled={cepContemLogradouro}
                                error={form.errors?.logradouro?.message != ""}
                                style={{ width: "100%", margin: 0 }}
                                variant="outlined"
                                placeholder={cepContemLogradouro ? "" : "Informe seu endereço..."}
                                required
                            />
                            <FormHelperText error={true}>{form.errors?.logradouro?.message as any}</FormHelperText>
                        </Grid>
                        <Grid md={4}>
                            <InputLabel>
                                Número
                                <Box component="span" style={{ color: "red" }}> *</Box>
                            </InputLabel>
                            <TextField
                                {...form.register("numeroEndereco")}
                                size='small'
                                error={form.errors?.numeroEndereco?.message != undefined}
                                style={{ width: "100%", margin: 0 }}
                                type="number"
                                variant="outlined"
                                required
                            />
                            <FormHelperText error={true}>{form.errors?.numeroEndereco?.message as any}</FormHelperText>
                        </Grid>
                        <Grid md={4}>
                            <InputLabel>
                                Complemento
                            </InputLabel>
                            <TextField
                                {...form.register("complemento")}
                                size='small'
                                // error={form.errors?.complemento?.message != ""}
                                style={{ width: "100%", margin: 0 }}
                                variant="outlined"
                            />
                            {/* <FormHelperText error={true}>{form.errors?.complemento?.message as any}</FormHelperText> */}
                        </Grid>
                        {/* <Grid sm={12} md={4} style={{ cursor: 'not-allowed' }}>
							<InputSelect
								obrigatorio
								cidade
								readOnly
								mensagemErro="A Cidade deve ser informada a partir do CEP"
								id="idCidade"
								options={cidades}
								nome="Cidade"
								nomeInput="idCidade"
								form={form}
							/>
						</Grid>
						<Grid sm={12} md={3} style={{ cursor: 'not-allowed' }}>
							<InputSelect
								obrigatorio
								readOnly
								mensagemErro="O Estado deve ser informado a partir do CEP"
								estado
								options={estados}
								nome="SiglaEstado"
								nomeInput="siglaEstado"
								form={form}
							/>
						</Grid> */}
                    </Grid>
                    <br />
                    {showMap &&
                        <>
                            <Grid container>
                                <Grid md={12} style={{ height: '150px', width: '100%' }}>
                                    <MapComponent selectionMode />
                                </Grid>
                            </Grid>
                            <br />
                        </>
                    }
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
