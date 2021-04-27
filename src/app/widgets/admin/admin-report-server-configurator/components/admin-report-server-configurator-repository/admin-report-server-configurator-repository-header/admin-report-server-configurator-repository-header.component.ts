import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminReportServerConfiguratorRepositoryAddFileComponent } from '../admin-report-server-configurator-repository-add-file/admin-report-server-configurator-repository-add-file.component';
import { AdminReportServerConfiguratorRepositoryAddComponent } from '../admin-report-server-configurator-repository-add/admin-report-server-configurator-repository-add.component';
import { AdminReportConfiguratorService } from "@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator.service";

@Component({
    selector: 'evj-admin-report-server-configurator-repository-header',
    templateUrl: './admin-report-server-configurator-repository-header.component.html',
    styleUrls: ['./admin-report-server-configurator-repository-header.component.scss'],
})
export class AdminReportServerConfiguratorRepositoryHeaderComponent implements OnInit {
    public add: boolean = false;
    public readonly addIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/add.svg';
    public readonly searchIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/search.svg';
    public readonly folderIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/folder.svg';
    public readonly reportIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/report.svg';

    @ViewChild('button', { static: true }) private buttonRef: ElementRef<HTMLButtonElement>;
    @ViewChild(TemplateRef, { static: true }) private templateRef: TemplateRef<HTMLElement>;

    constructor(public dialog: MatDialog, private overlay: Overlay, private viewContainerRef: ViewContainerRef, public helperService: AdminReportConfiguratorService) {}

    ngOnInit(): void {}

    public addFile(): void {
        const positionStrategyBuilder = this.overlay.position();

        const positionStrategy = positionStrategyBuilder
            .flexibleConnectedTo(this.buttonRef.nativeElement)
            .withFlexibleDimensions(true)
            .withPush(true)
            .withGrowAfterOpen(true)
            .withPositions([
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top',
                },
            ]);
        const scrollStrategy = this.overlay.scrollStrategies.block();

        const overlayRef = this.overlay.create({
            hasBackdrop: true,
            positionStrategy,
            scrollStrategy,
        });

        const templatePortal = new TemplatePortal(this.templateRef, this.viewContainerRef);

        overlayRef.attach(templatePortal);

        overlayRef.backdropClick().subscribe(() => {
            overlayRef.dispose();
        });
    }

    public addFolder(): void {
        this.dialog.open(AdminReportServerConfiguratorRepositoryAddComponent);
    }

    public addReport(): void {
        this.dialog.open(AdminReportServerConfiguratorRepositoryAddFileComponent);
    }
}
