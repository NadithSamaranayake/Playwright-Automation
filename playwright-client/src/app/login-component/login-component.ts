import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PasswordMatcherDirective } from '../directives/password-matcher.directive';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, NgClass, ReactiveFormsModule, FormsModule, PasswordMatcherDirective],
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
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Retry',
          confirmButtonColor: '#3085d6',
        });
      } else {
        // alert("Sign in successful!");        
        this.router.navigate(['/common-layout']);
      }
    } else {
      const {data, error} = await this.supabaseService.signUp(form.value);

      if(error){
        console.error("Error signing up:", error.message);
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Retry',
          confirmButtonColor: '#3085d6',
        });        
      } else {
        alert("Sign up successful! Please check your email to confirm your account.");
        Swal.fire({
          title: 'Success!',
          text: 'Sign up successful! Please check your email to confirm your account.',
          icon: 'success',
          confirmButtonText: 'Proceed',
          confirmButtonColor: '#3085d6',
        });
        this.router.navigate(['']);
      }
    }
  }
}
