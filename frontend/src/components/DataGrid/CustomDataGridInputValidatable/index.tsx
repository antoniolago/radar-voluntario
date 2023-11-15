import { GridEditInputCell, GridRenderEditCellParams } from "@mui/x-data-grid";
import Tooltip from '@mui/material/Tooltip'

export const CustomDataGridInputValidatable = (props: GridRenderEditCellParams) => {
    const { error } = props;

    return (
        // <StyledTooltip open={!!error} title={error} arrow>
        //     <GridEditInputCell {...props} />
        // </StyledTooltip>
        <Tooltip open={!!error} title={error} arrow
            componentsProps={{
                tooltip: {
                    sx: {
                        bgcolor: 'error.main',
                        '& .MuiTooltip-arrow': {
                            color: 'error.main',
                        },
                    },
                }
            }}
        >
                <GridEditInputCell {...props} />
        </Tooltip >
    );
}