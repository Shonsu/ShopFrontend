import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { matchPasswordValidator } from './matchPasswordValidator';
import { ResetPasswordService } from './reset-password.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    emailForm!: FormGroup;
    passwordResetForm!: FormGroup;
    performAction = false;
    actionMessage!: string;

    token!: string;

    constructor(
        private formBuilder: FormBuilder,
        private resetPasswordService: ResetPasswordService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.token = this.route.snapshot.queryParams['token'];
        this.emailForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
        this.passwordResetForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(8)]],
            repeatedPassword: ['', [Validators.required, Validators.minLength(8)]]
        },
            {
                validators: matchPasswordValidator
            }
        )
    }
    sendResetLink() {
        this.resetPasswordService.resetPasswordEmailRequest({
            email: this.emailForm.get('email')?.value
        })
            .subscribe();
        this.performAction = true;
        this.actionMessage = "Jeśli email widnieje w naszej bazie danych, zostanie na niego wysłany link do zresetowania hasła."
    }

    changePassword() {
        if (this.passwordResetForm.valid) {
            this.resetPasswordService.changePassword({
                password: this.passwordResetForm.get('password')?.value,
                repeatedPassword: this.passwordResetForm.get('repeatedPassword')?.value,
                token: this.token
            })
                .subscribe({
                    next: () => {
                        this.actionMessage = "Hasło zostało zmienione.",
                        this.router.navigate(["/resetPassword"])
                    },
                    error: err => {
                        this.actionMessage = 'Hasło nie zostało zmienione, spróbuj jeszcze raz.</br><a href="/resetPassword">Reset hasła</a>';
                    }
                });
            this.performAction = true;
        }
    }

    get password() {
        return this.passwordResetForm.get("password");
    }

    get repeatedPassword() {
        return this.passwordResetForm.get("repeatedPassword");
    }
}
