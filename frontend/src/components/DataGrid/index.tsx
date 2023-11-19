import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionIcon from '@mui/icons-material/Description';
import CircularProgress from '@mui/material/CircularProgress';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridValueFormatterParams,
    GridRowParams,
    GridRenderEditCellParams,
    GridEditInputCell,
    GridValidRowModel,
    MuiEvent,
    GridCellParams,
    DataGridProps,
    GridToolbar,
    useGridApiRef
} from '@mui/x-data-grid';
import { darken, lighten, styled, useTheme } from '@mui/material';
//@ts-ignore
import { StyledTooltip } from './CustomDataGridInputValidatable/styles';
import { CustomToolbar, CustomToolbarProps } from './CustomToolbar';
import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import Loading from '@/components/Loading';
import { ReactElement } from 'react';
import { JSXElementConstructor } from 'react';
import DeleteDialog from './DeleteDialog';
import { TemaService } from '@/api/tema';
import { AxiosResponse } from 'axios';
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomId,
//   randomArrayItem,
// } from '@mui/x-data-grid-generator';

export type DataTableProps = {
    onSave?: any;
    onDelete?: any;
    onInsert?: any;
    onEdit?: any;
    onView?: any;
    tituloDeleteDialog?: string;
    textoDeleteDialog?: string;
    textoBotaoConfirmaDeleteDialog?: string;
    canDelete?: boolean;
    canInsert?: boolean;
    canUpdate?: boolean;
    canView?: boolean;
    enablePagination?: boolean;
    datagridProps: DataGridProps;
    toolbarProps?: CustomToolbarProps;
}
export default function DefaultDataGrid(props: DataTableProps) {
    const initialRows: GridRowsProp<any> = props.datagridProps.rows;
    const [saving, setSaving] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const { isMobile } = TemaService.useGetIsMobile();
    const [savingRow, setSavingRow] = React.useState<GridRowModel>({});
    const [savingJustFinished, setSavingJustFinished] = React.useState<boolean>(false);
    const [saveResponse, setSaveResponse] = React.useState({} as AxiosResponse);
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const apiRef = useGridApiRef();
    const initializeObject = (obj: any): any => {
        const initializedObj: any = {};
    
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                const propValue = obj[prop];
                initializedObj[prop] = getInitialValue(propValue);
            }
        }
    
        return initializedObj;
    };
    const getInitialValue = (value: any): any => {
        if (typeof value === 'string') {
            return '';
        } else if (typeof value === 'number') {
            return 0;
        } else if (value instanceof Date) {
            return new Date(); // You might want to adjust this if you want a specific initial date
        } else {
            return null; // For other types, you might want to adjust this as needed
        }
    };
    const getBackgroundColor = (color: string, mode: string) =>
        mode === 'dark' ? darken(color, 0.9) : lighten(color, 0.95);

    const getHoverBackgroundColor = (color: string, mode: string) =>
        mode === 'dark' ? darken(color, 0.8) : lighten(color, 0.9);

    const getSelectedBackgroundColor = (color: string, mode: string) =>
        mode === 'dark' ? darken(color, 0.9) : lighten(color, 0.9);

    const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
        mode === 'dark' ? darken(color, 0.9) : lighten(color, 0.9);

    const StyledDataGrid = styled(DataGrid)(({ theme }: any) => ({
        '& .row-info': {
            backgroundColor: getBackgroundColor(theme.palette.info.main, theme.palette.mode),
            '&:hover': {
                backgroundColor: getHoverBackgroundColor(
                    theme.palette.info.main,
                    theme.palette.mode,
                ),
            },
            '&.Mui-selected': {
                backgroundColor: getSelectedBackgroundColor(
                    theme.palette.info.main,
                    theme.palette.mode,
                ),
                '&:hover': {
                    backgroundColor: getSelectedHoverBackgroundColor(
                        theme.palette.info.main,
                        theme.palette.mode,
                    ),
                },
            },
        },
        '& .row-success': {
            backgroundColor: getBackgroundColor(
                theme.palette.success.light,
                theme.palette.mode,
            ),
            '&:hover': {
                backgroundColor: getHoverBackgroundColor(
                    theme.palette.success.light,
                    theme.palette.mode,
                ),
            },
            '&.Mui-selected': {
                backgroundColor: getSelectedBackgroundColor(
                    theme.palette.success.light,
                    theme.palette.mode,
                ),
                '&:hover': {
                    backgroundColor: getSelectedHoverBackgroundColor(
                        theme.palette.success.light,
                        theme.palette.mode,
                    ),
                },
            },
        },
        '& .row-warning': {
            backgroundColor: getBackgroundColor(
                theme.palette.warning.light,
                theme.palette.mode,
            ),
            '&:hover': {
                backgroundColor: getHoverBackgroundColor(
                    theme.palette.warning.light,
                    theme.palette.mode,
                ),
            },
            '&.Mui-selected': {
                backgroundColor: getSelectedBackgroundColor(
                    theme.palette.warning.light,
                    theme.palette.mode,
                ),
                '&:hover': {
                    backgroundColor: getSelectedHoverBackgroundColor(
                        theme.palette.warning.light,
                        theme.palette.mode,
                    ),
                },
            },
        },
        '& .row-error': {
            backgroundColor: getBackgroundColor(
                theme.palette.error.light,
                theme.palette.mode,
            ),
            '&:hover': {
                backgroundColor: getHoverBackgroundColor(
                    theme.palette.error.light,
                    theme.palette.mode,
                ),
            },
            '&.Mui-selected': {
                backgroundColor: getSelectedBackgroundColor(
                    theme.palette.error.light,
                    theme.palette.mode,
                ),
                '&:hover': {
                    backgroundColor: getSelectedHoverBackgroundColor(
                        theme.palette.error.light,
                        theme.palette.mode,
                    ),
                },
            },
        },
        '& .total': {
            '@media print': {
                backgroundColor: 'rgb(242, 242, 242)'
            },
            backgroundColor: getBackgroundColor(
                '#000',
                theme.palette.mode,
            ),
            '&:hover': {
                backgroundColor: getHoverBackgroundColor(
                    '#000',
                    theme.palette.mode,
                ),
            },
            '&.Mui-selected': {
                backgroundColor: getSelectedBackgroundColor(
                    '#000',
                    theme.palette.mode,
                ),
                '&:hover': {
                    backgroundColor: getSelectedHoverBackgroundColor(
                        '#000',
                        theme.palette.mode,
                    ),
                },
            },
        },
    }));
    // React.useEffect(() => {
    //     //When done saving, shows success/error message for x seconds
    //     if (!saving) {
    //         setSavingJustFinished(true);
    //         setTimeout(function () {
    //             setSavingJustFinished(false);
    //         }, 2500);
    //     }
    // }, [saving])

    //Dispara quando clica fora da row que está sendo editada
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params: any, event: any) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        props.onEdit(id);
        
        // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (rowParams: GridRowParams) => () => {
        setSaving(true);
        setSavingRow(rowParams.row);
        setRowModesModel({ ...rowModesModel, [rowParams.id]: { mode: GridRowModes.View } });
        // setSaving(true);
        // setSavingRow(rowParams.row);
        // console.log(rowParams.row)
        // console.log(rows)
        // props.onSave && props.onSave(rowParams.row, finishedSavingCallback);
    };
    const sendRequest = (row: GridRowModel) => {
        props.onSave && props.onSave(row, finishedSavingCallback);
    }

    const handleDeleteClick = (id: GridRowId) => () => {
        var row = rows.filter((row: any) => row.id === id)[0];
        setSavingRow(row);
        setOpenDeleteDialog(true);
    };

    const handleViewClick = (id: GridRowId) => () => {
        var row = rows.filter((row: any) => row.id === id)[0];
        props.onView(row)
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row: any) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row: any) => row.id !== id));
        }
    };
    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        console.log("processRowUpdate", newRow);
        setSavingRow(newRow);
        // setRows(rows.map((row: any) => (row.id == 0 ? updatedRow : row)));
        sendRequest(updatedRow);
        // setRowModesModel({ ...rowModesModel, [newRow.id]: { mode: GridRowModes.View } });
        // return updatedRow;
        //TODO: Add connection with error cases and stop cell updating
        //to avoid going back to view mode
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const saveIcon = (params: any): JSX.Element => {
        var loadingIcon = <CircularProgress size={20} />;
        var icon = <></>;
        const isThisRowUpdating = ((saving || savingJustFinished) && savingRow.id == params.id);
        if (saving && isThisRowUpdating) {
            icon = loadingIcon;
        }
        else if (savingJustFinished && isThisRowUpdating) {
            if (saveResponse.status == 200)
                icon = <DoneIcon sx={{ color: "success.main" }} />
            else
                icon = <ErrorIcon sx={{ color: "error.main" }} />
        }
        else {
            icon = <SaveIcon />
        }
        return icon;
    }
    const finishedDeletingCallback = (response: AxiosResponse) => {
        setSaveResponse(response);
        var tooltipTime = 2500;
        if (response.status != 200 && response.status !== 204) {
            tooltipTime = 5000;
        } else if (response.status == 200 || response.status == 204) {
            setRows(rows.filter((row: any) => row.id !== savingRow.id));
        }
        setSaving(false);
        setSavingJustFinished(true);
        setTimeout(function () {
            setSavingJustFinished(false);
            // setSaveResponse({} as ApiResponse);
        }, tooltipTime);
    }
    React.useEffect(() => {
        //Quando o novo registro é inserido, atualiza o id no datagrid para o id retornado pelo backend
        if (savingRow.isNew && saveResponse.status == 200 && !saving && !savingJustFinished) {
            var newRows = rows.map(
                (row: any) => {
                    if (row.id == savingRow.id) {
                        return { ...savingRow, isNew: false, id: saveResponse.data }
                    }
                    return row;
                });
            setRows(newRows);
        }
    }, [savingJustFinished]);

    const finishedSavingCallback = (response: AxiosResponse) => {
        setSaveResponse(response);
        var tooltipTime = 2500;
        if (saveResponse.status != 200) {
            var oldRow = rows[savingRow.id];
            setRowModesModel({ ...rowModesModel, [savingRow.id]: { mode: GridRowModes.Edit } });
            tooltipTime = 5000;
        } else if (saveResponse.status == 200) {
            setRowModesModel({ ...rowModesModel, [savingRow.id]: { mode: GridRowModes.View } });
            // sendRequest(savingRow);
        }
        setSaving(false);
        setSavingJustFinished(true);
        setTimeout(function () {
            setSavingJustFinished(false);
        }, tooltipTime);
    }
    var shouldShowActions = props.canDelete || props.canUpdate || props.canView || saving || savingRow.id == 0;
    var actions: GridColDef = {
        field: 'actions',
        type: 'actions',
        headerName: 'Ações',
        width: 120,
        align: 'center',
        headerAlign: 'center',
        cellClassName: 'actions',
        getActions: (params: any) => {
            const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;
            const isThisRowUpdating = ((saving || savingJustFinished) && savingRow.id == params.id);
            if (isInEditMode || isThisRowUpdating) {
                return [
                    <Tooltip
                        open={isThisRowUpdating && !saving}
                        title={saveResponse?.statusText?.toString()}
                        arrow
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    bgcolor: `${saveResponse?.status == 200 ? 'success' : 'error'}.main`,
                                    '& .MuiTooltip-arrow': {
                                        color: `${saveResponse?.status == 200 ? 'success' : 'error'}.main`,
                                    },
                                },
                            }
                        }}
                    >
                        <GridActionsCellItem
                            icon={saveIcon(params) as ReactElement<any, string | JSXElementConstructor<any>>}
                            label="Save"
                            sx={{ color: 'warning.main' }}
                            onClick={!saving && !savingJustFinished ? handleSaveClick(params) : () => { }}
                        />
                    </Tooltip >
                    ,
                    !isThisRowUpdating ? <GridActionsCellItem
                        icon={<CancelIcon />}
                        label="Cancel"
                        className="textPrimary"
                        sx={{ color: 'error.main' }}
                        onClick={handleCancelClick(params.id)}
                    /> : <></>,
                ];
            }
            var icones = [];
            var canView = false;
            if(params?.row?.published != undefined){
                canView = props?.canView && params?.row?.published;
            } else {
                canView = props?.canView ?? false;
            }
            if (canView)
                icones.push(<GridActionsCellItem
                    icon={<DescriptionIcon />}
                    label="Visualizar"
                    onClick={handleViewClick(params.id)}
                    sx={{ color: 'primary.main' }}
                />);
            if (props.canUpdate)
                icones.push(<GridActionsCellItem
                    disabled={!props.canUpdate}
                    icon={<EditIcon />}
                    label="Editar"
                    onClick={handleEditClick(params.id)}
                    sx={{ color: 'warning.main' }} />);

            if (props.canDelete)
                icones.push(<GridActionsCellItem
                    icon={<DeleteForeverIcon />}
                    label="Excluir"
                    onClick={handleDeleteClick(params.id)}
                    sx={{ color: 'error.main' }}
                />);
            return icones;
        },
    };
    const handleAddRowClick = () => {
        // Get the last row from the existing rows list
        const lastRow = rows[rows?.length - 1];

        // Create a new row with initialized fields
        const newRow = {
            ...initializeObject(lastRow), // Initialize the fields with the desired value
            id: 0,
            isNew: true
        };
        // console.log(newRow);
        // Add the new row to the rows list
        setRows((oldRows: any) => [...oldRows, newRow]);

        // Update the rowModesModel with a new entry
        setRowModesModel((oldModel: any) => ({
            ...oldModel,
            [0]: { mode: GridRowModes.Edit, fieldToFocus: props.datagridProps.columns[0].field },
        }));
    };
    const handleOnDelete = () => {
        setSaving(true);
        props.onDelete(savingRow.id, finishedDeletingCallback);
    }
    // const handleAddRowClick = () => {
    //     setRows((oldRows: any) => [...oldRows, { id: 0, isNew: true }]);
    //     setRowModesModel((oldModel: any) => ({
    //         ...oldModel,
    //         [0]: { mode: GridRowModes.Edit, fieldToFocus: props.columns[0].field },
    //     }));
    // };
    var columns = props.datagridProps.columns;
    var canInsert = props.canInsert;
    var toolbarProps = { 
        ...props.toolbarProps, 
        handleAddRowClick: props?.onInsert != undefined ? 
                                props.onInsert : handleAddRowClick, 
        canInsert };
    return (
        <Paper
            elevation={1}
            sx={{
                // height: 500,
                display: "grid",
                margin: '15px 0',
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <StyledDataGrid
                {...props.datagridProps}
                rows={rows}
                sx={{
                    '.MuiDataGrid-footerContainer': {
                        display: props.enablePagination ? 'inline-flex' : 'none'
                    },
                    '.MuiTablePagination-selectLabel': { margin: '0px !important' },
                    '.MuiTablePagination-displayedRows': { margin: '0px !important' },
                }}
                columns={shouldShowActions || props.canInsert ? [...props.datagridProps.columns, actions] : props.datagridProps.columns}
                editMode="row"
                apiRef={apiRef}
                rowModesModel={rowModesModel}
                // onRowDoubleClick={handleRowDoubleClick}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onCellKeyDown={
                    (params: any, event: any) => {
                        event.defaultMuiPrevented = true;
                    }
                }
                slots={{ toolbar: CustomToolbar }}
                // slotProps={{toolbar: {showQuickFilter: true}}}
                slotProps={{ toolbar: toolbarProps }}
                //Desabilita edição de rows quando não pode update
                onRowEditStart={(params: any, event: MuiEvent) => {
                    if (!props.canUpdate)
                        event.defaultMuiPrevented = true;
                }}
            />
            {handleOnDelete &&
                <DeleteDialog
                    onDelete={() => handleOnDelete()}
                    titulo={props.tituloDeleteDialog ? props.tituloDeleteDialog : "Confirma exclusão?"}
                    textoBotaoConfirma={props.textoBotaoConfirmaDeleteDialog ?
                        props.textoBotaoConfirmaDeleteDialog : "Confirma"}
                    texto={
                        props.textoDeleteDialog ?
                            props.textoDeleteDialog
                            :
                            "Esta ação não pode ser desfeita"
                    }
                    open={openDeleteDialog}
                    setOpen={setOpenDeleteDialog} />
            }
        </Paper>
    );
}