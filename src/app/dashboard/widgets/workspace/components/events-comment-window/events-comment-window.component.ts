import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'evj-events-comment-window',
    templateUrl: './events-comment-window.component.html',
    styleUrls: ['./events-comment-window.component.scss'],
})
export class EventsCommentWindowComponent implements OnInit {
    @Input() public title: string = '';
    @Input() public placeholder: string = 'Введите свой комментарий...';
    @Input() public buttonText: string = 'Сохранить';

    @Output() private closeWindow: EventEmitter<void> = new EventEmitter<void>();

    public readonly closeIconSrc: string = 'assets/icons/widgets/workspace/smotr/close-icon.svg';

    constructor() {}

    public ngOnInit(): void {}

    public onClose(): void {
        this.closeWindow.emit();
    }

    public onSave(): void {
        this.closeWindow.emit();
    }
}
