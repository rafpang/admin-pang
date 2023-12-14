import { Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import OrderTableButtonGroup from "./OrderTableButtonGroup";

const columns: GridColDef[] = [
    {
        field: "orderId",
        headerName: "OrderId",
        type: "number",
        width: 100,
    },

    {
        field: "buyerName",
        headerName: "BuyerName",
        type: "string",
        width: 200,
    },
    {
        field: "Actions",
        width: 200,

        renderCell: (cellValues) => {
            return <OrderTableButtonGroup cellValues={cellValues} />;
        },
    },
    {
        field: "buyerEmail",
        headerName: "BuyerEmail",
        type: "string",
        width: 200,
    },
    {
        field: "buyerPhoneNumber",
        headerName: "BuyerPhone",
        type: "string",
        width: 150,
    },
    {
        field: "totalPrice",
        headerName: "TotalPrice",
        type: "number",
        width: 150,
    },

    {
        field: "createdAt",
        headerName: "createdAt",
        width: 200,
    },

    { field: "paymentMethod", headerName: "PaymentMethod", width: 100 },
    { field: "paymentStatus", headerName: "PaymentStatus", width: 100 },
];

export default function OrderDataTable({ rows }: { rows: any[] }) {
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
                    getRowId={(row) => row.orderId}
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
