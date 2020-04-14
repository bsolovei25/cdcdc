import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'evj-events-list-window',
    templateUrl: './events-list-window.component.html',
    styleUrls: ['./events-list-window.component.scss'],
})
export class EventsListWindowComponent implements OnInit {
    @Input() public title: string = '';
    @Input() public placeholder: string = 'Введите свой комментарий...';
    @Input() public buttonText: string = 'Сохранить';

    @Output() private closeWindow: EventEmitter<void> = new EventEmitter<void>();

    public readonly closeIconSrc: string = 'assets/icons/widgets/workspace/smotr/close-icon.svg';

    constructor() {}

    public ngOnInit(): void {}

    public onSearchValue(event: string): void {}

    public onClose(): void {
        this.closeWindow.emit();
    }

    public onSave(): void {
        this.closeWindow.emit();
    }
}
