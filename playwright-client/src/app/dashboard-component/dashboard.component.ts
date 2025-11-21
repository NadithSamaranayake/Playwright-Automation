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

  returnedResults: ReturnedResultsModel[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  pingBackend(){
    this.isLoading = true;

    console.log("Pinging backend...");
    this.http.get<any>('http://localhost:3000/api/run-test')
      .subscribe({
        next: (rawReport) => {
          console.log("Response received", rawReport);
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

    // 1. Iterate through every File (e.g., sample.spec.ts)
    rawReport.suites?.forEach((fileSuite: any) => {
      
      // --- CASE A: Tests at the Root Level (No Describe Block) ---
      if (fileSuite.specs && fileSuite.specs.length > 0) {
        this.extractSpecs(fileSuite.specs, fileSuite.title, 'Root', processedResults, rawReport.stats.expected);
      }

      // --- CASE B: Tests inside Describe Blocks (Nested Suites) ---
      if (fileSuite.suites && fileSuite.suites.length > 0) {
        fileSuite.suites.forEach((groupSuite: any) => {
          if (groupSuite.specs) {
            this.extractSpecs(groupSuite.specs, fileSuite.title, groupSuite.title, processedResults, rawReport.stats.expected);
          }
        });
      }
    });

    return processedResults;
  }

  // Helper function to avoid repeating code
  private extractSpecs(specs: any[], fileName: string, groupName: string, resultsArray: ReturnedResultsModel[], totalTests: number) {
    specs.forEach((spec: any) => {
      spec.tests?.forEach((testRun: any) => {
        const result = testRun.results[0];

        if (result) {
          resultsArray.push({
            status: result.status,
            browser: testRun.projectName,
            testFile: fileName,
            testGroup: groupName,
            testName: spec.title,
            duration: result.duration,
            workerId: result.workerIndex,
            workerDuration: result.duration,
            totalTests: totalTests
          });
        }
      });
    });
  }
}
