import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { AdminCategoryNameDto } from '../common/dto/adminCategoryNameDto';
import { AdminCategoryService } from './admin-category.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-admin-category',
    templateUrl: './admin-category.component.html',
    styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit, OnDestroy {

    @ViewChild(MatTable) table!: MatTable<any>;
    displayedColumns: string[] = ["id", "name", "actions"];
    data: Array<AdminCategoryNameDto> = [];
    private sub!: Subscription;

    constructor(
        private adminCategoryService: AdminCategoryService,
        private dialogService: AdminConfirmDialogService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.sub = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.getCategories();
            }
        });
        this.getCategories();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getCategories() {
        this.adminCategoryService.getCategories()
            .subscribe(categories => this.data = categories);
    }

    confirmDelete(element: AdminCategoryNameDto) {
        this.dialogService.openConfirmDialog("Czy na pewno chcesz usunąć tę kategorię?")
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.adminCategoryService.delete(element.id)
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
