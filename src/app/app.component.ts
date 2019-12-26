import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'evj-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'evj';

  constructor(private router: Router) {
  }
}
