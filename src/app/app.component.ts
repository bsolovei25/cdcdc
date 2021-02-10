import { Component, Inject, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/animations';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT, registerLocaleData } from '@angular/common';
import { ThemeConfigurator, ThemeConfiguratorService } from '@core/service/theme-configurator.service';
import ru from '@angular/common/locales/ru';
registerLocaleData(ru);

@Component({
    selector: 'evj-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
    constructor(@Inject(DOCUMENT) private document: Document, private themeService: ThemeConfiguratorService) {}

    ngOnInit(): void {
        this.themeService.setThemeConfiguratorRoot(this.document);
    }

    prepareRoute(outlet: RouterOutlet): boolean {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
