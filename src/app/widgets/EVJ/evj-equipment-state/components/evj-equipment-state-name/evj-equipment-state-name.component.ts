import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: 'evj-equipment-state-name',
  templateUrl: './evj-equipment-state-name.component.html',
  styleUrls: ['./evj-equipment-state-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentStateNameComponent {
  @Input() public value: string;
  @Input() public state: string;
}
