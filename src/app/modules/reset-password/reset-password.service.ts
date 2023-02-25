import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }


  resetPasswordEmailRequest(email: any): Observable<any>{
    return this.http.post("/api/users/resetPassword", email);
  }

  changePassword(resetRequest: any): Observable<any>{
    return this.http.patch("/api/users/resetPassword", resetRequest);
  }

}
