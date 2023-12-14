"use client";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { FieldValues, FieldError, useForm } from "react-hook-form";
import SuccessToast from "../../(components)/SuccessToast";

export default function SendAllForm() {
    const [openSuccessToast, setOpenSuccessToast] = useState<boolean>(false);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FieldValues>();

    function onSendManySubmit(data: FieldValues): void {
        setTimeout(() => {
            console.log("form submitted");
            console.log(data);
            setOpenSuccessToast(true);
            reset();
        }, 1500);
    }

    return (
        <Container maxWidth="sm">
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSendManySubmit)}
            >
                <Grid container spacing={2}>
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
