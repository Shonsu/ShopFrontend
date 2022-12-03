import { Page } from "src/app/shared/model/page";
import { Product } from "../../product/model/Product";
import { Category } from "./category";

export interface CategoryProducts{
    category: Category,
    products: Page<Product>
}