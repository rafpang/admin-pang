import { Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProductDataTableButtonGroup from "./ProductDataTableButtonGroup";

const columns: GridColDef[] = [
    {
        field: "productId",
        headerName: "ProductID",
        type: "number",
        width: 100,
    },
    {
        field: "productName",
        headerName: "ProductName",
        type: "string",
        width: 120,
    },
    {
        field: "Actions",
        width: 200,

        renderCell: (cellValues) => {
            return <ProductDataTableButtonGroup cellValues={cellValues} />;
        },
    },
    {
        field: "productDescription",
        headerName: "ProductDescription",
        type: "string",
        width: 300,
    },

    {
        field: "startPeriodSgt",
        headerName: "StartPeriodSGT",
        type: "string",
        width: 200,
    },
    {
        field: "endPeriodSgt",
        headerName: "EndPeriodSGT",
        type: "string",
        width: 200,
    },
    {
        field: "matineeTicketPriceSgd",
        headerName: "SingleMatineePrice",
        type: "number",
        width: 120,
    },
    {
        field: "nightTicketPriceSgd",
        headerName: "SingleNightPrice",
        type: "number",
        width: 120,
    },

    {
        field: "matineeTicketStock",
        headerName: "MatineeStock",
        type: "number",

        width: 120,
    },
    {
        field: "nightTicketStock",
        headerName: "NightStock",
        type: "number",

        width: 120,
    },
    {
        field: "allocatedMatineeTicketStock",
        headerName: "MaxMatineeStock",
        type: "number",

        width: 120,
    },
    {
        field: "allocatedNightTicketStock",
        headerName: "MaxNightTicketStock",
        type: "number",

        width: 120,
    },
];

export default function ProductsDataTable({ rows }: { rows: any[] }) {
    return (
        <Container
            sx={{
                maxWidth: "100vw",
                minWidth: "20vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Container
                sx={{
                    width: "fit-content",
                    overflow: "hidden",
                }}
            >
                <DataGrid
                    rows={rows}
                    getRowId={(row) => row.productId}
                    columns={columns.map((col) => ({
                        ...col,
                        headerAlign: "center", // Center-align header names
                        align: "center", // Center-align cell values
                    }))}
                    autoHeight
                    pagination
                    pageSizeOptions={[100, 50]}
                />
            </Container>
        </Container>
    );
}
