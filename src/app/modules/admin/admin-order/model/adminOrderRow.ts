import { AdminProduct } from "../../admin-product/model/adminProduct";
import { AdminShipmentDto } from "./adminShipmentDto";

export interface AdminOrderRow{
    id: number,
    orderId: number,
    product: AdminProduct,
    quantity: number,
    price: number,
    shipment: AdminShipmentDto
}