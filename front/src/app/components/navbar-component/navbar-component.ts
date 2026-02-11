import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.html',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  styleUrls: ['./navbar-component.css']
})
export class NavbarComponent {
  menuOpen: boolean = true; // correspond à ce que tu utilises dans le HTML
}
