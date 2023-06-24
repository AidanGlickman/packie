import type { ItemListing } from "./item";
import type { Provider } from "./provider";
export class CityHive implements Provider {
    name: string;
    location: [number, number];
    description: string;

    base_url: string;
    storefront_page: string;

    constructor(name: string, location: [number, number] = [0, 0], description = "", base_url: string, storefront_page: string) {
        this.name = name
        this.base_url = base_url
        this.storefront_page = storefront_page
        this.location = location
        this.description = description
    }

    async searchForTerm(term: string): Promise<ItemListing[]> {
        const page = await fetch(`${this.storefront_page}?ch-query=${term}`)
        if (!page.ok) {
            return []
        }
        const text = await page.text()
        const regex = /var results = JSON.parse\(decodeURIComponent\("(.*)"\)\);/gm
        const match = regex.exec(text)
        if (match === null) {
            return []
        }
        const json = decodeURIComponent(match[1])
        const results = JSON.parse(json)
        // return results;
        const items: ItemListing[] = []
        console.log(results.products)
        for (const result of results.products) {
            const item: ItemListing = {
                name: result.name,
                price: result.merchants[0].product_options[0].price,
                directLink: result.merchants[0].product_options[0].product_url,
                provider: this.name,
                image: result.images.primary.original
            }
            items.push(item)
        }
        console.log(items)
        return items
    }
}

export const exCH: CityHive[] = [
    new CityHive("Wineland NJ", [0, 0], "Wineland Teaneck", "https://www.winelandnj.com", "https://www.winelandnj.com/shop"),
]
