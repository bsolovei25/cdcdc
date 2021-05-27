import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {CmidEventToogleValue} from '../evj-cmid-event-toggle/evj-cmid-event-toggle.component';
import {EvjCmidEventChipPopoverComponent} from './components/evj-cmid-event-chip-popover/evj-cmid-event-chip-popover.component';
import {PopoverOverlayService} from '@shared/components/popover-overlay/popover-overlay.service';
import { ICmidEventChip } from "@widgets/EVJ/evj-events-workspace/evj-cmid-event/cmid-event.interface";


@Component({
    selector: 'evj-cmid-event-chips',
    templateUrl: './evj-cmid-event-chips.component.html',
    styleUrls: ['./evj-cmid-event-chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvjCmidEventChipsComponent implements OnInit {
    @Input()
    public toggleValue: CmidEventToogleValue = 'non-plan';

    @Input()
    public totalCount: number;

    @Input()
    public enableTitles: boolean = true;

    @Input()
    public enableControls: boolean = true;

    @Input()
    public chips: ICmidEventChip[] = [];

    @Output() onRemoveItem: EventEmitter<ICmidEventChip> = new EventEmitter<ICmidEventChip>()

    constructor(private popoverOverlayService: PopoverOverlayService) {}

    ngOnInit(): void {}

    public removeItem(item: ICmidEventChip): void {
        this.onRemoveItem.next(item);
    }

    public chipClick(chip: ICmidEventChip): void {
        const element = document.getElementById(chip.name);
        this.openPopover(element, chip);
    }

    private openPopover(origin: HTMLElement, chip: ICmidEventChip): void {
        const popoverRef = this.popoverOverlayService.open({
            content: EvjCmidEventChipPopoverComponent,
            origin,
            data: chip,
        });
        popoverRef.afterClosed$.subscribe((res) => {});
    }
}
