"use client";
import React from "react";
import Navbar from "./(components)/Navbar";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import OrdersStatisticsTable from "./(components)/OrdersStatisticsTable";
import ProductStatisticsTable from "./(components)/ProductStatisticsTable";
import { useCheckAuth } from "./hooks/auth";
import { useAuthorizedInitialFetch } from "./hooks/fetch";

export default function MainPage() {
    useCheckAuth();
    const [isProductStatsLoading, productStats] = useAuthorizedInitialFetch(
        "https://api.icnmusical.com/api/v1/products/protected/statistics/sold"
    );
    const [isOrderStatsLoading, orderStats] = useAuthorizedInitialFetch(
        "https://api.icnmusical.com/api/v1/orders/protected/statistics/"
    );

    return (
        <Container sx={{ width: "100vw" }}>
            <Navbar />
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
            >
                {isProductStatsLoading || isOrderStatsLoading ? (
                    <Grid item marginTop={20}>
                        <CircularProgress size={80} />
                    </Grid>
                ) : (
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        alignItems="center"
                        direction="column"
                    >
                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent="center"
                            alignItems="center"
                            direction="column"
                        >
                            <Typography
                                fontStyle="italic"
                                sx={{ marginBottom: 4, textAlign: "center" }}
                                component="h1"
                                variant="h4"
                            >
                                Tickets Sold
                            </Typography>
                            <Container
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 2,
                                    marginBottom: 2,
                                }}
                            >
                                <ProductStatisticsTable rows={productStats} />
                            </Container>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent="center"
                            alignItems="center"
                            direction="column"
                        >
                            <Typography
                                fontStyle="italic"
                                sx={{ marginBottom: 4, textAlign: "center" }}
                                component="h1"
                                variant="h4"
                            >
                                Payments
                            </Typography>
                            <Container
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 2,
                                }}
                            >
                                <OrdersStatisticsTable rows={orderStats} />
                            </Container>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}
