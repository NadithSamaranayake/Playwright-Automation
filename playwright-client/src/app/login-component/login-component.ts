import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';

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

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ){}

  setActiveForm(form: "signIn" | "signUp") {
    this.activeForm = form;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  async onSubmit(form: NgForm){

    if(form.invalid) return;

    if(this.activeForm === "signIn"){
      const {data, error} = await this.supabaseService.signIn(form.value);

      if(error){
        console.error("Error signing in:", error.message);
      } else {
        // alert("Sign in successful!");
        this.router.navigate(['/dashboard']);
      }
    } else {
      const {data, error} = await this.supabaseService.signUp(form.value);

      if(error){
        console.error("Error signing up:", error.message);
      } else {
        alert("Sign up successful! Please check your email to confirm your account.");
        this.router.navigate(['/dashboard']);
      }
    }
  }
}
