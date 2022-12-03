import { Product } from "../../product/model/Product";

export interface Category{
    name: string,
    description: string,
    slug: string,
    products: Array<Product>
}