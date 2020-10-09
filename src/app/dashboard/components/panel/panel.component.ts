import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WIDGETS } from '../widgets-grid/widget-map';
import { ClaimService, EnumClaimScreens, EnumClaimWidgets } from '../../services/claim.service';
import { trigger, style, transition, animate } from '@angular/animations';

type isChoosePanel = 'widgets' | 'reports';

export const fadeAnimation = trigger('fadeAnimation', [
    transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate('100ms', style({ opacity: 0 }))]),
]);

@Component({
    selector: 'evj-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    animations: [fadeAnimation],
})
export class PanelComponent implements OnInit, OnDestroy {
    public readonly WIDGETS: typeof WIDGETS = WIDGETS;
    public active: boolean = false;
    public isWidgets: isChoosePanel;
    public claimSettingsScreens: EnumClaimScreens[] = [];
    public EnumClaimScreens: typeof EnumClaimScreens = EnumClaimScreens;
    public claimSettingsWidgets: EnumClaimWidgets[] = [];
    public EnumClaimWidgets: typeof EnumClaimWidgets = EnumClaimWidgets;

    private subscriptions: Subscription[] = [];

    constructor(private claimService: ClaimService) {}

    @Output() swap: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() grid: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit(): void {
        this.subscriptions.push(
            this.claimService.claimScreens$.subscribe((claims) => {
                this.claimSettingsScreens = claims;
            }),
            this.claimService.claimWidgets$.subscribe((claims) => {
                this.claimSettingsWidgets = claims;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    onToggleClick(buttonName: isChoosePanel): void {
        if (this.active && buttonName !== this.isWidgets) {
            this.isWidgets = buttonName;
        } else {
            this.active = !this.active;
            this.isWidgets = buttonName;
        }
    }

    onSwap(event: boolean): void {
        this.swap.emit(event);
    }

    onGrid(event: boolean): void {
        this.grid.emit(event);
    }
}
