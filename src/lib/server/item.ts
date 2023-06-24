// export class ItemListing {
//     item: string;
//     image?: string;
//     price: number;
//     directLink: string;
//     provider: string;

//     constructor(item: string, price: number, directLink: string, provider: string, image?: string) {
//         this.item = item
//         this.price = price
//         this.directLink = directLink
//         this.provider = provider
//         this.image = image
//     }
// }

export type ItemListing = {
    name: string;
    image?: string;
    price: number;
    directLink: string;
    provider: string;
}
