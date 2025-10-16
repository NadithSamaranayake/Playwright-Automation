import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, NgClass],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {

  activeForm: "signIn" | "signUp" = "signIn";

  setActiveForm(form: "signIn" | "signUp") {
    this.activeForm = form;
  }
}
