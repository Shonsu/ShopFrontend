import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminReviewUpdate } from './admin-review-update/model/adminReviewUpdate';
import { AdminReview } from './model/adminReview';

@Injectable({
    providedIn: 'root'
})
export class AdminReviewService {


    constructor(private http: HttpClient) { }

    delete(id: number): Observable<void> {
        return this.http.delete<void>("/api/admin/reviews/" + id);
    }

    getReviews(): Observable<Array<AdminReview>> {
        return this.http.get<Array<AdminReview>>("/api/admin/reviews");
    }

    getReview(id: number): Observable<AdminReview> {
        return this.http.get<AdminReview>('/api/admin/reviews/' + id);
    }

    saveReview(id: number, value: AdminReview) {
        return this.http.put<AdminReview>('/api/admin/reviews/' + id, value);
    }

    updatyReview(id: number, value: AdminReviewUpdate): Observable<AdminReview> {
        return this.http.patch<AdminReview>('/api/admin/reviews/' + id, value);
    }

    moderate(id: number): Observable<void> {
        return this.http.patch<void>(`/api/admin/reviews/${id}/moderate`, '');
    }
}
