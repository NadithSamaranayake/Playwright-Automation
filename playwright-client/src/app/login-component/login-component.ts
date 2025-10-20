import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { LoginCredentials } from './models/auth.model';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, NgClass, ReactiveFormsModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {

  name = new FormControl(''); 

  passwordVisible: boolean = false;

  activeForm: "signIn" | "signUp" = "signIn";

  setActiveForm(form: "signIn" | "signUp") {
    this.activeForm = form;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(form: NgForm){
    alert('Form submitted!');

    const credentials: LoginCredentials = form.value;
    console.log(credentials.userNameorEmail, credentials.password);
  }
}
