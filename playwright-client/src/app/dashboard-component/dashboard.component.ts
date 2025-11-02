import { Component } from '@angular/core';
import { HeaderComponent } from "../header-component/header-component";
import { LeftNavigationComponent } from "../left-navigation-component/left-navigation-component";

@Component({
  selector: 'app-dashboard',
  imports: [LeftNavigationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
