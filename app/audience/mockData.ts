export type RandomDataForDataTableType = {
    audience_id: number;
    order_id: number;
    created_at: string;
    name: string;
    ticket_type: string;
    show_time: string;
};

export default function getRandomDataForDataTable(
    number: number
): RandomDataForDataTableType[] {
    let sampleData: RandomDataForDataTableType[] = [];
    for (let i = 0; i <= number; i++) {
        sampleData.push({
            audience_id: i,
            order_id: i,
            name: i % 3 === 0 ? "pangsit" : i % 2 === 0 ? "panggang" : "pang",
            created_at: "13-12-2023",
            show_time: i % 2 === 0 ? "matinee" : "night",
            ticket_type:
                i % 3 === 0 ? "bundle" : i % 2 === 0 ? "normal" : "early_bird",
        });
    }
    return sampleData;
}
