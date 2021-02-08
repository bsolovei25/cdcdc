import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'evj-popup-user-options',
    templateUrl: './popup-user-options.component.html',
    styleUrls: ['./popup-user-options.component.scss'],
})
export class PopupUserOptionsComponent implements OnInit, OnChanges {
    @Input() public data;
    @Output() public close: EventEmitter<any> = new EventEmitter<any>();

    public isOpenNecessaryParam: boolean = false;

    options: any = [];
    customOptionsActive: any = [];

    constructor(private cdRef: ChangeDetectorRef) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        //   this.cdRef.detectChanges();
        this.customOptionsActive = this.data;
    }

    closeAdditional(event) {
        const systemCustomOptionsId: number = this.data.systemOptions.find(
            (e) => e.templateSystemOption.systemOptionType === 'customOptions'
        ).id;
        const obj = {
            close: event,
            systemIdChange: systemCustomOptionsId,
        };
        this.close.emit(obj);
    }

    openOptions(event) {
        this.isOpenNecessaryParam = event;
    }

    chooseOptions(event) {
        this.isOpenNecessaryParam = event.close;
        this.options = event.array;
        this.data.customOptions = this.options;
    }
}
