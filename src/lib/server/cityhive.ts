import * as ch from "../cityhive"
import type { CityHive } from "../cityhive"
import * as cheerio from 'cheerio'

export async function searchForTerm(term: string, cityhive: CityHive) {
    const page = await fetch(`${cityhive.base_url}${cityhive.storefront_page}?ch-query=${term}`)
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
