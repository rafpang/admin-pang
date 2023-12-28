import React, { useState, memo } from "react";
import { Button } from "@mui/material";
import { API_URL } from "@/app/settings";
import { useAttendanceContext } from "@/app/(contexts)/AttendanceContext";

export const AttendanceButton = memo(function AttendanceButton({
    attendanceShowTime,
    attendanceStatus,
    audienceId,
}: {
    attendanceShowTime: string;
    attendanceStatus: boolean;
    audienceId: Number;
}) {
    const [attendance, setAttendance] = useState<boolean>(attendanceStatus);
    const {
        setMatineeAttendanceAddDelta,
        setNightAttendanceAddDelta,
        setMatineeAttendanceMinusDelta,
        setNightAttendanceMinusDelta,
    } = useAttendanceContext();

    const handleToggleAttendance = async () => {
        setAttendance((prevValue) => !prevValue);
        if (attendanceShowTime === "matinee") {
            // state hasn't changed yet and useEffect causes infinite rerender,
            // so this will have to do (sorry for the skill issue -rafpang)
            !attendance
                ? setMatineeAttendanceAddDelta((delta) => delta + 1)
                : setMatineeAttendanceMinusDelta((delta) => delta + 1);
        } else if (attendanceShowTime === "night") {
            !attendance
                ? setNightAttendanceAddDelta((delta) => delta + 1)
                : setNightAttendanceMinusDelta((delta) => delta + 1);
        }
        try {
            const response = await fetch(
                `${API_URL}/audiences/attendance/${audienceId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        isAttending: !attendance,
                    }),
                }
            );
            if (response.ok) {
                console.log("Attendance Marked");
            } else {
                console.error("Error marking Attendance");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    return (
        <Button
            variant="contained"
            color={attendance ? "success" : "error"}
            sx={{ marginRight: 1, fontSize: 11 }}
            onClick={handleToggleAttendance}
        >
            {attendance ? "PRESENT" : "ABSENT"}
        </Button>
    );
});

export default AttendanceButton;
