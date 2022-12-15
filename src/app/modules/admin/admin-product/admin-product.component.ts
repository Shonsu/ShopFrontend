import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { map, startWith, Subscription, switchMap } from 'rxjs';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { AdminProductService } from './admin-product.service';
import { AdminProduct } from './model/adminProduct';

@Component({
    selector: 'app-admin-product',
    templateUrl: './admin-product.component.html',
    styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements AfterViewInit, OnInit, OnDestroy {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatTable) table!: MatTable<any>;
    displayedColumns: string[] = ["id", "image", "name", "price", "actions"];
    data: AdminProduct[] = [];
    totalElements: number = 0;
    private sub!: Subscription;

    constructor(
        private adminProductService: AdminProductService,
        private dialogService: AdminConfirmDialogService,
        private router: Router
    ) { }


    ngOnInit(): void {
        this.sub = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.getProductData();
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.getProductData();
    }

    private getProductData() {
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

    confirmDelete(element: AdminProduct) {
        this.dialogService.openConfirmDialog("Czy na pewno chcesz usunąć ten produkt?")
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.adminProductService.delete(element.id)
                        .subscribe(() => {
                            this.data.forEach((value, index) => {
                                if (element == value) {
                                    this.data.splice(index, 1);
                                    this.table.renderRows();
                                }
                            })
                        });
                }
            });
    }

}
