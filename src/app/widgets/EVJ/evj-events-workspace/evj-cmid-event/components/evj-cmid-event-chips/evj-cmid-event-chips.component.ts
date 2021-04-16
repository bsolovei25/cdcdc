import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CmidEventToogleValue} from '../evj-cmid-event-toggle/evj-cmid-event-toggle.component';
import {EvjCmidEventChipPopoverComponent} from './components/evj-cmid-event-chip-popover/evj-cmid-event-chip-popover.component';
import {PopoverOverlayService} from '@shared/components/popover-overlay/popover-overlay.service';

export interface ICmidEventChip {
    id: number;
    name: string;
    description?: string;
    position?: string;
    piTag?: string;
}

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
    public enableTitles: boolean = true;

    @Input()
    public enableControls: boolean = true;

    @Input()
    public chips: ICmidEventChip[] = [
        {
            id: 0,
            name: 'K_DBL_TI796',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 1,
            name: 'K_DBL_FI43A',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 2,
            name: 'K_DBL_LSA1464',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 3,
            name: 'K_DBL_FRSA42B',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 4,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
    ];

    constructor(private popoverOverlayService: PopoverOverlayService) {}

    ngOnInit(): void {}

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
