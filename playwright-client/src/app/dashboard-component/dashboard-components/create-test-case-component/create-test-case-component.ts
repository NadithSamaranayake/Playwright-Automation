import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-test-case-component',
  imports: [FormsModule],
  templateUrl: './create-test-case-component.html',
  styleUrl: './create-test-case-component.scss'
})
export class CreateTestCaseComponent {

  url: string = '';
  testName: string = '';
  headless: boolean = true;
  expectedResult: string = '';
  description: string = '';

  results: any[] = [];

  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    console.log("Form Submitted!", form.value);    
  }
}
