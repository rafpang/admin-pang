"use client";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";

import { Box, Button } from "@mui/material";
import { useState } from "react";
import DeleteProductDialog from "./modals/DeleteProductDialog";
import UpdateProductDialog from "./modals/UpdateProductDialog";

export default function ProductDataTableButtonGroup({
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
            <UpdateProductDialog
                open={updateModalOpen}
                handleClose={() => setUpdateModalOpen(false)}
                productData={cellValues.row}
                productId={cellValues.row.productId}
            />
            <Button
                variant="contained"
                color="error"
                sx={{ marignLeft: 2, fontSize: 11 }}
                onClick={() => setDeleteModalOpen(true)}
            >
                Delete
            </Button>
            <DeleteProductDialog
                open={deleteModalOpen}
                handleClose={() => setDeleteModalOpen(false)}
                productId={cellValues.row.productId}
            />
        </Box>
    );
}
