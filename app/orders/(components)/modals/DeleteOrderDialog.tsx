import React, { useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import { API_URL } from "@/app/settings";
import Cookies from "js-cookie";
import { CircularProgress, Grid } from "@mui/material";
import { useToastContext } from "@/app/(contexts)/ToastContext";

type DialogPropTypes = {
    open: boolean;
    orderId: number;
    handleClose: () => void;
};

export default function DeleteOrderDialog({
    open,
    handleClose,
    orderId,
}: DialogPropTypes) {
    const [deleteAudience, setDeleteAudience] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const { setToastOpen, setToastMessage } = useToastContext();

    async function handleDelete(e: any) {
        e.preventDefault();
        setIsDeleting(true);
        const response = await fetch(
            deleteAudience
                ? `${API_URL}/orders/protected/audiences/${orderId}`
                : `${API_URL}/orders/protected/${orderId}`,
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
            setToastOpen(true);
            setToastMessage(
                "Order deleted! Please refresh the page to view changes. You may need to refresh the page several times."
            );
            setIsDeleting(false);
        }
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle variant="h3" fontSize={20} marginTop={2}>
                Delete Order
            </DialogTitle>
            <DialogContent>
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
                        <DialogContentText marginTop={2} marginBottom={5}>
                            {`Are you sure that you want to delete order with Order ID ${orderId}?`}
                        </DialogContentText>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={deleteAudience}
                                    onChange={() =>
                                        setDeleteAudience(
                                            (deleteAudience) => !deleteAudience
                                        )
                                    }
                                />
                            }
                            label="Delete Audience with this Order ID"
                        />
                        <DialogActions>
                            <Button type="button" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit">Delete Order</Button>
                        </DialogActions>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
