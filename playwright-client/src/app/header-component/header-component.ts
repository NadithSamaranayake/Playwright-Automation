import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header-component',
  imports: [AsyncPipe],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {

  constructor(public supabaseService: SupabaseService) {}

  async logOut(){
    await this.supabaseService.signOut();
  }
}
