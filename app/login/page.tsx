"use client";
// Import statements...
import { useState } from "react";
import {
    Typography,
    Container,
    Box,
    Grid,
    TextField,
    CssBaseline,
    Button,
    CircularProgress,
} from "@mui/material/";
import Link from "next/link";
import Image from "next/image";
import icnLogo from "../../public/icn-logo.png";
import kaharsa from "../../public/kaharsa.png";
import { useCheckAuthInLoginOrRegister } from "../hooks/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { API_URL, REGISTRATION_DUE, COOKIE_EXPIRY_MINUTES } from "../settings";

export default function LoginPage() {
    useCheckAuthInLoginOrRegister();
    const router = useRouter();
    const [errorLogin, setErrorLogin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleLoginSubmit(
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                setIsLoading(false);
                const responseJson = await response.json();
                const accessToken = responseJson.accessTokenCookie;
                const refreshToken = responseJson.refreshTokenCookie;

                const accessExpirationTimeInSeconds =
                    COOKIE_EXPIRY_MINUTES * 60;

                Cookies.set("access_token_cookie", accessToken, {
                    expires: accessExpirationTimeInSeconds / (60 * 60 * 24),
                });
                Cookies.set("refresh_token_cookie", refreshToken, {
                    expires: accessExpirationTimeInSeconds / (60 * 60 * 24),
                });
                router.push("/");
            } else {
                setIsLoading(false);
                setErrorLogin(false);
            }
        } catch (error) {
            setErrorLogin(true);
            setIsLoading(false);
        }
    }

    return (
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
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column", // Stacking vertically
                        alignItems: "center",
                        justifyContent: "space-around",
                    }}
                >
                    <Image
                        src={icnLogo}
                        alt="icnLogo"
                        width={130}
                        height={130}
                        style={{ marginBottom: 15 }}
                    />
                    <Image
                        src={kaharsa}
                        alt="icnLogo"
                        width={220}
                        height={150}
                        style={{ marginBottom: 15 }}
                    />
                </Container>

                <Typography component="h1" variant="h5" fontWeight={1}>
                    Login
                </Typography>
                {errorLogin === true ? (
                    <Typography
                        sx={{ fontSize: 12, color: "red", mt: 2 }}
                        component="h1"
                        variant="h5"
                    >
                        Invalid Credentials!
                    </Typography>
                ) : null}
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleLoginSubmit}
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
                    {isLoading === true ? (
                        <Grid
                            marginTop={3}
                            marginBottom={3}
                            container
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <CircularProgress size={60} />
                        </Grid>
                    ) : (
                        <div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 3, backgroundColor: "#333" }}
                            >
                                Login
                            </Button>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    {new Date() <=
                                        new Date(REGISTRATION_DUE) && (
                                        <Grid item>
                                            <Link href="/register">
                                                Don't have an account? Register
                                                before {REGISTRATION_DUE}
                                            </Link>
                                            <Typography
                                                sx={{
                                                    fontSize: 15,
                                                    color: "black",
                                                    mt: 2,
                                                }}
                                                component="h1"
                                                variant="h5"
                                            ></Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </Box>
            </Box>
        </Container>
    );
}
