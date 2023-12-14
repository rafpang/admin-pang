import { Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProgressBar from "./(small-components)/ProgressBar";

const columns: GridColDef[] = [
    {
        field: "paymentMethod",
        headerName: "PaymentMethod",
        type: "number",
        width: 170,
    },

    {
        field: "numPaymentSuccess",
        headerName: "SuccessfulPayments",
        type: "string",
        width: 170,
    },

    {
        field: "numPaymentFailed",
        headerName: "FailedPayments",
        type: "string",
        width: 170,
    },

    {
        field: "PaymentSuccessRate",
        width: 200,
        renderCell: (cellValues) => {
            const value = cellValues.row.numPaymentSuccess;
            const maxValue =
                cellValues.row.numPaymentSuccess +
                cellValues.row.numPaymentFailed;
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
                    getRowId={(row) => row.paymentMethod}
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
