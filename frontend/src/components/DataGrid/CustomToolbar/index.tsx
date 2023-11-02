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
            {props.canInsert &&
                // @ts-ignore
                <Button color="primary" startIcon={<AddIcon />} onClick={() => props.handleAddRowClick()}>
                    {props.addNewRowLabel}
                </Button>
            }
            {props.showQuickFilter && <GridToolbarQuickFilter />}

            {props.showFilterButton && <GridToolbarFilterButton />}

            {/* <GridToolbarExport /> */}
            {/* <GridToolbarColumnsButton />
            <GridToolbarDensitySelector /> */}
        </GridToolbarContainer>
    );
}