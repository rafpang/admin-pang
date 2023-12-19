import React from "react";
import {
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button,
} from "@mui/material";
import Cookies from "js-cookie";
import { API_URL } from "@/app/settings";
import { useRouter } from "next/navigation";

type DialogPropTypes = {
    open: boolean;
    handleClose: () => void;
};

export default function CreateNewProductDialog({
    open,
    handleClose,
}: DialogPropTypes) {
    const router = useRouter();
    const handleAddProduct = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
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
        console.log(requestBody);

        try {
            const response = await fetch(`${API_URL}/products/protected/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get(
                        "access_token_cookie"
                    )}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                // router.push("/products");
                // handleClose();x
                console.log("Product added successfully");
            } else {
                console.error("Error adding product");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }

        // handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle variant="h3" fontSize={20} marginTop={2}>
                Create Product
            </DialogTitle>
            <DialogContent>
                <DialogContentText marginTop={2}>
                    Each product will have a <strong>matinee</strong> /{" "}
                    <strong>night</strong> option
                </DialogContentText>
                <form onSubmit={handleAddProduct}>
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

                        <Grid container item spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    autoFocus
                                    margin="dense"
                                    id="matineeTicketPriceSgd"
                                    name="matineeTicketPriceSgd"
                                    label="Matinee Ticket Price (SGD)"
                                    variant="standard"
                                    type="number" // Specify the input type as number
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    autoFocus
                                    margin="dense"
                                    id="nightTicketPriceSgd"
                                    name="nightTicketPriceSgd"
                                    label="Night Ticket Price (SGD)"
                                    variant="standard"
                                    type="number" // Specify the input type as number
                                />
                            </Grid>
                        </Grid>

                        <Grid container item spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    autoFocus
                                    margin="dense"
                                    id="matineeTicketQuantity"
                                    name="matineeTicketQuantity"
                                    label="Matinee Ticket Quantity"
                                    variant="standard"
                                    type="number" // Specify the input type as number
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    autoFocus
                                    margin="dense"
                                    id="nightTicketQuantity"
                                    name="nightTicketQuantity"
                                    label="Night Ticket Quantity"
                                    variant="standard"
                                    type="number" // Specify the input type as number
                                />
                            </Grid>
                        </Grid>

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
                            label="End Period SGT (eg. 2024-11-01) "
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
                </form>
            </DialogContent>
        </Dialog>
    );
}
