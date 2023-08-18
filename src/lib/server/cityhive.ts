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

    async searchForTerm(term: string, retries = 0): Promise<ItemListing[]> {
        try {
            const page = await fetch(`${this.storefront_page}?ch-query=${term}`)
            if (!page.ok) {
                console.log(`Error fetching ${this.name} results for ${term}`)
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
            // console.log(results.products)
            for (const result of results.products) {
                const item: ItemListing = {
                    item: {
                        name: result.name,
                        image: result.images.primary.large,
                        ids: [
                            {
                                provider: "CITYHIVE",
                                id: result.merchants[0].product_options[0].product_id
                            }
                        ]
                    },
                    price: result.merchants[0].product_options[0].price,
                    directLink: result.merchants[0].product_options[0].product_url,
                    provider: this.name,
                }
                items.push(item)
            }
            // console.log(items)
            return items
        } catch (e) {
            console.log(`Error fetching ${this.name} results for ${term}`)
            if (retries > 0) {
                console.log(`Retrying ${this.name} results for ${term}`)
                return this.searchForTerm(term, retries - 1)
            }
            return []
        }
    }
}

const ddg_results = [
    {
        "name": "BevMax Stamford",
        "location": [
            -73.5264828,
            41.0551828
        ],
        "description": "835 E Main St, Stamford, CT 06902, USA",
        "base_url": "https://bevmax.com",
        "storefront_page": "https://bevmax.com/shop/"
    },
    {
        "name": "Twin Liquors - University Marketplace",
        "location": [
            -97.6891622,
            30.5608234
        ],
        "description": "210 University Blvd, Round Rock, TX 78665, USA",
        "base_url": "https://twinliquors.com",
        "storefront_page": "https://twinliquors.com/shop/"
    },
    {
        "name": "Total Beverage of Westminster",
        "location": [
            -105.0534377,
            39.8667114
        ],
        "description": "9359 Sheridan Boulevard, Westminster, CO 80031, USA",
        "base_url": "https://totalbev.com",
        "storefront_page": "https://totalbev.com/shop/"
    },
    {
        "name": "Austin Liquors",
        "location": [
            -71.8042117,
            42.2911747
        ],
        "description": "117 Gold Star Blvd, Worcester, MA 01606, USA",
        "base_url": "https://austinliquors.com",
        "storefront_page": "https://austinliquors.com/shop/"
    },
    {
        "name": "Wine Academy Superstore - Lakewood",
        "location": [
            -74.16101669999999,
            40.0529091
        ],
        "description": "1900 NJ-70, Lakewood, NJ 08701, USA",
        "base_url": "https://winesuperstores.com",
        "storefront_page": "https://winesuperstores.com/shop/"
    },
    {
        "name": "Table & Vine",
        "location": [
            -72.6242642,
            42.1340182
        ],
        "description": "1119 Riverdale St, West Springfield, MA 01089, USA",
        "base_url": "https://tableandvine.com",
        "storefront_page": "https://tableandvine.com/shop/"
    },
    {
        "name": "Justins' House of Bourbon",
        "location": [
            -84.5029849,
            38.0520076
        ],
        "description": "601 W Main St, Lexington, KY 40508, USA",
        "base_url": "https://thehouseofbourbon.com",
        "storefront_page": "https://thehouseofbourbon.com/shop/"
    },
    {
        "name": "Mr. B's Wine And Spirits Downtown (Ballpark)",
        "location": [
            -104.9913013,
            39.75549549999999
        ],
        "description": "2101 Market St #112, Denver, CO 80205, USA",
        "base_url": "https://shop.mrbswineandspirits.com",
        "storefront_page": "https://shop.mrbswineandspirits.com/shop/"
    },
    {
        "name": "The Vin Bin",
        "location": [
            -71.5460133,
            42.3473806
        ],
        "description": "91 Main St, Marlborough, MA 01752, USA",
        "base_url": "https://thevinbin.com",
        "storefront_page": "https://thevinbin.com/shop/"
    },
    {
        "name": "Stew Leonards Vineyards of Clifton LLC",
        "location": [
            -74.15413610000002,
            40.8385517
        ],
        "description": "345 Allwood Rd, Clifton, NJ 07012, USA",
        "base_url": "https://stewswines.com",
        "storefront_page": "https://stewswines.com/shop/"
    },
    {
        "name": "21st Amendment - W 86th St",
        "location": [
            -86.17977499999999,
            39.912979
        ],
        "description": "1158 W 86th St, Indianapolis, IN 46260, USA",
        "base_url": "https://21stamendment.com",
        "storefront_page": "https://21stamendment.com/shop/"
    },
    {
        "name": "Liquor Barn Springhurst",
        "location": [
            -85.55759139999999,
            38.29828759999999
        ],
        "description": "4131 Towne Center Dr, Louisville, KY 40241, USA",
        "base_url": "https://liquorbarn.com",
        "storefront_page": "https://liquorbarn.com/shop/"
    },
    {
        "name": "Empire Merchants - Metro (Distributor)",
        "location": [
            -73.895197,
            40.7737701
        ],
        "description": "19-50 48th St, Long Island City, NY 11105, USA",
        "base_url": "https://empire360.com",
        "storefront_page": "https://empire360.com/shop/"
    },
    {
        "name": "Rapid Liquors",
        "location": [
            -71.1007987,
            42.4900544
        ],
        "description": "171 Main St, Stoneham, MA 02180, USA",
        "base_url": "https://rapidliquors.com",
        "storefront_page": "https://rapidliquors.com/shop/"
    },
    {
        "name": "Post Wine and Spirits",
        "location": [
            -73.4975195,
            40.8102205
        ],
        "description": "510 Jericho Turnpike, Syosset, NY 11791, USA",
        "base_url": "https://postwines.com",
        "storefront_page": "https://postwines.com/shop/"
    },
    {
        "name": "Sigel's - Greenville Avenue",
        "location": [
            -96.7692249,
            32.85561
        ],
        "description": "5757 Greenville Ave, Dallas, TX 75206, USA",
        "base_url": "https://sigels.com",
        "storefront_page": "https://sigels.com/shop/"
    },
    {
        "name": "Gary's Closter",
        "location": [
            -73.9562224,
            40.969834
        ],
        "description": "67 Vervalen St, Closter, NJ 07624, USA",
        "base_url": "https://garyswine.com",
        "storefront_page": "https://garyswine.com/shop/"
    },
    {
        "name": "Warehouse Wines & Spirits",
        "location": [
            -73.9932702,
            40.7299927
        ],
        "description": "735 Broadway, New York, NY 10003, USA",
        "base_url": "https://warehousewinesandspirits.com",
        "storefront_page": "https://warehousewinesandspirits.com/shop/"
    },
    {
        "name": "Big Red #9 - Bloomington",
        "location": [
            -86.53334079999999,
            39.1615758
        ],
        "description": "435 S Walnut St, Bloomington, IN 47401, USA",
        "base_url": "https://bigredliquors.com",
        "storefront_page": "https://bigredliquors.com/shop/"
    },
    {
        "name": "Laurenti\u2019s Shop Rite Liquors",
        "location": [
            -74.6862641,
            40.2482753
        ],
        "description": "3100 Quakerbridge Rd, Hamilton Township, NJ 08619, USA",
        "base_url": "https://laurentiwines.com",
        "storefront_page": "https://laurentiwines.com/shop/"
    },
    {
        "name": "Broudys Liquors- Cobblestone",
        "location": [
            -81.33302259999999,
            29.866682
        ],
        "description": "516 W Geoffrey St, St. Augustine, FL 32086, USA",
        "base_url": "https://broudys.com",
        "storefront_page": "https://broudys.com/shop/"
    },
    {
        "name": "Randall's - Ballwin/Manchester",
        "location": [
            -90.50178,
            38.5939065
        ],
        "description": "14201 Manchester Rd, Ballwin, MO 63011, USA",
        "base_url": "https://shoprandalls.com",
        "storefront_page": "https://shoprandalls.com/shop/"
    },
    {
        "name": "Stew Leonard's Wines & Spirits of Farmingdale",
        "location": [
            -73.41829729999999,
            40.7373822
        ],
        "description": "210 Airport Plaza Blvd, Farmingdale, NY 11735, USA",
        "base_url": "https://farmingdale.stewswines.com",
        "storefront_page": "https://farmingdale.stewswines.com/shop/"
    },
    {
        "name": "Peco's Liquor Store",
        "location": [
            -75.5041713,
            39.7687065
        ],
        "description": "522 Philadelphia Pike, Wilmington, DE 19809, USA",
        "base_url": "https://pecosliquors.com",
        "storefront_page": "https://pecosliquors.com/shop/"
    },
    {
        "name": "Belmont Beverage of Bluffton Road",
        "location": [
            -85.1668317,
            41.0304121
        ],
        "description": "5806 Bluffton Rd, Fort Wayne, IN 46809, USA",
        "base_url": "https://belmontbev.com",
        "storefront_page": "https://belmontbev.com/shop/"
    },
    {
        "name": "Spirits Unlimited 89",
        "location": [
            -74.154467,
            39.913577
        ],
        "description": "437 Atlantic City Blvd, Bayville, NJ 08721, USA",
        "base_url": "https://spiritsunlimited.com",
        "storefront_page": "https://spiritsunlimited.com/shop/"
    },
    {
        "name": "Super Buy Rite of Silverton",
        "location": [
            -74.146237,
            40.017959
        ],
        "description": "1922 Hooper Ave, Toms River, NJ 08753, USA",
        "base_url": "https://silvertonbuyrite.com",
        "storefront_page": "https://silvertonbuyrite.com/shop/"
    },
    {
        "name": "Ball Square Fine Wines",
        "location": [
            -71.112706,
            42.3998542
        ],
        "description": "716 Broadway, Somerville, MA 02144, USA",
        "base_url": "https://ballsquarefinewines.com",
        "storefront_page": "https://ballsquarefinewines.com/shop/"
    },
    {
        "name": "Muckey's Liquors",
        "location": [
            -70.982067,
            41.901398
        ],
        "description": "Parking lot, 13 Harding St, Lakeville, MA 02347, USA",
        "base_url": "https://muckeysliquors.com",
        "storefront_page": "https://muckeysliquors.com/shop/"
    },
    {
        "name": "Stew Leonard's Wines & Spirits of Yonkers",
        "location": [
            -73.8645107,
            40.9737483
        ],
        "description": "1 Stew Leonard Dr, Yonkers, NY 10710, USA",
        "base_url": "https://yonkers.stewswines.com",
        "storefront_page": "https://yonkers.stewswines.com/shop/"
    }
]

export const exCH: CityHive[] = []
for (const result of ddg_results) {
    exCH.push(new CityHive(result.name, [result.location[0], result.location[1]], result.description, result.base_url, result.storefront_page))
}
