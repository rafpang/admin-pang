import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type ProductActionCardProps = {
    name: string;
    description: string;
    onClick: () => void;
};

export default function ProductActionCard({
    name,
    description,
    onClick,
}: ProductActionCardProps) {
    return (
        <Card
            sx={{ width: 345, cursor: "pointer", boxShadow: 10, height: 130 }}
            onClick={onClick}
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
