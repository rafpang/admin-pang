import { LinearProgress } from "@mui/material";
import React from "react";

type ProgressBarProps = {
    maxValue: number;
    value: number;
};

export default function ProgressBar({ value, maxValue }: ProgressBarProps) {
    const progress = (value / maxValue) * 100;

    return (
        <>
            <LinearProgress
                color={
                    progress < 30
                        ? "error"
                        : progress >= 30 && progress <= 60
                        ? "warning"
                        : "success"
                }
                variant="determinate"
                value={progress}
                style={{
                    width: "80%",
                    height: "40%",
                    marginRight: "5px",
                }}
            />

            <span
                style={{
                    marginTop: "2px",
                    textAlign: "center",
                    fontWeight: "bold",
                    width: "20%",
                    fontSize: "12px",
                }}
            >
                {`${Math.round(progress)}%`}
            </span>
        </>
    );
}
