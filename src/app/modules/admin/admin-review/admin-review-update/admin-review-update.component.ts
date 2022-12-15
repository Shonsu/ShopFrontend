import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminMessageService } from '../../common/service/admin-message.service';
import { AdminReviewService } from '../admin-review.service';
import { AdminReview } from '../model/adminReview';

@Component({
    selector: 'app-admin-review-update',
    templateUrl: './admin-review-update.component.html',
    styleUrls: ['./admin-review-update.component.scss']
})
export class AdminReviewUpdateComponent implements OnInit {

    reviewForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private adminReviewService: AdminReviewService,
        private router: ActivatedRoute,
        private snackBar: MatSnackBar,
        private adminMessageService: AdminMessageService
    ) { }

    ngOnInit(): void {
        this.getReviews();
        this.reviewForm = this.formBuilder.group({
            authorName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
            content: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(600)]]
        });
    }

    submit() {
        let id = Number(this.router.snapshot.params['id']);
        if (this.reviewForm.valid) {
            this.adminReviewService.updatyReview(id, {
                authorName: this.reviewForm.get("authorName")?.value,
                content: this.reviewForm.get("content")?.value,
            } as AdminReview).subscribe({
                next: (review) => {
                    this.reviewForm.setValue({
                        authorName: review.authorName,
                        content: review.content
                    });
                    this.snackBar.open('Opinia została zapisana', '', { duration: 3000 });
                },
                error: err => this.adminMessageService.add(err.error)
            });
        }
    }

    getReviews() {
        let id = Number(this.router.snapshot.params['id'])
        this.adminReviewService.getReview(id).subscribe(review => {
            this.reviewForm.setValue({
                authorName: review.authorName,
                content: review.content
            });
        });
    }

    get authorName() {
        return this.reviewForm.get('authorName');
    }

    get content() {
        return this.reviewForm.get('content');
    }
}
