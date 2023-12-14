import React, { useState, ChangeEvent } from "react";
import {
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
} from "@mui/material";
import { API_URL } from "@/app/settings";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type FormDataType = {
    productName: string;
    matineeTicketPriceSgd: number;
    nightTicketPriceSgd: number;
    matineeTicketStock: number;
    nightTicketStock: number;
    startPeriodSgt: string;
    endPeriodSgt: string;
    allocatedMatineeTicketStock: number;
    allocatedNightTicketStock: number;
};

type DialogPropTypes = {
    open: boolean;
    handleClose: () => void;
    productData: any;
    productId: number;
};

function trimDateString(fullDateString: string) {
    return fullDateString.substring(0, 10);
}

export default function UpdateProductDialog({
    open,
    handleClose,
    productData,
    productId,
}: DialogPropTypes) {
    const router = useRouter();

    const [formData, setFormData] = useState<FormDataType>({
        productName: productData.productName,
        matineeTicketPriceSgd: productData.matineeTicketPriceSgd,
        nightTicketPriceSgd: productData.nightTicketPriceSgd,
        matineeTicketStock: productData.matineeTicketStock,
        nightTicketStock: productData.nightTicketStock,
        allocatedMatineeTicketStock: productData.allocatedMatineeTicketStock,
        allocatedNightTicketStock: productData.allocatedNightTicketStock,
        startPeriodSgt: trimDateString(productData.startPeriodSgt),
        endPeriodSgt: trimDateString(productData.endPeriodSgt),
    });

    const handleUpdateProduct = async () => {
        const requestBody = {
            ...formData,
        };

        try {
            const response = await fetch(
                `${API_URL}/products/protected/${productId}`,
                {
                    method: "PATCH",
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
                router.push("/products");
                console.log("Product updated successfully");
            } else {
                console.error("Error updating product");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }

        handleClose();
    };
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        key: keyof FormDataType
    ) => {
        let value;
        if (key === "matineeTicketPriceSgd" || key === "nightTicketPriceSgd") {
            value = parseFloat(e.target.value);
        } else if (
            key === "matineeTicketStock" ||
            key === "nightTicketStock" ||
            key === "allocatedNightTicketStock" ||
            key === "allocatedMatineeTicketStock"
        ) {
            value = parseInt(e.target.value, 10);
        } else {
            value = e.target.value;
        }
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle variant="h3" fontSize={20} marginTop={2}>
                Update Product
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleUpdateProduct}>
                    <Grid container gap={3} spacing={0} marginTop={2}>
                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            id="productName"
                            label="Product Name"
                            variant="standard"
                            value={formData.productName}
                            onChange={(e) =>
                                handleInputChange(e, "productName")
                            }
                        />

                        <Grid container item spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    margin="dense"
                                    id="matineeTicketStock"
                                    label="Matinee Ticket Stock"
                                    variant="standard"
                                    type="number"
                                    value={formData.matineeTicketStock.toString()}
                                    onChange={(e) =>
                                        handleInputChange(
                                            e,
                                            "matineeTicketStock"
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    margin="dense"
                                    id="maxNightTicketStock"
                                    label="Night Ticket Stock"
                                    variant="standard"
                                    type="number"
                                    value={formData.nightTicketStock.toString()}
                                    onChange={(e) =>
                                        handleInputChange(e, "nightTicketStock")
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid container item spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    margin="dense"
                                    id="maxMatineeTicketStock"
                                    label="Total Matinee Quantity"
                                    variant="standard"
                                    type="number"
                                    value={
                                        formData.allocatedMatineeTicketStock
                                            ? formData.allocatedMatineeTicketStock.toString()
                                            : formData.matineeTicketStock.toString()
                                    }
                                    onChange={(e) =>
                                        handleInputChange(
                                            e,
                                            "allocatedMatineeTicketStock"
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    margin="dense"
                                    id="maxNightTicketStock"
                                    label="Total Night Quantity"
                                    variant="standard"
                                    type="number"
                                    value={
                                        formData.allocatedNightTicketStock
                                            ? formData.allocatedNightTicketStock.toString()
                                            : formData.nightTicketStock.toString()
                                    }
                                    onChange={(e) =>
                                        handleInputChange(
                                            e,
                                            "allocatedNightTicketStock"
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            id="startPeriodSgt"
                            label="Start Period SGT (eg. 2023-12-10)"
                            variant="standard"
                            value={formData.startPeriodSgt}
                            onChange={(e) =>
                                handleInputChange(e, "startPeriodSgt")
                            }
                        />
                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            id="endPeriodSgt"
                            label="End Period SGT (eg. 2024-11-01) "
                            variant="standard"
                            value={formData.endPeriodSgt}
                            onChange={(e) =>
                                handleInputChange(e, "endPeriodSgt")
                            }
                        />
                    </Grid>

                    <DialogActions>
                        <Button type="button" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Update Product</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}
