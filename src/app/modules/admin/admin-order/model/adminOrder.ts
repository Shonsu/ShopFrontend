import { AdminOrderRow } from "./adminOrderRow"
import { AdminPayment } from "./adminPayment"

export interface AdminOrder {
    id: number,
    placeDate: Date,
    orderStatus: string,
    grossValue: number,
    orderRows: Array<AdminOrderRow>
    firstname: string,
    lastname: string,
    street: string,
    zipcode: string,
    city: string,
    email: string,
    phone: string,
    payment: AdminPayment
}