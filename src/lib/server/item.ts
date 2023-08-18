// Represents an item, which can then have instances available at several stores
export type Item = {
    name: string;
    image?: string;
    ids: string;
}

export type ItemListing = {
    item: Item;
    price: number;
    directLink: string;
    provider: string;
    size?: {
        measure: string; // the volume measure, e.g. ml, g, kg
        quantity: number; // number of units
        pack: string; // the pack size, e.g. 6pk
        unit: string; // the unit, e.g. bottle, can
    }
}
