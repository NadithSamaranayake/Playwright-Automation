import { Component } from '@angular/core';
import { HeaderComponent } from "../header-component/header-component";

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
