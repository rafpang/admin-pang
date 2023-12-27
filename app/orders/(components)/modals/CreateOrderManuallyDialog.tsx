import React, { useState } from "react";
import {
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button,
    CircularProgress,
    MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { usePublicInitialFetch } from "@/app/hooks/fetch";
import SuccessToast from "@/app/(components)/(small-components)/SuccessToast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type Order = {
    audienceName: string;
    productId: number;
    showTime: string;
};

type Product = {
    productName: string;
    productId: number;
};

type DialogPropTypes = {
    open: boolean;
    handleClose: () => void;
    setToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateOrderManuallyDialog({
    open,
    handleClose,
    setToastOpen,
}: DialogPropTypes) {
    const [isLoading, products] = usePublicInitialFetch("/products");
    const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);

    const [buyerName, setBuyerName] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [buyerPhoneNumber, setBuyerPhoneNumber] = useState("");
    const [buyerEmail, setBuyerEmail] = useState("");
    const [orders, setOrders] = useState<Order[]>([
        { audienceName: "", productId: -1, showTime: "" },
    ]);

    const handleAddOrder = () => {
        setOrders([
            ...orders,
            { audienceName: "", productId: -1, showTime: "" },
        ]);
    };

    const handleRemoveOrder = (index: number) => {
        const updatedOrders = [...orders];
        updatedOrders.splice(index, 1);
        setOrders(updatedOrders);
    };

    const handleOrderChange = (
        index: number,
        key: keyof Order,
        value: string | number
    ) => {
        const updatedOrders: Order[] = [...orders];
        updatedOrders[index] = { ...updatedOrders[index], [key]: value };
        setOrders(updatedOrders);
    };

    const handleCreateOrder = async (e: any) => {
        e.preventDefault();
        const trimmedBuyerName = buyerName.trim();
        const trimmedBuyerPhoneNumber = buyerPhoneNumber.trim();
        const trimmedBuyerEmail = buyerEmail.trim();

        const trimmedOrders = orders.map((order) => ({
            ...order,
            audienceName: order.audienceName.trim(),
        }));

        const requestBody = {
            buyerName: trimmedBuyerName,
            buyerPhoneNumber: trimmedBuyerPhoneNumber,
            buyerEmail: trimmedBuyerEmail,
            orders: trimmedOrders,
            paymentMethod: paymentMethod.trim(),
            paymentStatus: "successful",
        };

        try {
            setIsSubmissionLoading(true);
            const response = await fetch(
                `https://api.icnmusical.com/api/v1/orders/protected`,
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
                setIsSubmissionLoading(false);

                setPaymentMethod("");
                setBuyerEmail("");
                setBuyerName("");
                setBuyerPhoneNumber("");

                setOrders([{ audienceName: "", productId: -1, showTime: "" }]);

                console.log("Order created successfully");
            } else {
                console.error("Error creating order");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }

        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle variant="h3" fontSize={20} marginTop={2}>
                Create Order Manually
            </DialogTitle>
            <DialogContent>
                {isLoading || isSubmissionLoading ? (
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
                    <>
                        <DialogContentText marginTop={2}>
                            Ensure that you have done the proper guidelines
                            before creating this order. An order must have at
                            least <strong>one ticket</strong>.
                        </DialogContentText>
                        <form onSubmit={handleCreateOrder}>
                            <Grid container spacing={3} marginTop={2}>
                                {/* Buyer Information */}
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoFocus
                                        margin="dense"
                                        id="buyerName"
                                        name="buyerName"
                                        label="Buyer Name"
                                        variant="standard"
                                        value={buyerName}
                                        onChange={(e) =>
                                            setBuyerName(e.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoFocus
                                        margin="dense"
                                        id="buyerPhoneNumber"
                                        name="buyerPhoneNumber"
                                        label="Buyer Phone Number"
                                        variant="standard"
                                        type="tel"
                                        value={buyerPhoneNumber}
                                        onChange={(e) =>
                                            setBuyerPhoneNumber(e.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoFocus
                                        margin="dense"
                                        id="buyerEmail"
                                        name="buyerEmail"
                                        label="Buyer Email"
                                        variant="standard"
                                        type="email"
                                        value={buyerEmail}
                                        onChange={(e) =>
                                            setBuyerEmail(e.target.value)
                                        }
                                    />
                                </Grid>

                                {/* Payment Method */}
                                <Grid item xs={12}>
                                    <Autocomplete
                                        fullWidth
                                        options={[
                                            "card",
                                            "paynow",
                                            "transfer",
                                            "invitation",
                                        ]}
                                        value={paymentMethod}
                                        onChange={(_, newValue) =>
                                            setPaymentMethod(newValue as string)
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                required
                                                fullWidth
                                                autoFocus
                                                margin="dense"
                                                id="paymentMethod"
                                                label="Payment Method"
                                                variant="standard"
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Order Details */}
                                {orders.map((order, index) => (
                                    <Grid
                                        container
                                        item
                                        spacing={3}
                                        key={index}
                                    >
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                required
                                                fullWidth
                                                autoFocus
                                                margin="dense"
                                                id={`audienceName-${index}`}
                                                name="audienceName"
                                                label="Audience Name"
                                                variant="standard"
                                                value={order.audienceName}
                                                onChange={(e) =>
                                                    handleOrderChange(
                                                        index,
                                                        "audienceName",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Autocomplete
                                                options={products}
                                                getOptionLabel={(
                                                    product: Product
                                                ) =>
                                                    `${product.productName} (ID: ${product.productId})`
                                                }
                                                value={
                                                    products.find(
                                                        (p: any) =>
                                                            p.productId ===
                                                            order.productId
                                                    ) || null
                                                }
                                                onChange={(_, newValue) => {
                                                    handleOrderChange(
                                                        index,
                                                        "productId",
                                                        newValue?.productId ||
                                                            -1
                                                    );
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        required
                                                        fullWidth
                                                        autoFocus
                                                        margin="dense"
                                                        id={`productLabel-${index}`}
                                                        label="Product"
                                                        variant="standard"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                required
                                                fullWidth
                                                autoFocus
                                                margin="dense"
                                                id={`showTime-${index}`}
                                                name="showTime"
                                                label="Show Time"
                                                variant="standard"
                                                select
                                                value={order.showTime}
                                                onChange={(e) =>
                                                    handleOrderChange(
                                                        index,
                                                        "showTime",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <MenuItem value="matinee">
                                                    matinee
                                                </MenuItem>
                                                <MenuItem value="night">
                                                    night
                                                </MenuItem>
                                            </TextField>
                                        </Grid>
                                        {index > 0 && (
                                            <Grid item xs={12} sm={4}>
                                                <Button
                                                    type="button"
                                                    color="error"
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() =>
                                                        handleRemoveOrder(index)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </Grid>
                                        )}
                                    </Grid>
                                ))}
                                <Grid item xs={12}>
                                    <Button
                                        type="button"
                                        color="primary"
                                        variant="contained"
                                        size="small"
                                        onClick={handleAddOrder}
                                    >
                                        Add audience
                                    </Button>
                                </Grid>
                            </Grid>

                            {/* Dialog Actions */}
                            <DialogActions>
                                <Button type="button" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" size="small">
                                    Create Order
                                </Button>
                            </DialogActions>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
