import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

type StatCardPropTypes = {
    valueName: string;
    value: number | string;
    color: "red" | "green" | "black";
};

export default function StatCard({
    valueName,
    value,
    color,
}: StatCardPropTypes) {
    return (
        <Card
            sx={{
                width: 275,
                boxShadow: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "17px",
            }}
        >
            <CardContent>
                <Container>
                    <Typography
                        gutterBottom
                        sx={{ fontSize: "1.2rem", textTransform: "capitalize" }}
                        component="div"
                        color={
                            color === "green"
                                ? "#8bc37a"
                                : color === "red"
                                ? "#f50057"
                                : "black"
                        }
                        fontWeight={"bold"}
                        textAlign={"center"}
                    >
                        {valueName}
                    </Typography>
                </Container>
                <Container
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        gutterBottom
                        sx={{ fontSize: "1.7rem" }}
                        component="div"
                        color={
                            color === "green"
                                ? "#8bc34a"
                                : color === "red"
                                ? "#f50057"
                                : "black"
                        }
                        fontWeight={"bold"}
                    >
                        {value}
                    </Typography>
                </Container>
            </CardContent>
        </Card>
    );
}
