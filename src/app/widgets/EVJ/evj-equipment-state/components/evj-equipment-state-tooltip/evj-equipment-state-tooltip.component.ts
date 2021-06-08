import { Component, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { IEquipmentStateComment } from '@dashboard/models/EVJ/equipment-state';

@Component({
  selector: 'evj-equipment-state-tooltip',
  styleUrls: ['./evj-equipment-state-tooltip.component.scss'],
  templateUrl: './evj-equipment-state-tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('evj-equipment-state-tooltip', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(100, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class EquipmentStateTooltipComponent {
  @Input() comment: IEquipmentStateComment;
  @Input() overlayRef;

  @HostListener('mouseenter')
  private hover(): void {
    this.overlayRef.overlayHoverRef = true;
  }

  @HostListener('mouseout')
  private leave(): void {
    this.overlayRef.overlayHoverRef = false;
    this.overlayRef.hide();
  }
}
