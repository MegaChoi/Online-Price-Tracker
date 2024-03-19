export type Product = {
    id?: string;
    url: string;
    imageURL: string;
    title: string;
    currentPrice: number;
    originalPrice: number;
    priceHistory: PriceHistoryItem[] | [];
    highestPrice: number;
    lowestPrice: number;
    averagePrice: number;
    category: string;
    isOutOfStock: Boolean;
};

export type PriceHistoryItem = {
    price: number;
};

