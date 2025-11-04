import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from "@angular/router";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-left-navigation-component',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './left-navigation-component.html',
  styleUrl: './left-navigation-component.scss'
})
export class LeftNavigationComponent {

  activeButton: string = 'Dashboard';
  activeIcon: string = 'fa-grip';

  constructor(private router: Router){
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.updateActiveButton(event.urlAfterRedirects);
    });
  }

  updateActiveButton(url: string) {
    if (url.includes('dashboard')) {
      this.activeButton = 'Dashboard';
      this.activeIcon = 'fa-grip';
    } 
    else if (url.includes('test-cases')) {
      this.activeButton = 'Test Cases';
      this.activeIcon = 'fa-file-alt';
    } 
    else if (url.includes('reports')) {
      this.activeButton = 'Reports';
      this.activeIcon = 'fa-chart-line';
    }
  }

  setActiveButton(button: string, icon: string) {
    this.activeButton = button;
    this.activeIcon = icon;
  }
}
