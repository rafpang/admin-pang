"use client";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import SuccessToast from "../../../(components)/(small-components)/SuccessToast";
import { API_URL } from "@/app/settings";
import Cookies from "js-cookie";

type FormValues = {
    emailName: string;
    emailSubject: string;
    emailHeading: string;
    emailBody: string;
    recipients: string;
};

export default function SendFewForm() {
    const [openSuccessToast, setOpenSuccessToast] = useState<boolean>(false);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    const onSendFewSubmit: SubmitHandler<FormValues> = async (data) => {
        // Extract recipient emails, split the string, and trim them
        const recipientEmailsList: string[] = data.recipients
            .split(",")
            .map((email) => email.trim());

        const requestBody = {
            ...data,
            recipients: recipientEmailsList,
        };

        try {
            const response = await fetch(
                `${API_URL}/email/protected/notifications`,
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

            if (!response.ok) {
                // Handle non-successful response (e.g., show an error message)
                console.error(
                    `Error: ${response.status} - ${response.statusText}`
                );
                // You can set an error state or show an error message to the user
                return;
            }

            const responseData = await response.json();
            console.log("Response:", responseData);

            // Handle success (e.g., show a success message)
            setOpenSuccessToast(true);
            reset();
        } catch (error) {
            // Handle any other errors that might occur during the fetch
            console.error("Error:", error);
            // You can set an error state or show an error message to the user
        }
    };

    return (
        <Container maxWidth="sm">
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSendFewSubmit)}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="emailName"
                            label="Email Name"
                            variant="outlined"
                            {...register("emailName", {
                                required: "Email Name is required",
                            })}
                            error={Boolean(errors.emailName)}
                        />
                        {errors.emailName && (
                            <Typography color="error" variant="body2">
                                {(errors.emailName as FieldError).message}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="emailSubject"
                            label="Email Subject"
                            variant="outlined"
                            {...register("emailSubject", {
                                required: "Email Subject is required",
                            })}
                            error={Boolean(errors.emailSubject)}
                        />
                        {errors.emailSubject && (
                            <Typography color="error" variant="body2">
                                {(errors.emailSubject as FieldError).message}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="emailHeading"
                            label="Email Heading"
                            variant="outlined"
                            {...register("emailHeading", {
                                required: "Email Heading is required",
                            })}
                            error={Boolean(errors.emailHeading)}
                        />
                        {errors.emailHeading && (
                            <Typography color="error" variant="body2">
                                {(errors.emailHeading as FieldError).message}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="emailBody"
                            label="Email Body"
                            multiline
                            rows={6}
                            variant="outlined"
                            {...register("emailBody", {
                                required: "Email Body is required",
                            })}
                            error={Boolean(errors.emailBody)}
                        />
                        {errors.emailBody && (
                            <Typography color="error" variant="body2">
                                {(errors.emailBody as FieldError).message}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="recipients"
                            label="Recipients (comma-separated)"
                            variant="outlined"
                            {...register("recipients", {
                                required: "Recipients are required",
                                pattern: {
                                    value: /^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)(,\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)*$/,
                                    message:
                                        "Invalid email address(es). Use commas to separate multiple emails.",
                                },
                            })}
                            error={Boolean(errors.recipients)}
                        />
                        {errors.recipients && (
                            <Typography color="error" variant="body2">
                                {(errors.recipients as FieldError).message}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: "#333" }}
                            disabled={isSubmitting}
                        >
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <SuccessToast
                open={openSuccessToast}
                setOpen={setOpenSuccessToast}
                message={"Email Sent!"}
            />
        </Container>
    );
}
