import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';
import { AdminProductService } from './admin-product.service';
import { AdminProduct } from './model/adminProduct';

@Component({
    selector: 'app-admin-product',
    templateUrl: './admin-product.component.html',
    styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements AfterViewInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    displayedColumns: string[] = ["id", "name", "price", "actions"];
    data: AdminProduct[] = [];
    totalElements: number = 0;

    constructor(
        private adminProductService: AdminProductService,
        private router: Router
        ) { }

    ngAfterViewInit(): void {
        this.paginator.page.pipe(
            startWith({}),
            switchMap(() => {
                return this.adminProductService.getProducts(this.paginator.pageIndex, this.paginator.pageSize);
            }),
            map(data => {
                this.totalElements = data.totalElements;
                return data.content;
            })
        ).subscribe(data => (this.data = data));
    }

    displayUpdateProduct(row: AdminProduct){
        let route = '/admin/products/update/' + row.id;
        this.router.navigate([route]);
    }

}
