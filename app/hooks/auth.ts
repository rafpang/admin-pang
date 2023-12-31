"use client";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { useRouter, redirect } from "next/navigation";

import Cookies from "js-cookie";

export function useCheckAuth() {
    const router = useRouter();
    useEffect(() => {
        async function checkAuth() {
            if (!Cookies.get("access_token_cookie")) {
                router.push("/login");
            }
            try {
                const response = await fetch(
                    `${API_URL}/auth/protected/check`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${Cookies.get(
                                "access_token_cookie"
                            )}`,
                        },
                    }
                );

                if (!response.ok) {
                    router.push("/login");
                }
            } catch (err) {
                console.log(err);
            }
        }
        checkAuth();
    }, []);
}

export function useCheckAuthInLoginOrRegister() {
    useEffect(() => {
        async function checkAuth() {
            if (Cookies.get("access_token_cookie")) {
                redirect("/");
            }
        }
        checkAuth();
    }, []);
}
