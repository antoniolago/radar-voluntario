import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { GridColDef, GridRowModes, GridRowModesModel, GridRowsProp, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Box, Tooltip } from "@mui/joy";
import { AuthService } from "@/api/auth";

export interface CustomToolbarProps {
    handleAddRowClick?: () => void;
    addNewRowLabel?: string;
    canInsert?: boolean;
    showQuickFilter?: boolean;
    showFilterButton?: boolean;
}

export function CustomToolbar(props: CustomToolbarProps) {
    const { data: curUser } = AuthService.useGetUser();
    const isLogged = curUser != undefined;
    return (
        <GridToolbarContainer>
            {props.showQuickFilter && <GridToolbarQuickFilter />}

            {props.showFilterButton && <GridToolbarFilterButton />}

            {props.canInsert &&
                <Tooltip
                    variant="outlined"
                    arrow
                    title={isLogged ? "" : "Logue na sua conta para usar esta funcionalidade"}>
                    <Box>
                        <Button
                            color="success"
                            disabled={!isLogged}
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

                    </Box>
                </Tooltip>
            }
            {/* <GridToolbarExport /> */}
            {/* <GridToolbarColumnsButton />
            <GridToolbarDensitySelector /> */}
        </GridToolbarContainer>
    );
}