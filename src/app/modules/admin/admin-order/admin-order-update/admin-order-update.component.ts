import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminOrderService } from '../admin-order.service';
import { AdminOrder } from '../model/adminOrder';

@Component({
    selector: 'app-admin-order-update',
    templateUrl: './admin-order-update.component.html',
    styleUrls: ['./admin-order-update.component.scss']
})
export class AdminOrderUpdateComponent implements OnInit {

    //TODO scnackBar

    order!: AdminOrder;
    formGroup!: FormGroup;
    statuses!: Map<string, string>;

    constructor(
        private router: ActivatedRoute,
        private adminOrderService: AdminOrderService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.getOrder();
        this.getInitData();
        this.formGroup = this.formBuilder.group({
            orderStatus: ['', Validators.required]
        });
    }

    getOrder() {
        let id = Number(this.router.snapshot.params['id']);
        this.adminOrderService.getOrder(id)
            .subscribe(order => {
                this.order = order;
                this.formGroup.setValue(
                    {
                        orderStatus: order.orderStatus
                    })
                order.orderLogs.sort((el1, el2) => new Date(el2.created).getTime() - new Date(el1.created).getTime());
            });
    }

    changeStatus() {
        this.adminOrderService.saveStatus(this.order.id, this.formGroup.value)
            .subscribe(() => {
                this.snackBar.open("Zapisano zmianę statusu", '', { duration: 3000 })
            });
    }

    getInitData() {
        this.adminOrderService.getInitData()
            .subscribe(data => this.statuses = data.orderStatuses);
    }

}
