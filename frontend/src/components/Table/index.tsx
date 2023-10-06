import { DataGrid } from "@mui/x-data-grid/DataGrid";

const Table = (props: any) => {
	return (
		<div style={{ maxHeight: 400, width: '100%' }}>

            <DataGrid
                rows={props.rows}
                columns={props.columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
            />
        </div>
    )
}

export default Table;
