import { Button, DialogContentText, Grid } from "@mui/material";
import { Product, Ticket } from "../(types)/types";
import TicketDetails from "./TicketDetails";
import { memo } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const TicketDetailsGroup: React.FC<{
    ticketDetails: Ticket[];
    products: Product[];
    onAddTicket: () => void;
    onRemoveTicket: (index: number) => void;
    onTicketChange: (
        index: number,
        key: keyof Ticket,
        value: string | number
    ) => void;
}> = memo(
    ({
        ticketDetails,
        products,
        onAddTicket,
        onRemoveTicket,
        onTicketChange,
    }) => {
        return (
            <>
                <Grid item xs={12}>
                    <DialogContentText marginTop={2}>
                        <strong>Ticket Details</strong>
                    </DialogContentText>
                </Grid>
                {ticketDetails.map((ticketDetail, index) => (
                    <TicketDetails
                        key={index}
                        index={index}
                        ticketDetail={ticketDetail}
                        products={products}
                        onTicketChange={onTicketChange}
                        onRemoveTicket={onRemoveTicket}
                    />
                ))}

                <Grid item xs={12}>
                    <Button
                        type="button"
                        color="success"
                        variant="contained"
                        size="small"
                        fullWidth
                        sx={{ fontSize: 2 }}
                        onClick={onAddTicket}
                    >
                        <AddCircleIcon />
                    </Button>
                </Grid>
            </>
        );
    }
);

export default TicketDetailsGroup;
