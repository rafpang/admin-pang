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

type OrderDataType = {
    totalPrice: number;
    buyerEmail: string;
    buyerPhoneNumber: string;
    buyerName: string;
    paymentMethod: string;
    paymentStatus: string;
};

type DialogPropTypes = {
    open: boolean;
    handleClose: () => void;
    orderData: any;
    orderId: number;
};

export default function UpdateOrderDialog({
    open,
    handleClose,
    orderData,
    orderId,
}: DialogPropTypes) {
    const router = useRouter();

    const [formData, setFormData] = useState<OrderDataType>({
        totalPrice: orderData.totalPrice,
        buyerEmail: orderData.buyerEmail,
        buyerPhoneNumber: orderData.buyerPhoneNumber,
        buyerName: orderData.buyerName,
        paymentMethod: orderData.paymentMethod,
        paymentStatus: orderData.paymentStatus,
    });

    const handleUpdateOrder = async () => {
        const requestBody: OrderDataType = {
            totalPrice: formData.totalPrice,
            buyerEmail: formData.buyerEmail,
            buyerPhoneNumber: formData.buyerPhoneNumber,
            buyerName: formData.buyerName,
            paymentMethod: formData.paymentMethod,
            paymentStatus: formData.paymentStatus,
        };

        try {
            const response = await fetch(
                `${API_URL}/orders/protected/${orderId}`,
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
                router.push("/orders");
                console.log("Order updated successfully");
            } else {
                console.error("Error updating order");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }

        handleClose();
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        key: keyof OrderDataType
    ) => {
        let value;
        if (key === "totalPrice") {
            value = parseFloat(e.target.value);
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
                Update Order
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleUpdateOrder}>
                    <Grid container gap={3} spacing={0} marginTop={2}>
                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            id="buyerName"
                            label="Buyer Name"
                            variant="standard"
                            value={formData.buyerName}
                            onChange={(e) => handleInputChange(e, "buyerName")}
                        />

                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            id="totalPrice"
                            label="Total Price"
                            variant="standard"
                            type="number"
                            value={formData.totalPrice}
                            onChange={(e) => handleInputChange(e, "totalPrice")}
                        />
                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            id="buyerEmail"
                            label="Buyer Email"
                            variant="standard"
                            value={formData.buyerEmail}
                            onChange={(e) => handleInputChange(e, "buyerEmail")}
                        />
                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            id="buyerPhoneNumber"
                            label="Buyer Phone Number"
                            variant="standard"
                            value={formData.buyerPhoneNumber}
                            onChange={(e) =>
                                handleInputChange(e, "buyerPhoneNumber")
                            }
                        />

                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            id="paymentMethod"
                            label="Payment Method"
                            variant="standard"
                            value={formData.paymentMethod}
                            onChange={(e) =>
                                handleInputChange(e, "paymentMethod")
                            }
                        />
                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            id="paymentStatus"
                            label="Payment Status"
                            variant="standard"
                            value={formData.paymentStatus}
                            onChange={(e) =>
                                handleInputChange(e, "paymentStatus")
                            }
                        />
                    </Grid>

                    <DialogActions>
                        <Button type="button" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Update Order</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}