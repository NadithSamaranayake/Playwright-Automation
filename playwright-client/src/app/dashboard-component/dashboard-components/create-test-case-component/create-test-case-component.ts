import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CreateTestCaseModel } from '../../models/create-test-case.model';

@Component({
  selector: 'app-create-test-case-component',
  imports: [FormsModule],
  templateUrl: './create-test-case-component.html',
  styleUrl: './create-test-case-component.scss'
})
export class CreateTestCaseComponent {

  testConfig: CreateTestCaseModel = {
    url: '',
    testName: '',
    headless: false,
    expectedResult: '',
    description: '',
    slowmo: 0
  };

  results: any[] = [];

  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    console.log("Form Submitted!", form.value);  

  }

  onClear(){
    this.testConfig = {
      url: '',
      testName: '',
      headless: true,
      expectedResult: '',
      description: '',
      slowmo: 0
    }
  }
}
