import React, { useState } from "react";
import {
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    CircularProgress,
    DialogContentText,
} from "@mui/material";
import { API_URL } from "@/app/settings";
import Cookies from "js-cookie";
import { useToastContext } from "@/app/(contexts)/ToastContext";

type DialogPropTypes = {
    open: boolean;
    productId: number;
    handleClose: () => void;
};

export default function DeleteProductDialog({
    open,
    handleClose,
    productId,
}: DialogPropTypes) {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const { setToastOpen, setToastMessage } = useToastContext();

    async function handleDelete(e: any) {
        e.preventDefault();
        setIsDeleting(true);
        const response = await fetch(
            `${API_URL}/products/protected/${productId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${Cookies.get(
                        "access_token_cookie"
                    )}`,
                },
            }
        );
        if (response.ok) {
            setIsDeleting(false);
            setToastOpen(true);
            setToastMessage(
                "Product deleted! Refresh the page to view changes"
            );
        }
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle variant="h3" fontSize={20} marginTop={2}>
                Delete Product
            </DialogTitle>
            {isDeleting ? (
                <Grid
                    container
                    minHeight={300}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress size={120} />
                    </Grid>
                </Grid>
            ) : (
                <form onSubmit={handleDelete}>
                    <DialogContent>
                        <DialogContentText marginTop={2}>
                            {`Are you sure that you want to delete product with Product ID ${productId}?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button type="button" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Delete Product</Button>
                    </DialogActions>
                </form>
            )}
        </Dialog>
    );
}
