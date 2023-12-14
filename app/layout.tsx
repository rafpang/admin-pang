"use client";
import React from "react";
import AttendanceContextProvider from "./(contexts)/AttendanceContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <body>
                    <AttendanceContextProvider>
                        {children}
                    </AttendanceContextProvider>
                </body>
            </>
        </html>
    );
}
