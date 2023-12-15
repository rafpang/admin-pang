"use client";
import React from "react";
import { useCheckAuth } from "../hooks/auth";
import { useAuthorizedInitialFetch } from "../hooks/fetch";
import Navbar from "../(components)/Navbar";
import {
    Container,
    Typography,
    CircularProgress,
    Grid,
    Divider,
} from "@mui/material";
import OrderDataTable from "./(components)/OrderDataTable";
import OrderActionCard from "./(components)/OrderActionCard";

export default function OrdersPage() {
    useCheckAuth();
    const [isLoading, data] = useAuthorizedInitialFetch("/orders/protected");
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
                <i>unknown</i>, the order is still ungoing (in Stripe checkout).
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
                    navigateTo="all"
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
        </Container>
    );
}