"use client";
import React from "react";
import ToastContextProvider from "./(contexts)/ToastContext";

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
                <meta
                    httpEquiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                />
                <body>
                    <ToastContextProvider>{children}</ToastContextProvider>
                </body>
            </>
        </html>
    );
}
