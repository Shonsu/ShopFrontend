import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../common/service/jwt.service';
import { matchPasswordValidator } from '../common/validators/matchPasswordValidator';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    private readonly REDIRECT_ROUTE = "/profile";
    loginForm!: FormGroup;
    registerForm!: FormGroup;
    loginError = false;
    registerError = false;
    registerErrorMessage = "";

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private jwtService: JwtService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.jwtService.isLoggedIn()) {
            this.router.navigate([this.REDIRECT_ROUTE]);
        }


        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            loginPassword: ['', [Validators.required, Validators.minLength(8)]]
        });
        this.registerForm = this.formBuilder.group({
            registerUsername: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            repeatedPassword: ['', [Validators.required, Validators.minLength(8)]]
        },
            {
                validators: matchPasswordValidator
            });
    }

    login() {
        if (this.loginForm.valid) {
            this.loginService.login(this.loginForm.value)
                .subscribe({
                    next: response => {
                        this.jwtService.setToken(response.token);
                        this.router.navigate([this.REDIRECT_ROUTE]);
                        this.loginError = false;
                    },
                    error: () => {
                        this.loginError = true;
                    }
                });
        }
    }

    register() {
        if (this.registerForm.valid && this.isPasswordIdentical(this.registerForm.value)) {
            this.loginService.register(this.registerForm.value)
                .subscribe({
                    next: response => {
                        this.jwtService.setToken(response.token);
                        this.router.navigate([this.REDIRECT_ROUTE]);
                    },
                    error: err => {
                        this.registerError = true;
                        if (err.error.message) {
                            this.registerErrorMessage = err.error.message;
                        } else {
                            this.registerErrorMessage = "Coś poszło źle, spróbuj ponownie później";
                        }
                    }
                });
        }
    }
    private isPasswordIdentical(register: any): boolean {
        if (register.resetPassword === register.resetRepeatedPassword) {
            this.registerError = false;
            return true;
        }
        this.registerError = true;
        this.registerErrorMessage = "Hasła nie są identyczne";
        return false;
    }

    get loginPassword() {
        return this.loginForm.get("loginPassword");
    }
    get username() {
        return this.loginForm.get("username");
    }
    get registerUsername() {
        return this.registerForm.get("registerUsername");
    }
    get password() {
        return this.registerForm.get("password");
    }
    get repeatedPassword() {
        return this.registerForm.get("repeatedPassword");
    }
}
