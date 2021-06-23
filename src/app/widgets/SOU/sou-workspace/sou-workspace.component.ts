import {
    Component,
    OnInit,
    Inject,
    ViewChild,
    TemplateRef,
    ViewContainerRef,
    AfterViewInit,
    OnDestroy, Output, EventEmitter
} from '@angular/core';
import { WidgetService } from '@dashboard/services/widget.service';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';

import { WORKSPACE_BAR_INFO } from '@widgets/SOU/sou-workspace/mock';
import { animate, style, transition, trigger } from '@angular/animations';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { SouWorkspaceInfoBarComponent } from '@widgets/SOU/sou-workspace/components/sou-workspace-info-bar/sou-workspace-info-bar.component';
import { SouWorkspaceOperationComponent } from '@widgets/SOU/sou-workspace/components/sou-workspace-operation/sou-workspace-operation.component';
import { ISouStreamsOperation } from '@dashboard/models/SOU/sou-streams.model';
import { SouStreamsService } from '@dashboard/services/widgets/SOU/sou-streams.service';

@Component({
    selector: 'evj-sou-workspace',
    templateUrl: './sou-workspace.component.html',
    styleUrls: ['./sou-workspace.component.scss'],
    animations: [
        trigger(
            'animation',
            [
                transition(
                    ':enter',
                    [
                        style({ height: 0, opacity: 0, transform: 'translateY(-20px)' }),
                        animate('0.3s ease-out',
                            style({ height: 593, opacity: 1, transform: 'translateY(0px)' }))
                    ]
                ),
                transition(
                    ':leave',
                    [
                        style({ height: 300, opacity: 1 }),
                        animate('0.3s ease-in',
                            style({ height: 0, opacity: 0 }))
                    ]
                )
            ]
        )
    ]
})
export class SouWorkspaceComponent extends WidgetPlatform implements OnInit, AfterViewInit, OnDestroy {

    @Output() closeWorkspaceOut: EventEmitter<boolean> = new EventEmitter();

    public workspaceBarInfo: {} = WORKSPACE_BAR_INFO;
    public showChart: boolean = false;

    private overlayRef: OverlayRef;
    private portal: TemplatePortal;

    @ViewChild('overlayCustom') dialogTemplate: TemplateRef<any>;
    @ViewChild('infoBarSource') infoBarSource: SouWorkspaceInfoBarComponent;
    @ViewChild('infoBarDestination') infoBarDestination: SouWorkspaceInfoBarComponent;
    @ViewChild('operation') operation: SouWorkspaceOperationComponent;

    constructor(
        protected widgetService: WidgetService,
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
        private souStreamsService: SouStreamsService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngAfterViewInit(): void {
        this.portal = new TemplatePortal(this.dialogTemplate, this.viewContainerRef);
        this.overlayRef = this.overlay.create({
            positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
            hasBackdrop: true
        });
        this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
    }

    overlayDetach(): void {
        this.overlayRef.detach();
    }

    ngOnDestroy(): void {
        this.overlayRef.dispose();
    }

    protected dataHandler(ref: unknown): void {
    }

    openDialog(): void {
        this.overlayRef?.attach(this.portal);
    }

    public closeWorkspace(): void {
        this.closeWorkspaceOut.emit();
    }

    public save(): void {
        if (
            this.infoBarSource.isValid
            && this.infoBarDestination.isValid
            && this.operation.isValid
        ) {
            const operation: ISouStreamsOperation = {
                sourceName: this.infoBarSource?.selectedClient?.objectName,
                destinationName: this.infoBarDestination?.selectedClient?.objectName,
                startTime: this.operation?.startTime?.toJSON() || null,
                endTime: this.operation?.endTime?.toJSON() || null,
                sourceProduct: this.infoBarSource?.selectedProductName,
                destinationProduct: this.infoBarDestination?.selectedProductName,
                sourceMass: this.operation?.sourceMass,
                destinationMass: this.operation?.destinationMass,
                flow: '(поз. 2553)',
            };

            this.souStreamsService
                .createOperation(operation)
                .subscribe((resp: unknown) => {
                    console.log('operation created', resp);
                    this.closeWorkspace();
                }, (err) => {
                    console.error('operation create', err);
                });
        }
    }

}
