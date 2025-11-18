import { Component } from '@angular/core';
import { CreateTestCaseComponent } from './dashboard-components/create-test-case-component/create-test-case-component';
import { RecentDemosComponent } from "./dashboard-components/recent-demos-component/recent-demos-component";
import { RecentReportsComponent } from "./dashboard-components/recent-reports-component/recent-reports-component";
import { HttpClient } from '@angular/common/http';
import { JsonPipe, NgFor } from '@angular/common';
import { ReturnedResultsModel } from './models/returned-results.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    CreateTestCaseComponent, 
    RecentDemosComponent, 
    RecentReportsComponent, 
    JsonPipe,
    NgFor
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  results: any[] = [];
  returnedResults: ReturnedResultsModel[] = [];

  constructor(private http: HttpClient) {}

  pingBackend(){
    console.log("Pinging backend...");
    this.http.get('http://localhost:3000/api/run-test')
    .subscribe(response =>{
      console.log("Response from backend:", response);
      alert("Backend Response: " + JSON.stringify(response));
      this.results = [response];
      this.returnedResults = [response as ReturnedResultsModel];
    });


  }
}
