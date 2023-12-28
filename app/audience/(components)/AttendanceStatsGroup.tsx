import { useAttendanceContext } from "@/app/(contexts)/AttendanceContext";
import { Grid } from "@mui/material";
import React from "react";
import StatCard from "./(small-components)/StatCard";

type AttendanceStatsGroupProps = {
    attendanceStats: any[];
};

export default function AttendanceStatsGroup({
    attendanceStats,
}: AttendanceStatsGroupProps) {
    const {
        matineeAttendanceAddDelta,
        matineeAttendanceMinusDelta,
        nightAttendanceAddDelta,
        nightAttendanceMinusDelta,
    } = useAttendanceContext();

    return (
        <>
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
        </>
    );
}
