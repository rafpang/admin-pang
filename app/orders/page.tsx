"use client";
import React, { useState } from "react";
import { useCheckAuth } from "../hooks/auth";
import { useAuthorizedInitialFetch } from "../hooks/fetch";
import Navbar from "../(components)/Navbar";
import { Container, Typography, CircularProgress, Grid } from "@mui/material";
import OrderDataTable from "./(components)/OrderDataTable";
import OrderActionCard from "./(components)/OrderActionCard";
import CreateOrderManuallyDialog from "./(components)/modals/CreateOrderManuallyDialog";
import SuccessToast from "../(components)/(small-components)/SuccessToast";

export default function OrdersPage() {
    useCheckAuth();
    const [isLoading, data] = useAuthorizedInitialFetch(
        "https://api.icnmusical.com/api/v1/orders/protected"
    );
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [toastOpen, setToastOpen] = useState<boolean>(false);
    return (
        <Container>
            <Navbar />
            <Typography
                fontStyle={"italic"}
                sx={{ marginBottom: "30px", textAlign: "center" }}
                component="h1"
                variant="h4"
            >
                Orders
            </Typography>
            <Typography
                fontStyle={"italic"}
                sx={{
                    marginBottom: "30px",
                    textAlign: "center",
                    fontSize: "16px",
                }}
                component="h1"
                variant="h5"
            >
                <strong>Orders</strong> shows all of the orders of ICN 2024. If
                the <strong>payment status</strong> is <i>pending</i> or{" "}
                <i>unknown</i>, the order is still ongoing (in Stripe checkout).
                The table below can be used as if it is an excel table, click on
                the column to filter and find certain values.
            </Typography>

            <Grid
                container
                gap={2}
                spacing={0}
                marginBottom={5}
                marginTop={5}
                alignItems="center"
                justifyContent="center"
                sx={{
                    "@media (max-width: 800px)": {
                        flexDirection: "column",
                        alignItems: "center",
                        "& hr": {
                            width: "100%",
                            marginTop: "10px",
                            marginBottom: "10px",
                            textAlign: "center",
                        },
                    },
                }}
            >
                <OrderActionCard
                    name={"Create Order Manually"}
                    description={
                        "Create and send tickets manually, USE ONLY IF a buyer is struggling using Stripe."
                    }
                    onClick={() => setIsCreateModalOpen(true)}
                />
                <CreateOrderManuallyDialog
                    open={isCreateModalOpen}
                    handleClose={() => setIsCreateModalOpen(false)}
                    setToastOpen={setToastOpen}
                />
            </Grid>
            <Typography
                fontStyle={"italic"}
                sx={{ marginBottom: "30px", textAlign: "center" }}
                component="h1"
                variant="h5"
            >
                Orders Table
            </Typography>
            <Container sx={{ marginBottom: 5 }}>
                {isLoading === true ? (
                    <Grid
                        container
                        spacing={0}
                        marginTop={20}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item xs={3} sx={{ maxWidth: "100vw" }}>
                            <CircularProgress size={100} />
                        </Grid>
                    </Grid>
                ) : (
                    <OrderDataTable rows={data} />
                )}
            </Container>

            <SuccessToast
                open={toastOpen}
                setOpen={setToastOpen}
                message={
                    "Order created successfully! Refresh the page to view changes. You may need to refresh the page multiple times."
                }
            />
        </Container>
    );
}
