import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { API_URL } from "@/app/settings";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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
    async function handleDelete() {
        await fetch(`${API_URL}/products/protected/${productId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token_cookie")}`,
            },
        });

        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <form onSubmit={handleDelete}>
                <DialogTitle variant="h3" fontSize={20} marginTop={2}>
                    Delete Product
                </DialogTitle>
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
        </Dialog>
    );
}
