import { Component } from '@angular/core';
import { CreateTestCaseComponent } from './dashboard-components/create-test-case-component/create-test-case-component';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTestCaseComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
