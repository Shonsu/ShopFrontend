import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith, switchMap } from 'rxjs';
import { AdminOrderService } from './admin-order.service';
import { AdminOrder } from './model/adminOrder';

@Component({
    selector: 'app-admin-order',
    templateUrl: './admin-order.component.html',
    styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements AfterViewInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    displayedColumns: string[] = ["id", "placeDate", "orderStatus", "grossValue", "actions"];
    data: Array<AdminOrder> = [];
    totalElements: number = 0;


    constructor(
        private adminOrderService: AdminOrderService
    ) { }

    ngAfterViewInit(): void {
        this.getOrders();
    }

    getOrders() {
        this.paginator.page.pipe(
            startWith({}),
            switchMap(() => {
                return this.adminOrderService.getOrders(this.paginator.pageIndex, this.paginator.pageSize);
            }),
            map(data => {
                if (data === null) {
                    return [];
                }
                this.totalElements = data.totalElements;
                return data.content;
            })
        ).subscribe(data => (this.data = data));
    }

}
