import { useMemo } from "react";
import { useAuthorizedInitialFetch } from "@/app/hooks/fetch";

function hasMatchingSuccessfulOrder(audienceId: number, ordersData: any[]) {
    return ordersData.some(
        (order: any) =>
            order.audienceId === audienceId &&
            (order.paymentStatus as string).toLowerCase().includes("successful")
    );
}

function findConfirmedAudiences(audienceData: any[], ordersData: any[]) {
    return audienceData.filter((audience: any) =>
        hasMatchingSuccessfulOrder(audience.audienceId, ordersData)
    );
}

export default function useConfirmedAudiences() {
    const [isLoadingAudience, audienceData] = useAuthorizedInitialFetch(
        "https://api.icnmusical.com/api/v1/audiences/protected"
    );
    const [isLoadingOrders, ordersData] = useAuthorizedInitialFetch(
        "https://api.icnmusical.com/api/v1/orders/protected"
    );
    const filteredAudienceData = useMemo(
        () => findConfirmedAudiences(audienceData, ordersData),
        [audienceData, ordersData]
    );

    return {
        isLoading: isLoadingAudience || isLoadingOrders,
        filteredAudienceData,
    };
}
