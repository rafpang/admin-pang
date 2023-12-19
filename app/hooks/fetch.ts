"use client";
import { useEffect, useState } from "react";
import { API_URL } from "../settings";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function useAuthorizedInitialFetch(fetchURL: string): any[] {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchDataWithAuth = async () => {
            if (!Cookies.get("access_token_cookie")) {
                router.push("/login");
                return;
            }
            try {
                setIsLoading(true);
                const response = await fetch(`${fetchURL}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${Cookies.get(
                            "access_token_cookie"
                        )}`,
                    },
                });

                if (response.status === 401) {
                    setIsLoading(false);
                    router.push("/login");
                } else if (response.ok) {
                    setIsLoading(false);
                    const responseData = await response.json();
                    setData(responseData);
                } else {
                    setIsLoading(false);
                    console.error(
                        `Request failed with status ${response.status}`
                    );
                }
            } catch (err) {
                setIsLoading(false);
                console.error(err);
            }
        };
        fetchDataWithAuth();
    }, []);

    return [isLoading, data];
}

export function usePublicInitialFetch(fetchURL: string): any[] {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchDataWithoutAuth = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${API_URL}${fetchURL}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setIsLoading(false);
                    setData(responseData);
                } else {
                    setIsLoading(false);
                    console.error(
                        `Request failed with status ${response.status}`
                    );
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchDataWithoutAuth();
    }, []);

    return [isLoading, data];
}
