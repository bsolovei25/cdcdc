import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { ICmidMultichartFilterModel } from '@widgets/CMID/cmid-overall-operational-indicator/models/cmid-overall-operational-indicator.model';

@Component({
    selector: 'evj-cmid-metrics-change-autocomplete',
    templateUrl: './cmid-overall-operational-indicator-autocomplete.component.html',
    styleUrls: ['./cmid-overall-operational-indicator-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmidOverallOperationalIndicatorAutocompleteComponent {
    @Input() filterItems: ICmidMultichartFilterModel[] = [];
    @Input() graphLines: string[] = [];
    @Output() filteredData: EventEmitter<ICmidMultichartFilterModel> = new EventEmitter<ICmidMultichartFilterModel>();
    @Output() clearedData: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('filterInput') filterInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    public filterControl: FormControl = new FormControl();

    onClearFilter(): void {
        this.graphLines = [];
        this.clearedData.emit();
    }

    onSelectOption(event): void {
        const optionName = event.source.value.label;
        if (this.graphLines.includes(optionName)) {
            this.filteredData.emit(optionName);
            this.graphLines = this.graphLines.filter(e => e !== optionName);
            this.filteredData.emit(event.source.value);
            return;
        }
        this.graphLines.push(optionName);
        this.filteredData.emit(event.source.value);
    }
}
