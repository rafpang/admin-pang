import { Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProgressBar from "./(small-components)/ProgressBar";

const columns: GridColDef[] = [
    {
        field: "productName",
        headerName: "ProductName",
        type: "number",
        width: 120,
    },

    {
        field: "matineeTicketsSold",
        headerName: "MatineeTicketsSold",
        type: "number",
        width: 120,
    },
    {
        field: "nightTicketsSold",
        headerName: "NightTicketsSold",
        type: "number",
        width: 120,
    },

    {
        field: "MatineeSoldPercentage",
        width: 200,
        renderCell: (cellValues) => {
            const value = cellValues.row.matineeTicketsSold;
            const maxValue = cellValues.row.allocatedMatineeTicketStock;
            return <ProgressBar value={value} maxValue={maxValue} />;
        },
    },
    {
        field: "NightSoldPercentage",
        width: 200,
        renderCell: (cellValues) => {
            const value = cellValues.row.nightTicketsSold;
            const maxValue = cellValues.row.allocatedNightTicketStock;
            return <ProgressBar value={value} maxValue={maxValue} />;
        },
    },
];

export default function ProductStatisticsTable({ rows }: { rows: any[] }) {
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
                    getRowId={(row) => row.productName}
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
