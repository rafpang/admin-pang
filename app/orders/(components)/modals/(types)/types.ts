export type Ticket = {
    audienceName: string;
    productId: number;
    showTime: string;
};

export type Product = {
    productName: string;
    productId: number;
};

export type BuyerInfo = {
    buyerName: string;
    buyerPhoneNumber: string;
    buyerEmail: string;
};

export type CompleteOrder = {
    totalPrice: number;
    paymentMethod: string;
    paymentStatus: string;
} & BuyerInfo;
