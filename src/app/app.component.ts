import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/animations';
import { RouterOutlet } from '@angular/router';
import ru from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
registerLocaleData(ru);

@Component({
    selector: 'evj-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [slideInAnimation],
})
export class AppComponent {
    title = 'evj';

    constructor() {}

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
