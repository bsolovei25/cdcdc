import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ThemeConfiguratorService {
    public theme: number = 0;
    private readonly renderer: Renderer2;
    private themeConfigurator: ThemeConfigurator;

    constructor(private rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    public setThemeConfiguratorRoot(document: Document): void {
        this.themeConfigurator = new ThemeConfigurator(document, this.renderer);
        console.log(this.themeConfigurator);
    }

    public changeTheme(): void {
        console.log(this.themeConfigurator);
        this.themeConfigurator.switchTheme();
    }
}

export class ThemeConfigurator {
    private isDarkTheme$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isDarkThemeObservable: Observable<boolean> = this.isDarkTheme$.asObservable();

    constructor(private document: Document, private renderer: Renderer2) {
        this.isDarkThemeObservable.subscribe((ref) => this.setTheme(ref));
        this.theme = localStorage.getItem('theme') === 'true';
    }

    public set theme(value: boolean) {
        localStorage.setItem('theme', value.toString());
        this.isDarkTheme$.next(value);
    }

    public get theme(): boolean {
        return this.isDarkTheme$.getValue();
    }

    public switchTheme(): void {
        this.theme = !this.theme;
    }

    public setTheme(isDarkMode: boolean): void {
        if (!this.document) {
            return;
        }
        const hostClass = isDarkMode ? 'theme-dark' : 'theme-light';
        this.renderer.setAttribute(this.document.body, 'class', hostClass);
    }
}
