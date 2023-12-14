"use client";
import { Container, Grid, Typography } from "@mui/material";
import Navbar from "../../(components)/Navbar";
import React from "react";
import SendAllForm from "./(components)/SendAllForm";
import { useCheckAuth } from "@/app/hooks/auth";

export default function SendManyPage() {
    useCheckAuth();
    return (
        <Container sx={{ minWidth: "100vw" }}>
            <Navbar />
            <Typography
                fontStyle={"italic"}
                sx={{ marginBottom: "30px", textAlign: "center" }}
                component="h1"
                variant="h4"
            >
                Send All
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
                Send to everyone who has purchased ICN tickets
            </Typography>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={3}>
                    <SendAllForm />
                </Grid>
            </Grid>
        </Container>
    );
}
