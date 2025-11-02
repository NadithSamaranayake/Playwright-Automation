import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-left-navigation-component',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './left-navigation-component.html',
  styleUrl: './left-navigation-component.scss'
})
export class LeftNavigationComponent {

  activeButton: string = 'Dashboard';
  activeIcon: string = 'fa-grip';

  setActiveButton(button: string, icon: string) {
    this.activeButton = button;
    this.activeIcon = icon;
  }
}
