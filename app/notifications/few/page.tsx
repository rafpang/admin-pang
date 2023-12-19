"use client";

import { Container, Grid, Typography } from "@mui/material";
import Navbar from "../../../app/(components)/Navbar";
import React from "react";
import SendFewForm from "./(components)/SendFewForm";
import { useCheckAuth } from "@/app/hooks/auth";

export default function SendFewPage() {
    useCheckAuth();

    return (
        <Container sx={{ minWidth: "100vw" }}>
            <Navbar />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={3}>
                    <Typography
                        fontStyle={"italic"}
                        sx={{ marginBottom: "30px", textAlign: "center" }}
                        component="h1"
                        variant="h4"
                    >
                        Send One or Few Emails
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
                        To send only <strong>one</strong> email, simply add the
                        recipient address in the field. To send{" "}
                        <strong>multiple</strong>, add the recipient addresses
                        in <strong>comma-separated format</strong>. example:
                        pang@gmail.com, pangsit@gmail.com
                    </Typography>

                    <SendFewForm />
                </Grid>
            </Grid>
        </Container>
    );
}
