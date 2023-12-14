"use client";
import React from "react";
import CardOption from "./(components)/CardOption";
import Navbar from "../(components)/Navbar";
import { Container, Divider, Grid, Typography } from "@mui/material";
import { useCheckAuth } from "../hooks/auth";

export default function NotificationsPage() {
    useCheckAuth();
    return (
        <Container>
            <Navbar />
            <Typography
                fontStyle={"italic"}
                sx={{ marginBottom: "30px", textAlign: "center" }}
                component="h1"
                variant="h4"
            >
                Send Notifications
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
                <strong>Notifications</strong> are used to send specific emails
                that are not new orders, directed at those that have{" "}
                <em>purchased</em> ICN tickets. Use cases include notifying
                everyone of a change in show time, or to give reminders to bring
                tickets to the show.
            </Typography>
            <Grid
                container
                gap={2}
                spacing={0}
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
                <CardOption
                    name={"Send All"}
                    description={
                        "Send to everyone who have purchased ICN tickets"
                    }
                    navigateTo="all"
                />
                <Divider orientation="vertical" flexItem>
                    OR
                </Divider>

                <CardOption
                    name={"Send One or Few"}
                    description={
                        "Send to only certain users who have purchased ICN tickets"
                    }
                    navigateTo="few"
                />
            </Grid>
        </Container>
    );
}
