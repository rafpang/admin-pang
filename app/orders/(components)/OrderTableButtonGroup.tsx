"use client";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";

import { Box, Button } from "@mui/material";
import { useState } from "react";
import DeleteOrderDialog from "./modals/DeleteOrderDialog";
import UpdateOrderDialog from "./modals/UpdateOrderDialog";

export default function OrderTableButtonGroup({
    cellValues,
}: {
    cellValues: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
}) {
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

    return (
        <Box
            display="flex"
            justifyContent="center" // Center-align the content horizontally
            alignItems="center"
        >
            <Button
                variant="contained"
                color="success"
                sx={{ marginRight: 1, fontSize: 11 }}
                onClick={() => setUpdateModalOpen(true)}
            >
                Update
            </Button>
            <UpdateOrderDialog
                open={updateModalOpen}
                handleClose={() => setUpdateModalOpen(false)}
                orderData={cellValues.row}
                orderId={cellValues.row.orderId}
            />
            <Button
                variant="contained"
                color="error"
                sx={{ marignLeft: 2, fontSize: 11 }}
                onClick={() => setDeleteModalOpen(true)}
            >
                Delete
            </Button>
            <DeleteOrderDialog
                open={deleteModalOpen}
                handleClose={() => setDeleteModalOpen(false)}
                orderId={cellValues.row.orderId}
            />
        </Box>
    );
}
