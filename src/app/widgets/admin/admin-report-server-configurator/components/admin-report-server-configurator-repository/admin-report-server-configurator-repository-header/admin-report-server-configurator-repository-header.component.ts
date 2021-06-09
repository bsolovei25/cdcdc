import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminReportConfiguratorService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator.service';
import { AdminReportServerConfiguratorRepositoryAddFileComponent } from '../admin-report-server-configurator-repository-add-file/admin-report-server-configurator-repository-add-file.component';
import { AdminReportServerConfiguratorRepositoryAddFolderComponent } from '../admin-report-server-configurator-repository-add-folder/admin-report-server-configurator-repository-add-folder.component';
import { AdminReportServerConfiguratorRepositoryAddSvgFileComponent } from '@widgets/admin/admin-report-server-configurator/components/admin-report-server-configurator-repository/admin-report-server-configurator-repository-add-svg-file/admin-report-server-configurator-repository-add-svg-file.component';

@Component({
    selector: 'evj-admin-report-server-configurator-repository-header',
    templateUrl: './admin-report-server-configurator-repository-header.component.html',
    styleUrls: ['./admin-report-server-configurator-repository-header.component.scss'],
})
export class AdminReportServerConfiguratorRepositoryHeaderComponent implements OnInit {

    @Output() folderAdded: EventEmitter<void> = new EventEmitter<void>();
    @Output() fileAdded: EventEmitter<void> = new EventEmitter<void>();

    public add: boolean = false;
    public readonly addIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/add.svg';
    public readonly searchIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/search.svg';
    public readonly folderIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/folder.svg';
    public readonly reportIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/report.svg';

    public form: FormGroup = new FormGroup({
        search: new FormControl(''),
    });
    private subscribe$: Subject<null> = new Subject<null>();
    private overlayRef: OverlayRef;

    @ViewChild('button', {static: true}) private buttonRef: ElementRef<HTMLButtonElement>;
    @ViewChild(TemplateRef, {static: true}) private templateRef: TemplateRef<HTMLElement>;

    constructor(
        public dialog: MatDialog,
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
        private arscService: AdminReportConfiguratorService,
        public helperService: AdminReportConfiguratorService,
    ) {
    }

    ngOnInit(): void {
        this.form.get('search').valueChanges
            .pipe(takeUntil(this.subscribe$))
            .subscribe((x) => (
                this.arscService.search$.next(x)
            ));
    }

    public openMenu(): void {
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

        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            positionStrategy,
            scrollStrategy,
        });

        const templatePortal = new TemplatePortal(this.templateRef, this.viewContainerRef);

        this.overlayRef.attach(templatePortal);

        this.overlayRef
            .backdropClick()
            .subscribe(() => {
                this.closeMenu();
            });
    }

    public addFolder(): void {
        this.closeMenu();

        const dialogRef = this.dialog.open(AdminReportServerConfiguratorRepositoryAddFolderComponent);

        dialogRef
            .afterClosed()
            .subscribe(() => {
                this.folderAdded.emit();
            });
    }

    public addFile(): void {
        this.closeMenu();

        const dialogRef = this.dialog.open(AdminReportServerConfiguratorRepositoryAddSvgFileComponent);

        dialogRef
            .afterClosed()
            .subscribe(() => {
                this.fileAdded.emit();
            });
    }

    public addReport(): void {
        this.dialog.open(AdminReportServerConfiguratorRepositoryAddFileComponent);
    }

    private closeMenu(): void {
        this.overlayRef?.dispose();
    }
}
