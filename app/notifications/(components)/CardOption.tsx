import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

type NotificationOptionProps = {
    name: string;
    description: string;
    navigateTo: string;
};

export default function CardOption({
    name,
    description,
    navigateTo,
}: NotificationOptionProps) {
    const router = useRouter();
    return (
        <Card
            sx={{ maxWidth: 345, cursor: "pointer", boxShadow: 20 }}
            onClick={() => router.push(`/notifications/${navigateTo}`)}
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
