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

    async searchForTerm(term: string): Promise<any> {
        const page = await fetch(`${this.base_url}${this.storefront_page}?ch-query=${term}`)
        const text = await page.text()
        const regex = /var results = JSON.parse\(decodeURIComponent\("(.*)"\)\);/gm
        const match = regex.exec(text)
        if (match === null) {
            return []
        }
        const json = decodeURIComponent(match[1])
        const results = JSON.parse(json)
        return results.products
    }
}

export const exCH: CityHive[] = [
    new CityHive("Wineland NJ", [0, 0], "Wineland Teaneck", "https://www.winelandnj.com", "/shop"),
]
