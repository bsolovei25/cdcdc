import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter,
} from '@angular/core';
import { IMessage } from '@shared/models/message.model';
import {
    PopoverOverlayService,
} from '@shared/components/popover-overlay/popover-overlay.service';
import {
    FileAttachMenuComponent,
    IChatFileAttach
} from '../file-attach-menu/file-attach-menu.component';

@Component({
    selector: 'evj-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
    @Input() public messages: IMessage[] = [];
    @Input() public dataTitle: string = '';
    @Input() public placeholder: string = '';
    @Input() public displayGraphImage: boolean = false;
    @Input() public onClickItem: () => void = () => {};

    @Output() private addingMessage: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('scroll') scroll: ElementRef;
    @ViewChild('input') input: ElementRef;
    @ViewChild('graph') graph: ElementRef;

    public get headerTitle(): string { return this.dataTitle + '123'; }

    public filesToUpload: IChatFileAttach[] = [];

    public isFilePopoverOpened: boolean = false;

    constructor(
        private popoverOverlayService: PopoverOverlayService,
    ) {}

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

    public openAttachFilePopover(origin: HTMLElement): void {
        const popoverRef = this.popoverOverlayService.open({
            content: FileAttachMenuComponent,
            origin,
            data: this.filesToUpload,
        });
        this.isFilePopoverOpened = true;

        popoverRef.afterClosed$.subscribe(res => {
            this.isFilePopoverOpened = false;
            if (res && res.data) {
                this.filesToUpload = res.data as IChatFileAttach[];
            }
        });
    }
}
