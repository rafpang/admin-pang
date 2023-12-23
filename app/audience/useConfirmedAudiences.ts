import { useEffect, useState } from "react";
import { useAuthorizedInitialFetch } from "@/app/hooks/fetch";

export default function useConfirmedAudiences() {
    const [filteredAudienceData, setFilteredAudienceData] = useState<any[]>([]);
    const [isLoadingAudience, audienceData] = useAuthorizedInitialFetch(
        "https://api.icnmusical.com/api/v1/audiences/protected"
    );
    const [isDataProcessingLoading, setIsDataProcessingLoading] =
        useState<boolean>(false);

    const [isLoadingOrders, ordersData] = useAuthorizedInitialFetch(
        "https://api.icnmusical.com/api/v1/orders/protected"
    );

    useEffect(() => {
        setIsDataProcessingLoading(true);
        const filteredData = audienceData.filter((audience: any) => {
            return ordersData.some((order: any) => {
                return (
                    order.orderId === audience.orderId &&
                    order.paymentStatus === "successful"
                );
            });
        });
        setFilteredAudienceData(filteredData);
        setIsDataProcessingLoading(false);
    }, [audienceData, ordersData]);

    return {
        isLoading:
            isLoadingAudience || isLoadingOrders || isDataProcessingLoading,
        filteredAudienceData,
    };
}
