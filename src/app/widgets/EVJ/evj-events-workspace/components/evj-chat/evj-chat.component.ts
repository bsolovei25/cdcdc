import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { IMessage } from '@shared/models/message.model';
import { PopoverOverlayService } from '@shared/components/popover-overlay/popover-overlay.service';
import { EvjFileAttachMenuComponent } from '../evj-file-attach-menu/evj-file-attach-menu.component';
import { IMessageFileAttachment } from '@shared/models/message.model';
import { AppConfigService } from '@core/service/app-config.service';
import { EventsWorkspaceService } from "../../../../../dashboard/services/widgets/EVJ/events-workspace.service";

export interface IChatMessageWithAttachments {
    msg: string;
    attachments?: IMessageFileAttachment[];
}

@Component({
    selector: 'evj-chat',
    templateUrl: './evj-chat.component.html',
    styleUrls: ['./evj-chat.component.scss'],
})
export class EvjChatComponent implements OnInit {
    @Input() public messages: IMessage[] = [];
    @Input() public dataTitle: string = '';
    @Input() public placeholder: string = '';
    @Input() public displayGraphImage: boolean = false;
    @Input() public displayMnemoImage: boolean = false;
    @Input() public onClickItem: () => void = () => {};

    @Output()
    private addingMessage: EventEmitter<IChatMessageWithAttachments> = new EventEmitter<IChatMessageWithAttachments>();

    @ViewChild('scroll') scroll: ElementRef;
    @ViewChild('input') input: ElementRef;
    @ViewChild('graph') graph: ElementRef;

    public get headerTitle(): string {
        return this.dataTitle + '123';
    }

    public filesToUpload: IMessageFileAttachment[] = [];

    public isFilePopoverOpened: boolean = false;

    constructor(
        private popoverOverlayService: PopoverOverlayService,
        private appConfigService: AppConfigService,
        public ewService: EventsWorkspaceService
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
            const msg = {
                msg: this.input.nativeElement.value,
                attachments: this.filesToUpload,
            } as IChatMessageWithAttachments;
            this.input.nativeElement.value = '';
            this.addingMessage.emit(msg);
            this.filesToUpload = [];
            setTimeout(() => {
                this.scrollToBottom();
            }, 50);
        }
    }

    public openAttachFilePopover(origin: HTMLElement): void {
        const popoverRef = this.popoverOverlayService.open({
            content: EvjFileAttachMenuComponent,
            origin,
            data: this.filesToUpload,
        });
        this.isFilePopoverOpened = true;

        popoverRef.afterClosed$.subscribe((res) => {
            this.isFilePopoverOpened = false;
            if (res && res.data) {
                this.filesToUpload = res.data as IMessageFileAttachment[];
            }
        });
    }

    public openAttachmentBlank(fileId: string): void {
        if (!fileId) {
            return;
        }
        window.open(`${this.appConfigService.restUrl}/api/file-storage/${fileId}`, '_blank');
    }
}
