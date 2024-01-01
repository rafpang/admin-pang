import { Autocomplete, Grid, TextField } from "@mui/material";
import { memo } from "react";

const PaymentMethod: React.FC<{
    paymentMethod: string;
    onPaymentMethodChange: (value: string) => void;
}> = memo(({ paymentMethod, onPaymentMethodChange }) => {
    return (
        <Grid item xs={12}>
            <Autocomplete
                fullWidth
                options={["card", "paynow", "transfer", "invitation"]}
                value={paymentMethod}
                onChange={(_, newValue) =>
                    onPaymentMethodChange(newValue as string)
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        required
                        fullWidth
                        autoFocus
                        margin="dense"
                        id="paymentMethod"
                        label="Payment Method"
                        variant="standard"
                    />
                )}
            />
        </Grid>
    );
});

export default PaymentMethod;
