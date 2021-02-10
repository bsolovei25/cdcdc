import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ISmpEventsMessageModel } from '@shared/models/smp-events-message.model';

@Component({
    selector: 'evj-events-chat',
    templateUrl: './events-chat.component.html',
    styleUrls: ['./events-chat.component.scss'],
})
export class EventsChatComponent implements OnInit {
    @Input() public messages: ISmpEventsMessageModel[] = [];
    @Input() public title: string = '';
    @Input() public placeholder: string = '';
    @Input() public displayGraphImage: boolean = false;
    @Input() public onClickItem: () => void = () => {};

    @Output() private addingMessage: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('scroll') scroll: ElementRef;
    @ViewChild('input') input: ElementRef;
    @ViewChild('graph') graph: ElementRef;

    constructor() {}

    public ngOnInit(): void {}

    public onEnterPush(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.onSendMessage();
        }
    }

    private scrollToBottom(): void {
        this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
    }

    public onSendMessage(): void {
        if (this.input.nativeElement.value) {
            const msg = this.input.nativeElement.value;
            this.input.nativeElement.value = '';
            this.addingMessage.emit(msg);
            setTimeout(() => {
                this.scrollToBottom();
            }, 50);
        }
    }
}
