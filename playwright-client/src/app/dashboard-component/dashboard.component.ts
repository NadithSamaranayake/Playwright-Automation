import { Component } from '@angular/core';
import { CreateTestCaseComponent } from './dashboard-components/create-test-case-component/create-test-case-component';
import { RecentDemosComponent } from "./dashboard-components/recent-demos-component/recent-demos-component";
import { RecentReportsComponent } from "./dashboard-components/recent-reports-component/recent-reports-component";

@Component({
  selector: 'app-dashboard',
  imports: [CreateTestCaseComponent, RecentDemosComponent, RecentReportsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
