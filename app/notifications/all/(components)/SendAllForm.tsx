import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm, FieldError } from "react-hook-form";
import SuccessToast from "../../(components)/SuccessToast";
import { API_URL } from "@/app/settings";
import Cookies from "js-cookie";

type FormValues = {
    emailName: string;
    emailSubject: string;
    emailHeading: string;
    emailBody: string;
};

export default function SendAllForm() {
    const [openSuccessToast, setOpenSuccessToast] = useState<boolean>(false);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    const onSendManySubmit: SubmitHandler<FormValues> = async (data) => {
        const requestBody = {
            ...data,
        };

        try {
            const response = await fetch(
                `${API_URL}/email/protected/notifications/all`,
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
                console.error(
                    `Error: ${response.status} - ${response.statusText}`
                );

                return;
            }

            const responseData = await response.json();
            console.log("Response:", responseData);

            setOpenSuccessToast(true);
            reset();
        } catch (error) {
            console.error("Error:", error);
        }
    };

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
