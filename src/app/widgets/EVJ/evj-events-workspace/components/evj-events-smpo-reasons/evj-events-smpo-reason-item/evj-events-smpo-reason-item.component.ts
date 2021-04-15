import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IMenuItem } from "../../evj-events-smpo-reasons-menu/evj-events-smpo-reasons-menu-item/evj-events-smpo-reasons-menu-item.component";

@Component({
    selector: 'evj-evj-events-smpo-reason-item',
    templateUrl: './evj-events-smpo-reason-item.component.html',
    styleUrls: ['./evj-events-smpo-reason-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvjEventsSmpoReasonItemComponent {
    @Input() item: IMenuItem;
    @Output() onRemoveItem: EventEmitter<IMenuItem> = new EventEmitter<IMenuItem>();

    public removeItem(item: IMenuItem): void {
        this.onRemoveItem.emit(item);
    }

}
