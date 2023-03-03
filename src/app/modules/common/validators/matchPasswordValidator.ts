import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password: string = control.get("password")?.value;
        const repeatedPassword: string = control.get("repeatedPassword")?.value;

        if (password && repeatedPassword) {
            return (password === repeatedPassword) ? null : { passwordMatch: true };
        }
        return null;
    }
