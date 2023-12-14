"use client";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import SuccessToast from "../../(components)/SuccessToast";

type FormValues = {
    recipient_email: string;
    subject: string;
    text: string;
};

export default function SendFewForm() {
    const [openSuccessToast, setOpenSuccessToast] = useState<boolean>(false);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    const onSendFewSubmit: SubmitHandler<FormValues> = (data) => {
        let recipientEmailsList: string[] = [];
        data.recipient_email
            .split(",")
            .map((email) => recipientEmailsList.push(email.trim()));
        setTimeout(() => {
            console.log("form submitted");
            console.log({ ...data, recipient_email: recipientEmailsList });
            setOpenSuccessToast(true);
            reset();
        }, 1500);
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
                            id="recipient_email"
                            label="Recipient Email(s)"
                            variant="outlined"
                            {...register("recipient_email", {
                                required: "Recipient Email(s) is required",
                                pattern: {
                                    value: /^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)(,\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)*$/,
                                    message:
                                        "Invalid email address(es), use commas to separate multiple emails.",
                                },
                            })}
                            error={Boolean(errors.recipient_email)}
                        />
                        {errors.recipient_email && (
                            <Typography color="error" variant="body2">
                                {(errors.recipient_email as FieldError).message}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="subject"
                            label="Subject"
                            variant="outlined"
                            {...register("subject", {
                                required: "Subject is required",
                                maxLength: {
                                    value: 100,
                                    message:
                                        "Subject should not exceed 100 characters",
                                },
                            })}
                            error={Boolean(errors.subject)}
                        />
                        {errors.subject && (
                            <Typography color="error" variant="body2">
                                {(errors.subject as FieldError).message}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="text"
                            label="Text"
                            multiline
                            rows={6}
                            variant="outlined"
                            {...register("text", {
                                required: "Text is required",
                                maxLength: {
                                    value: 300,
                                    message:
                                        "Text should not exceed 300 characters",
                                },
                            })}
                            error={Boolean(errors.text)}
                        />

                        {errors.text && (
                            <Typography color="error" variant="body2">
                                {(errors.text as FieldError).message}
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
