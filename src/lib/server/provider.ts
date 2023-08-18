import type { ItemListing } from "./item";
export interface Provider {
    name: string;
    location: [number, number];
    description: string;
    searchForTerm(term: string): Promise<ItemListing[]>;
}

export async function searchForTermMultiple(providers: Provider[], term: string): Promise<ItemListing[]> {
    const promises = providers.map(provider => provider.searchForTerm(term));
    const results = await Promise.all(promises);
    return results.flat();
}
