import React, { useState, ChangeEvent } from "react";
import {
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";
import { API_URL } from "@/app/settings";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useToastContext } from "@/app/(contexts)/ToastContext";

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
    productDescription: string;
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
    const { setToastOpen, setToastMessage } = useToastContext();

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
        productDescription: productData.productDescription,
    });

    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const handleUpdateProduct = async () => {
        const requestBody = {
            ...formData,
        };

        try {
            setIsUpdating(true);
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
                setToastOpen(true);
                setToastMessage(
                    "Product updated successfully! Please refresh the page to view changes"
                );
                console.log("Product updated successfully");
                handleClose();
            } else {
                console.error("Error updating product");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setIsUpdating(false);
            handleClose();
        }
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
            {isUpdating ? (
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
                <form onSubmit={handleUpdateProduct}>
                    <DialogContent>
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
                            <TextField
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="matineeTicketPriceSgd"
                                label="Matinee Ticket Price (SGD)"
                                variant="standard"
                                type="number"
                                value={formData.matineeTicketPriceSgd}
                                onChange={(e) =>
                                    handleInputChange(
                                        e,
                                        "matineeTicketPriceSgd"
                                    )
                                }
                            />
                            <TextField
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="nightTicketPriceSgd"
                                label="Night Ticket Price (SGD)"
                                variant="standard"
                                type="number"
                                value={formData.nightTicketPriceSgd}
                                onChange={(e) =>
                                    handleInputChange(e, "nightTicketPriceSgd")
                                }
                            />
                            <TextField
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="matineeTicketStock"
                                label="Matinee Ticket Stock"
                                variant="standard"
                                type="number"
                                value={formData.matineeTicketStock}
                                onChange={(e) =>
                                    handleInputChange(e, "matineeTicketStock")
                                }
                            />
                            <TextField
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="nightTicketStock"
                                label="Night Ticket Stock"
                                variant="standard"
                                type="number"
                                value={formData.nightTicketStock}
                                onChange={(e) =>
                                    handleInputChange(e, "nightTicketStock")
                                }
                            />
                            <TextField
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="allocatedMatineeTicketStock"
                                label="Total Matinee Quantity"
                                variant="standard"
                                type="number"
                                value={formData.allocatedMatineeTicketStock}
                                onChange={(e) =>
                                    handleInputChange(
                                        e,
                                        "allocatedMatineeTicketStock"
                                    )
                                }
                            />
                            <TextField
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="allocatedNightTicketStock"
                                label="Total Night Quantity"
                                variant="standard"
                                type="number"
                                value={formData.allocatedNightTicketStock}
                                onChange={(e) =>
                                    handleInputChange(
                                        e,
                                        "allocatedNightTicketStock"
                                    )
                                }
                            />
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
                                label="End Period SGT (eg. 2024-11-01)"
                                variant="standard"
                                value={formData.endPeriodSgt}
                                onChange={(e) =>
                                    handleInputChange(e, "endPeriodSgt")
                                }
                            />
                            <TextField
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="productDescription"
                                label="Product Description"
                                variant="standard"
                                value={formData.productDescription}
                                onChange={(e) =>
                                    handleInputChange(e, "productDescription")
                                }
                            />
                        </Grid>
                        <DialogActions>
                            <Button type="button" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit">Update Product</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            )}
        </Dialog>
    );
}
