import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'evj-events-comment-window',
    templateUrl: './evj-events-comment-window.component.html',
    styleUrls: ['./evj-events-comment-window.component.scss'],
})
export class EvjEventsCommentWindowComponent implements OnInit {
    @Input() public title: string = '';
    @Input() public placeholder: string = 'Введите свой комментарий...';
    @Input() public buttonText: string = 'Сохранить';

    @Output() private closeWindow: EventEmitter<string> = new EventEmitter<string>();

    public message: string = '';

    public readonly closeIconSrc: string = 'assets/icons/widgets/workspace/smotr/close-icon.svg';

    constructor() {}

    public ngOnInit(): void {}

    public onClose(): void {
        this.closeWindow.emit(null);
    }

    public onSave(): void {
        console.log(this.message);
        console.log('this.message');
        this.closeWindow.emit(this.message);
    }
}
