import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { GridColDef, GridRowModes, GridRowModesModel, GridRowsProp, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from "@mui/x-data-grid";

export interface CustomToolbarProps {
    handleAddRowClick?: () => void;
    addNewRowLabel?: string;
    canInsert?: boolean;
    showQuickFilter?: boolean;
    showFilterButton?: boolean;
}

export function CustomToolbar(props: CustomToolbarProps) {
    return (
        <GridToolbarContainer>
            {props.showQuickFilter && <GridToolbarQuickFilter />}

            {props.showFilterButton && <GridToolbarFilterButton />}

            {props.canInsert &&
                // @ts-ignore
                <Button
                    color="success"
                    startIcon={<AddIcon />}
                    // variant="outlined"
                    // sx={{m: '0 15px'}}
                    onClick={() => {
                        if (props.handleAddRowClick != undefined)
                            props?.handleAddRowClick()
                    }}
                >
                    {props.addNewRowLabel}
                </Button>
            }
            {/* <GridToolbarExport /> */}
            {/* <GridToolbarColumnsButton />
            <GridToolbarDensitySelector /> */}
        </GridToolbarContainer>
    );
}