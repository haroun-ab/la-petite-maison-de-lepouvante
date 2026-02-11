  import { Component, signal } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import {NavbarComponent} from "./components/navbar-component/navbar-component";
  import { FooterComponent } from './components/footer-component/footer-component';
FooterComponent
  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, FooterComponent],
    templateUrl: './app-component.html',
    styleUrls: ['./app-component.css']
  })
  export class AppComponent {
    protected readonly title = signal('front');
  }
