"use client";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import icnLogo from "../../public/icn-logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_URL, REGISTRATION_DUE } from "../settings";
import { useCheckAuthInLoginOrRegister } from "../hooks/auth";

export default function RegisterPage() {
    const [registerError, setRegisterError] = useState<boolean>(false);
    const router = useRouter();

    useCheckAuthInLoginOrRegister();

    async function handleRegisterSubmit(
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (response.ok) {
                router.push("/login");
            }
        } catch (error) {
            setRegisterError(true);
        }
    }

    return (
        <>
            {new Date() <= new Date(REGISTRATION_DUE) ? (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 18,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Image
                            src={icnLogo}
                            alt="icnLogo"
                            width={130}
                            height={120}
                            style={{ marginBottom: 30 }}
                        />
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        {registerError ? (
                            <Typography
                                sx={{ fontSize: 12, color: "red", mt: 2 }}
                                component="h1"
                                variant="h5"
                            >
                                Error registering! Please try again
                            </Typography>
                        ) : null}
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleRegisterSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: "#333" }}
                            >
                                Sign up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href={"/login"}>
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            ) : (
                <Box
                    sx={{
                        marginTop: 18,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        src={icnLogo}
                        alt="icnLogo"
                        width={130}
                        height={120}
                        style={{ marginBottom: 50 }}
                    />
                    <Typography component="h1" variant="h5">
                        The registration period has ended!
                    </Typography>
                </Box>
            )}
        </>
    );
}
