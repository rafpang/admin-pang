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

    async function handleDelete() {
        await fetch(
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

        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <form onSubmit={handleDelete}>
                <DialogTitle variant="h3" fontSize={20} marginTop={2}>
                    Delete Order
                </DialogTitle>
                <DialogContent>
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
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Delete Order</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
