import { Autocomplete, Button, Grid, MenuItem, TextField } from "@mui/material";
import { Product, Ticket } from "../(types)/types";
import { memo } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const TicketDetails: React.FC<{
    index: number;
    ticketDetail: Ticket;
    products: Product[];
    onTicketChange: (
        index: number,
        key: keyof Ticket,
        value: string | number
    ) => void;
    onRemoveTicket: (index: number) => void;
}> = memo(
    ({ index, ticketDetail, products, onTicketChange, onRemoveTicket }) => {
        return (
            <>
                <Grid container item spacing={3} key={index}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            fullWidth
                            margin="dense"
                            id={`audienceName-${index}`}
                            name="audienceName"
                            label="Audience Name"
                            variant="standard"
                            value={ticketDetail.audienceName}
                            onChange={(e) =>
                                onTicketChange(
                                    index,
                                    "audienceName",
                                    e.target.value
                                )
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Autocomplete
                            options={products}
                            getOptionLabel={(product: Product) =>
                                `${product.productName} (ID: ${product.productId})`
                            }
                            value={
                                products.find(
                                    (p: any) =>
                                        p.productId === ticketDetail.productId
                                ) || null
                            }
                            onChange={(_, newValue: any) => {
                                onTicketChange(
                                    index,
                                    "productId",
                                    newValue?.productId || -1
                                );
                            }}
                            renderInput={(params: any) => (
                                <TextField
                                    {...params}
                                    required
                                    fullWidth
                                    margin="dense"
                                    id={`productLabel-${index}`}
                                    label="Product"
                                    variant="standard"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            fullWidth
                            margin="dense"
                            id={`showTime-${index}`}
                            name="showTime"
                            label="Show Time"
                            variant="standard"
                            select
                            value={ticketDetail.showTime}
                            onChange={(e) =>
                                onTicketChange(
                                    index,
                                    "showTime",
                                    e.target.value
                                )
                            }
                        >
                            <MenuItem value="matinee">matinee</MenuItem>
                            <MenuItem value="night">night</MenuItem>
                        </TextField>
                    </Grid>
                    {index > 0 && (
                        <Grid item container xs={2}>
                            <Button
                                type="button"
                                color="error"
                                variant="contained"
                                size="small"
                                fullWidth
                                onClick={() => onRemoveTicket(index)}
                            >
                                <RemoveCircleIcon />
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </>
        );
    }
);

export default TicketDetails;
