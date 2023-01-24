import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/modules/common/model/page';
import { AdminOrder } from './model/adminOrder';

@Injectable({
    providedIn: 'root'
})
export class AdminOrderService {

    constructor(private http: HttpClient) { }

    getOrders(page: number, size: number): Observable<Page<AdminOrder>> {
        return this.http.get<Page<AdminOrder>>(`/api/admin/orders?page=${page}&size=${size}`);
    }

    getOrder(id: number) {
        return this.http.get<AdminOrder>("/api/admin/orders/" + id);
    }
}
