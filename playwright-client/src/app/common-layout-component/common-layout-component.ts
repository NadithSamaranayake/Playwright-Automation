import { Component } from '@angular/core';
import { LeftNavigationComponent } from "../left-navigation-component/left-navigation-component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-common-layout-component',
  imports: [LeftNavigationComponent, RouterOutlet],
  templateUrl: './common-layout-component.html',
  styleUrl: './common-layout-component.scss'
})
export class CommonLayoutComponent {

}
