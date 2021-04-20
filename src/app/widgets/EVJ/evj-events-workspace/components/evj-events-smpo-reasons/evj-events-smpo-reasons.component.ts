import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IMenuItem } from "../evj-events-smpo-reasons-menu/evj-events-smpo-reasons-menu-item/evj-events-smpo-reasons-menu-item.component";

@Component({
    selector: 'evj-events-smpo-reasons',
    templateUrl: './evj-events-smpo-reasons.component.html',
    styleUrls: ['./evj-events-smpo-reasons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvjEventsSmpoReasonsComponent {
    @Input() items: IMenuItem[] = [];
    @Output() onRemoveItem: EventEmitter<IMenuItem> = new EventEmitter<IMenuItem>();

    public removeItem(value: IMenuItem): void {
        this.onRemoveItem.emit(value);
    }

}
