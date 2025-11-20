import { Component } from '@angular/core';
import { CreateTestCaseComponent } from './dashboard-components/create-test-case-component/create-test-case-component';
import { RecentDemosComponent } from "./dashboard-components/recent-demos-component/recent-demos-component";
import { RecentReportsComponent } from "./dashboard-components/recent-reports-component/recent-reports-component";
import { HttpClient } from '@angular/common/http';
import { ReturnedResultsModel } from './models/returned-results.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    CreateTestCaseComponent, 
    RecentDemosComponent, 
    RecentReportsComponent, 
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  results: any[] = [];
  returnedResults: ReturnedResultsModel[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  pingBackend(){
    this.isLoading = true;

    console.log("Pinging backend...");
    this.http.get<any>('http://localhost:3000/api/run-test')
      .subscribe({
        next: (rawReport) => {
          console.log("Response received");
          this.returnedResults = this.mapToModel(rawReport);
        },

        error: (err) => {
          console.error("Error occurred:", err);
          alert("Test failed to run. check console for details.");
          this.isLoading = false;
        },

        complete: () =>{
          console.log("Request completed");
          this.isLoading = false;
        }
      });
  }

  private mapToModel(rawReport: any): ReturnedResultsModel[] {
  const processedResults: ReturnedResultsModel[] = [];

  // Helper function to process a list of specs
  const processSpecs = (specs: any[], groupName: string, fileName: string) => {
    specs?.forEach((spec: any) => {
      spec.tests?.forEach((testRun: any) => {
        // Safety check: ensure results exist
        const result = testRun.results[0]; 
        if (!result) return;

        processedResults.push({
          status: result.status,
          browser: testRun.projectName,
          testFile: fileName,
          testGroup: groupName, // Might be 'Root' or the Describe name
          testName: spec.title,
          duration: result.duration,
          workerId: result.workerIndex,
          workerDuration: result.duration,
          totalTests: rawReport.stats.expected
        });
      });
    });
  };

  // Iterate through files
  rawReport.suites?.forEach((fileSuite: any) => {
    // 1. Capture Top-Level Tests (No Describe block)
    if (fileSuite.specs) {
      processSpecs(fileSuite.specs, 'Root', fileSuite.title);
    }

    // 2. Capture Nested Tests (Inside Describe blocks)
    fileSuite.suites?.forEach((groupSuite: any) => {
      if (groupSuite.specs) {
        processSpecs(groupSuite.specs, groupSuite.title, fileSuite.title);
      }
    });
  });

  return processedResults;
}
}
