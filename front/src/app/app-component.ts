import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductComponent} from './components/product/product';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductComponent],
  templateUrl: './app-component.html',
  styleUrls: ['./app-component.css']
})
  export class AppComponent {
  protected readonly title = signal('front');
}
