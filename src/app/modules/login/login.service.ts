import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private http: HttpClient
    ) { }

    login(login: any): Observable<any> {
        return this.http.post("/api/login", login);
    }

    register(register: any): Observable<any> {
        return this.http.post("/api/register", register);
    }

}
