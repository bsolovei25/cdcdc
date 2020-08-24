import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/events-workspace.service';

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
    public tempReason: { id: string; name: string } = { id: null, name: null };

    @Output() private closeWindow: EventEmitter<{ id: string; name: string }> = new EventEmitter<{
        id: string;
        name: string;
    }>();

    public readonly closeIconSrc: string = 'assets/icons/widgets/workspace/smotr/close-icon.svg';

    constructor(private ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {
        this.tempReason.name = this.ewService.event?.directReasons ?? null;
        this.tempReason.id =
            this.ewService.event?.deviationData?.availableReasons?.find(
                (reason) => (reason?.name ?? null) === this.tempReason.name
            )?.id ?? null;
    }

    public ngOnChanges(): void {
        this.filterList();
    }

    public onSearchValue(search: string): void {
        this.filterList(search);
    }

    public onClose(): void {
        this.closeWindow.emit(null);
    }

    public onSave(): void {
        this.closeWindow.emit(this.tempReason);
    }

    public setReason(reason: { id: string; name: string }): void {
        this.tempReason = { ...reason };
    }

    private filterList(search: string = this.searchText): void {
        if (!search || search === '') {
            this.reasonsList?.forEach((reason) => (reason.isActive = true));
            return;
        }
        this.reasonsList?.forEach(
            (reason) => (reason.isActive = reason.name.toLowerCase().includes(search.toLowerCase()))
        );
    }

    public isActiveCompare(reason: { id: string; name: string }): boolean {
        return (this.tempReason?.id ?? null) === reason.id;
    }
}
