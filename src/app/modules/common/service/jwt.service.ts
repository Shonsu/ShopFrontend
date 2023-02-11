import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
@Injectable({
    providedIn: 'root'
})
export class JwtService {

    constructor() { }

    setToken(token: string) {
        localStorage.setItem("token", token);
    }

    getToken(): string | null {
        return localStorage.getItem("token");
    }

    isLoggedIn(): boolean {
        let token = localStorage.getItem("token");
        return token != null && this.notExpired(token);
    }

    notExpired(token: any): boolean {
        let tokenDocoded = jwtDecode<any>(token);
        return (tokenDocoded.exp * 1000) > new Date().getTime();
    }

    removeToken(){
        let token = localStorage.getItem("token");
        if(token){
            localStorage.removeItem("token");
        }
    }
}
