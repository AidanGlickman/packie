import type { ItemListing } from "./item";
export interface Provider {
    name: string;
    location: [number, number];
    description: string;
    searchForTerm(term: string): Promise<ItemListing[]>;
}
