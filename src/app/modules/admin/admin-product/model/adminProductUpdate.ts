export interface AdminProductUpdate {
    id: number,
    name: string,
    description: string,
    fullDescription: string,
    categoryId: number,
    price: number,
    salePrice: number,
    inSalePlace: boolean,
    currency: string,
    slug: string,
    image: string
}