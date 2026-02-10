import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  imports: [
    RouterLinkActive,
    RouterLink,
  ],
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  menuOpen: boolean = true; // correspond à ce que tu utilises dans le HTML
}
