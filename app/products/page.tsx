"use client";
import React, { useState } from "react";
import { usePublicInitialFetch } from "../hooks/fetch";
import { useCheckAuth } from "../hooks/auth";
import {
    CircularProgress,
    Container,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import Navbar from "../(components)/Navbar";
import ProductsDataTable from "./(components)/ProductsDataTable";
import CreateNewProductDialog from "./(components)/modals/CreateNewProductDialog";
import ProductActionCard from "./(components)/ProductActionCard";

export default function ProductsPage() {
    // useCheckAuth();
    const [isLoading, data] = usePublicInitialFetch("/products/");
    const [createOpen, setCreateOpen] = useState<boolean>(false);

    return (
        <Container>
            <Navbar />
            <Typography
                fontStyle={"italic"}
                sx={{ marginBottom: "30px", textAlign: "center" }}
                component="h1"
                variant="h4"
            >
                Products
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
                <strong>Products</strong> show all offerings offered to the
                customers.
            </Typography>
            {/* <Typography
                fontStyle={"italic"}
                sx={{ marginBottom: "30px", textAlign: "center" }}
                component="h1"
                variant="h5"
            >
                Actions
            </Typography> */}
            <Grid
                container
                gap={2}
                spacing={0}
                marginBottom={7}
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
                <ProductActionCard
                    name={"Create New Product"}
                    description={
                        "Adds a new product to the database. Will be showed to the users on the ticketing website. "
                    }
                    onClick={() => setCreateOpen(true)}
                />
            </Grid>
            <CreateNewProductDialog
                open={createOpen}
                handleClose={() => setCreateOpen(false)}
            />
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
                    <ProductsDataTable rows={data} />
                )}
            </Container>
        </Container>
    );
}
