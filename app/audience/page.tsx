"use client";
import React from "react";
import AudienceDataTable from "./(components)/AudienceDataTable";
import Navbar from "../(components)/Navbar";
import { Container, Typography, CircularProgress, Grid } from "@mui/material";
import { useAuthorizedInitialFetch } from "../hooks/fetch";
import { useCheckAuth } from "../hooks/auth";
import StatCard from "../(components)/(small-components)/StatCard";
import { useAttendanceContext } from "../(contexts)/AttendanceContext";

export default function AudiencePage() {
    useCheckAuth();
    const [isLoading, data] = useAuthorizedInitialFetch(
        "https://api.icnmusical.com/audiences/protected"
    );
    const [isLoadingAttendanceStats, attendanceStats] =
        useAuthorizedInitialFetch("/audiences/protected/statistics");
    const {
        matineeAttendanceAddDelta,
        matineeAttendanceMinusDelta,
        nightAttendanceAddDelta,
        nightAttendanceMinusDelta,
    } = useAttendanceContext();

    return (
        <Container>
            <Navbar />
            <Typography
                fontStyle={"italic"}
                sx={{ marginBottom: "30px", textAlign: "center" }}
                component="h1"
                variant="h4"
            >
                Audience
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
                <strong>Audience</strong> shows all of the audience attending
                ICN 2024. If an <strong>order</strong> is in <i>pending</i> or{" "}
                <i>failed</i> status, the audience would not be in the following
                table. The table below can be used as if it is an excel table,
                click on the column to filter and find certain values.
            </Typography>
            {isLoadingAttendanceStats ? (
                <Grid
                    container
                    display={"flex"}
                    justifyContent="center"
                    alignItems="center"
                    marginTop={10}
                    marginBottom={7}
                >
                    <CircularProgress size={70} />
                </Grid>
            ) : (
                <Grid
                    container
                    display={"flex"}
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Typography
                            fontSize={18}
                            fontWeight={"bold"}
                            marginBottom={2}
                        >
                            Attendance Rate
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent={"center"}
                        alignItems={"center"}
                        marginBottom={12}
                        columnSpacing={10}
                        rowSpacing={5}
                    >
                        {attendanceStats.map((stat: any) => {
                            let value;
                            if (stat.showTime === "matinee") {
                                value =
                                    ((stat.numAttending +
                                        matineeAttendanceAddDelta -
                                        matineeAttendanceMinusDelta) /
                                        stat.totalTickets) *
                                    100;
                            } else if (stat.showTime === "night") {
                                value =
                                    ((stat.numAttending +
                                        nightAttendanceAddDelta -
                                        nightAttendanceMinusDelta) /
                                        stat.totalTickets) *
                                    100;
                            }
                            return (
                                <Grid item>
                                    <StatCard
                                        valueName={stat.showTime}
                                        value={`${value?.toPrecision(3)}%`}
                                        color="black"
                                        key={stat.showTime}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            )}

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
                    <AudienceDataTable rows={data} />
                )}
            </Container>
        </Container>
    );
}
