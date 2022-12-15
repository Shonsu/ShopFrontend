import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Review } from '../../product-details/model/review';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { AdminReviewService } from './admin-review.service';
import { AdminReview } from './model/adminReview';

@Component({
    selector: 'app-admin-review',
    templateUrl: './admin-review.component.html',
    styleUrls: ['./admin-review.component.scss']
})
export class AdminReviewComponent implements OnInit, OnDestroy {

    @ViewChild(MatTable) table!: MatTable<any>;
    displayedColumns: string[] = ["id", "authorName", "content", "moderated", "actions"];
    data: Array<Review> = [];
    private sub!: Subscription;

    constructor(
        private adminReviewService: AdminReviewService,
        private adminConfirmDialogService: AdminConfirmDialogService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.sub = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.getReviews();
            }
        });
        this.getReviews();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getReviews() {
        this.adminReviewService.getReviews()
            .subscribe(review => this.data = review);
    }

    confirmDelete(element: any) {
        this.adminConfirmDialogService.openConfirmDialog("Czy na pewno chcesz usunąć tę opinię?")
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.adminReviewService.delete(element.id)
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

    confirmApproval(element: AdminReview) {
        this.adminConfirmDialogService.openConfirmDialog("Czy na pewno chcesz zatwierdzić opinię?")
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.adminReviewService.moderate(element.id)
                        .subscribe(() => {
                            this.data.forEach((value, index) => {
                                if (element === value) {
                                    element.moderated = true;
                                }
                            })
                        });
                }
            })
    }

}
