import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IAsEfInitialDataBlock } from '../../../../../dashboard/models/ASTUE/astue-efficiency.model';

@Component({
    selector: 'evj-astue-efficiency-inintial-data-block',
    templateUrl: './astue-efficiency-inintial-data-block.component.html',
    styleUrls: ['./astue-efficiency-inintial-data-block.component.scss'],
})
export class AstueEfficiencyInintialDataBlockComponent implements OnInit {
    @Input() public block: IAsEfInitialDataBlock;
    @Input() public isOpen: boolean = false;
    @Output() private clicked: EventEmitter<void> = new EventEmitter<void>();

    public readonly unit: string = 'тонн';

    constructor() {}

    public ngOnInit(): void {}

    public onClick(): void {
        this.clicked.emit();
    }
}
