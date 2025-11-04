import { Directive } from "@angular/core";
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[appPasswordMatcher]',
    standalone: true,
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: PasswordMatcherDirective,
        multi: true
    }]
})

export class PasswordMatcherDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {
        const formGroup = control as FormGroup;
        const password = formGroup.get('password');
        const confirmPassword = formGroup.get('confirmPassword');

        if(!password || !confirmPassword) {
            return null;
        }

        if(confirmPassword.errors && !confirmPassword.errors['mustMatch']){
            return null;
        }

        if(password.value !== confirmPassword.value){
            confirmPassword.setErrors({ mustMatch: true });
            return { mustMatch: true };
        } else {
            confirmPassword.setErrors(null);
            return null;
        }
    }
}