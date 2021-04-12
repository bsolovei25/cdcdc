import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminReportServerConfiguratorRepositoryAddComponent } from '../admin-report-server-configurator-repository-add/admin-report-server-configurator-repository-add.component';

@Component({
  selector: 'evj-admin-report-server-configurator-repository-header',
  templateUrl: './admin-report-server-configurator-repository-header.component.html',
  styleUrls: ['./admin-report-server-configurator-repository-header.component.scss']
})
export class AdminReportServerConfiguratorRepositoryHeaderComponent implements OnInit {
  public add: boolean = false;
  public readonly addIcon = "assets/icons/widgets/admin/admin-report-server-configurator/add.svg";
  public readonly searchIcon = 'assets/icons/widgets/admin/admin-report-server-configurator/search.svg';
  public readonly folderIcon = "assets/icons/widgets/admin/admin-report-server-configurator/folder.svg"
  public readonly reportIcon = "assets/icons/widgets/admin/admin-report-server-configurator/report.svg"

  @ViewChild('button', { static: true }) private buttonRef: ElementRef<HTMLButtonElement>;
  @ViewChild(TemplateRef, { static: true }) private templateRef: TemplateRef<HTMLElement>;

  constructor(public dialog: MatDialog, private overlay: Overlay, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
  }

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
          overlayY: 'top'
        }
      ])
      ;

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

  public addItem(): void {
    const dialogref = this.dialog.open(AdminReportServerConfiguratorRepositoryAddComponent)
  }

}
