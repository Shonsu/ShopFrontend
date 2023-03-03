export interface AdminProductUpdate {
    id: number,
    name: string,
    description: string,
    fullDescription: string,
    categoryId: number,
    price: number,
    salePrice: number,
    currency: string,
    slug: string,
    image: string
}