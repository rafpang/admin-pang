import { useMemo } from "react";
import { useAuthorizedInitialFetch } from "@/app/hooks/fetch";

function findConfirmedAudiences(audienceData: any, ordersData: any) {
    const filteredData = audienceData.filter((audience: any) => {
        return ordersData.some((order: any) => {
            return (
                order.orderId === audience.orderId &&
                order.paymentStatus === "successful"
            );
        });
    });
    return filteredData;
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
