import React, { useState } from "react";
import {
    Grid,
    Dialog,
    DialogContent,
    DialogTitle,
    CircularProgress,
    DialogContentText,
    Button,
    DialogActions,
    Container,
} from "@mui/material";
import BuyerInformation from "./(small-components)/BuyerInformation";
import PaymentMethod from "./(small-components)/PaymentMethod";
import TicketDetailsGroup from "./(small-components)/TicketDetailsGroup";
import Cookies from "js-cookie";

import { usePublicInitialFetch } from "@/app/hooks/fetch";
import { useToastContext } from "@/app/(contexts)/ToastContext";
import { BuyerInfo, Ticket } from "./(types)/types";

type DialogPropTypes = {
    open: boolean;
    handleClose: () => void;
};

export default function CreateOrderManuallyDialog({
    open,
    handleClose,
}: DialogPropTypes) {
    const { setToastOpen, setToastMessage } = useToastContext();

    const [isLoadingProducts, products] = usePublicInitialFetch("/products");
    const [isCreateLoading, setIsCreateLoading] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>("");

    const [ticketDetails, setTicketDetails] = useState<Ticket[]>([
        { audienceName: "", productId: -1, showTime: "" },
    ]);

    const [buyerInfo, setBuyerInfo] = useState<BuyerInfo>({
        buyerName: "",
        buyerPhoneNumber: "",
        buyerEmail: "",
    });

    const handleBuyerInputChange = (key: string, value: string) => {
        setBuyerInfo({ ...buyerInfo, [key]: value });
    };

    const handleAddOrder = () => {
        setTicketDetails([
            ...ticketDetails,
            { audienceName: "", productId: -1, showTime: "" },
        ]);
    };

    const handleRemoveOrder = (index: number) => {
        const updatedticketDetails = [...ticketDetails];
        updatedticketDetails.splice(index, 1);
        setTicketDetails(updatedticketDetails);
    };

    const handleTicketChange = (
        index: number,
        key: keyof Ticket,
        value: string | number
    ) => {
        const updatedticketDetails: Ticket[] = [...ticketDetails];
        updatedticketDetails[index] = {
            ...updatedticketDetails[index],
            [key]: value,
        };
        setTicketDetails(updatedticketDetails);
    };

    const handleCreateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requestBody = {
            buyerName: buyerInfo.buyerName.trim(),
            buyerPhoneNumber: buyerInfo.buyerPhoneNumber.trim(),
            buyerEmail: buyerInfo.buyerEmail.trim(),
            orders: ticketDetails.map((tickets) => ({
                ...tickets,
                audienceName: tickets.audienceName.trim(),
            })),
            paymentMethod: paymentMethod.trim(),
            paymentStatus: "successful",
        };

        try {
            setIsCreateLoading(true);

            const response = await fetch(
                `https://api.icnmusical.com/api/v1/ticketDetails/protected`,
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
                    "Order created successfully! Refresh the page to view changes. You may need to refresh the page several times."
                );

                setIsCreateLoading(false);

                setPaymentMethod("");

                setBuyerInfo({
                    buyerName: "",
                    buyerPhoneNumber: "",
                    buyerEmail: "",
                });
                setTicketDetails([
                    { audienceName: "", productId: -1, showTime: "" },
                ]);

                console.log("Order created successfully");
            } else {
                console.error("Error creating order");
            }
            handleClose();
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle variant="h3" fontSize={20} marginTop={2}>
                Create Order Manually
            </DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {isLoadingProducts || isCreateLoading ? (
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
                            <Grid container spacing={2} marginTop={2}>
                                <BuyerInformation
                                    buyerInfo={buyerInfo}
                                    onBuyerInputChange={handleBuyerInputChange}
                                />

                                <PaymentMethod
                                    paymentMethod={paymentMethod}
                                    onPaymentMethodChange={setPaymentMethod}
                                />

                                <TicketDetailsGroup
                                    ticketDetails={ticketDetails}
                                    products={products}
                                    onAddTicket={handleAddOrder}
                                    onRemoveTicket={handleRemoveOrder}
                                    onTicketChange={handleTicketChange}
                                />
                                <Container
                                    sx={{
                                        display: "flex",
                                        alignItems: "end",
                                        marginTop: "20px",
                                        justifyContent: "flex-end",

                                        position: "relative",
                                        left: "29px",
                                    }}
                                >
                                    <DialogActions>
                                        <Button
                                            type="button"
                                            size="small"
                                            color="error"
                                            sx={{ fontSize: 14 }}
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            size="small"
                                            sx={{ fontSize: 14 }}
                                        >
                                            Create
                                        </Button>
                                    </DialogActions>
                                </Container>
                            </Grid>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
