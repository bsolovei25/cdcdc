import { Component, Input, ViewChild, ElementRef, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { INavItem } from '../aps-dropdown-menu/aps-dropdown-menu.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { ApsContextMenuDirective } from './aps-context-menu.directive';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'evj-aps-context-menu',
    templateUrl: './aps-context-menu.component.html',
    styleUrls: ['./aps-context-menu.component.scss'],
})
export class ApsContextMenuComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('clickHoverMenuTrigger') clickHoverMenuTrigger: MatMenuTrigger;

    @Input()
    public items: INavItem[] = [];

    @Input()
    public disabledDirective: boolean;

    public menuX: number = 0;

    public menuY: number = 0;

    private subscription: Subscription;

    @Input() event: Observable<any> = new Observable<any>();

    @ViewChild(MatMenuTrigger, { static: false })
    public menu: MatMenuTrigger;

    @ViewChild('container', { static: false })
    public container: ElementRef;

    constructor(public directive: ApsContextMenuDirective, public elRef: ElementRef) {}

    public ngOnInit(): void {}

    public ngAfterViewInit(): void {
        this.subscription = this.event.subscribe((event) => this.triggerContextMenu(event));
    }

    public triggerContextMenu(event: any): void {
        if (!event) {
            return;
        }
        event.preventDefault();
        this.menu?.closeMenu();
        const offsetX = this.container?.nativeElement.parentNode.parentNode.getBoundingClientRect().x;
        const offsetY = this.container?.nativeElement.parentNode.parentNode.getBoundingClientRect().y;
        this.menuX = event?.clientX - offsetX;
        this.menuY = event?.clientY - offsetY;
        this.menu?.openMenu();
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
