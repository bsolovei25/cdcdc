import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { FormControl } from "@angular/forms";
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ICmidMultichartFilterModel } from "@widgets/CMID/cmid-overall-operational-indicator/models/cmid-overall-operational-indicator.model";

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

    onSelectOption(event: MatAutocompleteSelectedEvent): void {
        this.filterInput.nativeElement.blur();
        this.filterInput.nativeElement.value = '';
        this.filterControl.setValue(null);
        if (this.graphLines.includes(event.option.viewValue)) {
            this.filteredData.emit(event.option.value);
            this.graphLines = this.graphLines.filter(e => e !== event.option.viewValue);
            return;
        }
        this.graphLines.push(event.option.viewValue);
        this.filteredData.emit(event.option.value);
    }
}
