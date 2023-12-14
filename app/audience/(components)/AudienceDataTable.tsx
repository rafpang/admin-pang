import { Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AttendanceButton from "./AttendanceButton";

const columns: GridColDef[] = [
    {
        field: "audienceId",
        headerName: "AudienceID",
        type: "number",
        width: 100,
    },

    {
        field: "audienceName",
        headerName: "Name",
        type: "string",
        width: 200,
    },
    {
        field: "ToggleAttendance",
        width: 200,
        renderCell: (cellValues) => {
            return (
                <AttendanceButton
                    attendanceShowTime={cellValues.row.showTime}
                    attendanceStatus={cellValues.row.isAttending}
                    audienceId={cellValues.row.audienceId}
                />
            );
        },
    },
    {
        field: "createdAt",
        headerName: "createdAt",
        width: 200,
    },

    { field: "showTime", headerName: "ShowTime", width: 100 },
    { field: "orderId", headerName: "OrderID", width: 100 },
    { field: "productId", headerName: "ProductID", width: 100 },
];

export default function AudienceDataTable({ rows }: { rows: any[] }) {
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
                    // className={classes.grid}
                    rows={rows}
                    getRowId={(row) => row.audienceId}
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
