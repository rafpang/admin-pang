import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

type NotificationCardPropTypes = {
    name: string;
    description: string;
    navigateTo: string;
};

export default function OrderActionCard({
    name,
    description,
    navigateTo,
}: NotificationCardPropTypes) {
    const router = useRouter();
    return (
        <Card
            sx={{ width: 345, cursor: "pointer", boxShadow: 10, height: 130 }}
            onClick={() => router.push(`/orders/${navigateTo}`)}
        >
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}
