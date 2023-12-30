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
    TextField,
} from "@mui/material";
import Cookies from "js-cookie";
import { useToastContext } from "@/app/(contexts)/ToastContext";

type DialogPropTypes = {
    open: boolean;
    handleClose: () => void;
};

export default function CreateNewProductDialog({
    open,
    handleClose,
}: DialogPropTypes) {
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const { setToastOpen, setToastMessage } = useToastContext();

    const handleAddProduct = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setIsAdding(true);

        const formData = new FormData(event.currentTarget);

        const productName = formData.get("productName") as string;
        const matineeTicketPriceSgd = parseFloat(
            formData.get("matineeTicketPriceSgd") as string
        );
        const nightTicketPriceSgd = parseFloat(
            formData.get("nightTicketPriceSgd") as string
        );
        const matineeTicketQuantity = parseInt(
            formData.get("matineeTicketQuantity") as string,
            10
        );
        const nightTicketQuantity = parseInt(
            formData.get("nightTicketQuantity") as string,
            10
        );
        const startPeriodSGT = formData.get("startPeriodSGT") as string;
        const endPeriodSGT = formData.get("endPeriodSGT") as string;
        const productDescription = formData.get("productDescription") as string;

        const requestBody = {
            productName,
            matineeTicketPriceSgd,
            nightTicketPriceSgd,
            matineeMaxQuantity: matineeTicketQuantity,
            nightMaxQuantity: nightTicketQuantity,
            startPeriodSgt: startPeriodSGT,
            endPeriodSgt: endPeriodSGT,
            productDescription,
        };

        try {
            const response = await fetch(
                `https://api.icnmusical.com/api/v1/products/protected`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get(
                            "access_token_cookie"
                        )}`,
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (response.ok) {
                setToastOpen(true);
                setToastMessage(
                    "Product added successfully! Please refresh the page to view changes"
                );
                console.log("Product added successfully");
            } else {
                console.error("Error adding product");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setIsAdding(false);
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle variant="h3" fontSize={20} marginTop={2}>
                Create Product
            </DialogTitle>

            {isAdding ? (
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
                <form onSubmit={handleAddProduct}>
                    <DialogContent>
                        <DialogContentText marginTop={2}>
                            Each product will have a <strong>matinee</strong> /{" "}
                            <strong>night</strong> option
                        </DialogContentText>
                        <Grid container gap={3} spacing={0} marginTop={2}>
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="productName"
                                name="productName"
                                label="Product Name"
                                variant="standard"
                            />
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="matineeTicketPriceSgd"
                                name="matineeTicketPriceSgd"
                                label="Matinee Ticket Price (SGD)"
                                variant="standard"
                                type="number"
                            />
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="nightTicketPriceSgd"
                                name="nightTicketPriceSgd"
                                label="Night Ticket Price (SGD)"
                                variant="standard"
                                type="number"
                            />
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="matineeTicketQuantity"
                                name="matineeTicketQuantity"
                                label="Matinee Ticket Quantity"
                                variant="standard"
                                type="number"
                            />
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="nightTicketQuantity"
                                name="nightTicketQuantity"
                                label="Night Ticket Quantity"
                                variant="standard"
                                type="number"
                            />
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="startPeriodSGT"
                                name="startPeriodSGT"
                                label="Start Period SGT (eg. 2023-12-10)"
                                variant="standard"
                            />
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="endPeriodSGT"
                                name="endPeriodSGT"
                                label="End Period SGT (eg. 2024-11-01)"
                                variant="standard"
                            />
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="productDescription"
                                name="productDescription"
                                label="Product Description"
                                variant="standard"
                            />
                        </Grid>

                        <DialogActions>
                            <Button type="button" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit">Add Product</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            )}
        </Dialog>
    );
}
