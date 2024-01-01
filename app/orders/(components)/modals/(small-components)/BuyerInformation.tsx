import { DialogContentText, Grid, TextField } from "@mui/material";
import { memo } from "react";
import { BuyerInfo } from "../(types)/types";

const BuyerInformation: React.FC<{
    buyerInfo: BuyerInfo;
    onBuyerInputChange: (key: string, value: string) => void;
}> = memo(({ buyerInfo, onBuyerInputChange }) => {
    return (
        <>
            <Grid item xs={12}>
                <DialogContentText>
                    <strong>Buyer Details</strong>
                </DialogContentText>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    fullWidth
                    autoFocus
                    margin="dense"
                    id="buyerName"
                    name="buyerName"
                    label="Buyer Name"
                    variant="standard"
                    value={buyerInfo.buyerName}
                    onChange={(e) =>
                        onBuyerInputChange("buyerName", e.target.value)
                    }
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    fullWidth
                    autoFocus
                    margin="dense"
                    id="buyerPhoneNumber"
                    name="buyerPhoneNumber"
                    label="Buyer Phone Number"
                    variant="standard"
                    type="tel"
                    value={buyerInfo.buyerPhoneNumber}
                    onChange={(e) =>
                        onBuyerInputChange("buyerPhoneNumber", e.target.value)
                    }
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    fullWidth
                    autoFocus
                    margin="dense"
                    id="buyerEmail"
                    name="buyerEmail"
                    label="Buyer Email"
                    variant="standard"
                    type="email"
                    value={buyerInfo.buyerEmail}
                    onChange={(e) =>
                        onBuyerInputChange("buyerEmail", e.target.value)
                    }
                />
            </Grid>
        </>
    );
});

export default BuyerInformation;
