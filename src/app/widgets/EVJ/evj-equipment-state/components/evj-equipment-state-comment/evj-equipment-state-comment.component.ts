import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IEquipmentStateComment } from "@dashboard/models/EVJ/equipment-state";

@Component({
    selector: 'evj-equipment-state-comment',
    templateUrl: './evj-equipment-state-comment.component.html',
    styleUrls: ['./evj-equipment-state-comment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentStateCommentComponent {
    @Input() comment: IEquipmentStateComment;
}
