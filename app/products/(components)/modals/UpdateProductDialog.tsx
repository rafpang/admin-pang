import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { useToastContext } from "@/app/(contexts)/ToastContext";
import Cookies from "js-cookie";

type CompleteProduct = {
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

const EXCLUDED_PRODUCT_FIELDS = ["productId", "createdAt", "updatedAt"];

export default function UpdateProductDialog({
    open,
    handleClose,
    productData,
    productId,
}: DialogPropTypes) {
    const { setToastOpen, setToastMessage } = useToastContext();
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const { handleSubmit, control } = useForm<CompleteProduct>({
        defaultValues: {
            productName: productData.productName,
            matineeTicketPriceSgd: productData.matineeTicketPriceSgd,
            nightTicketPriceSgd: productData.nightTicketPriceSgd,
            matineeTicketStock: productData.matineeTicketStock,
            nightTicketStock: productData.nightTicketStock,
            allocatedMatineeTicketStock:
                productData.allocatedMatineeTicketStock,
            allocatedNightTicketStock: productData.allocatedNightTicketStock,
            startPeriodSgt: trimDateString(productData.startPeriodSgt),
            endPeriodSgt: trimDateString(productData.endPeriodSgt),
            productDescription: productData.productDescription,
        },
    });

    const onSubmit = async (formData: CompleteProduct) => {
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
                    body: JSON.stringify(formData),
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Grid container gap={3} spacing={0} marginTop={2}>
                            {Object.entries(productData)
                                .filter(
                                    ([key, _]) =>
                                        !EXCLUDED_PRODUCT_FIELDS.includes(key)
                                )
                                .map(([key, _]) => (
                                    <Grid item xs={12} key={key}>
                                        <Controller
                                            name={key as keyof CompleteProduct}
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    autoFocus
                                                    margin="dense"
                                                    id={key}
                                                    label={key
                                                        .replace(
                                                            /([A-Z])/g,
                                                            " $1"
                                                        )
                                                        .replace(/^./, (str) =>
                                                            str.toUpperCase()
                                                        )}
                                                    variant="standard"
                                                    type={
                                                        typeof productData[
                                                            key
                                                        ] === "number"
                                                            ? "number"
                                                            : "text"
                                                    }
                                                />
                                            )}
                                        />
                                    </Grid>
                                ))}
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
