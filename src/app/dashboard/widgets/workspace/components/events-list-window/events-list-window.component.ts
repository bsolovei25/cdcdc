import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { EventsWorkspaceService } from '../../../../services/widgets/events-workspace.service';

@Component({
    selector: 'evj-events-list-window',
    templateUrl: './events-list-window.component.html',
    styleUrls: ['./events-list-window.component.scss'],
})
export class EventsListWindowComponent implements OnInit, OnChanges {
    @Input() public title: string = '';
    @Input() public placeholder: string = 'Введите свой комментарий...';
    @Input() public buttonText: string = 'Сохранить';
    @Input() public reasonsList: { id: string; name: string; isActive?: boolean }[] = [];

    public searchText: string = '';
    public tempReason: string;

    @Output() private closeWindow: EventEmitter<string> = new EventEmitter<string>();

    public readonly closeIconSrc: string = 'assets/icons/widgets/workspace/smotr/close-icon.svg';

    constructor(
        private ewService: EventsWorkspaceService,
    ) {}

    public ngOnInit(): void {
        this.tempReason = this.ewService.event?.directReasons ?? '';
    }

    public ngOnChanges(): void {
        this.filterList();
    }

    public onSearchValue(search: string): void {
        this.filterList(search);
    }

    public onClose(): void {
        this.closeWindow.emit();
    }

    public onSave(): void {
        this.closeWindow.emit(this.tempReason);
    }

    public setReason(reason: { id: string; name: string }): void {
        this.tempReason = reason.name;
    }

    private filterList(search: string = this.searchText): void {
        if (!search || search === '') {
            this.reasonsList?.forEach((reason) => reason.isActive = true);
            return;
        }
        this.reasonsList?.forEach((reason) => reason.isActive = reason.name.toLowerCase().includes(search.toLowerCase()));
    }

    public isActiveCompare(reason: {id: string; name: string}): boolean {
        return this.tempReason.trim().toLowerCase()
            === reason.name.trim().toLowerCase();
    }
}
