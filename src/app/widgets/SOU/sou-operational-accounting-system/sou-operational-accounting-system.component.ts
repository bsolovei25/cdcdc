import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    ISOUOperationalAccountingSystem,
    ISOUSection,
} from '../../../dashboard/models/SOU/sou-operational-accounting-system.model';

@Component({
    selector: 'evj-sou-operational-accounting-system',
    templateUrl: './sou-operational-accounting-system.component.html',
    styleUrls: ['./sou-operational-accounting-system.component.scss'],
})
export class SouOperationalAccountingSystemComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    popupElementsStates: Map<string, boolean> = new Map<string, boolean>();

    isSection: ISOUSection;
    data: ISOUOperationalAccountingSystem;

    constructor(
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public togglePopupElement(key: string, value: boolean): void {
        this.popupElementsStates.set(key, value);
    }

    protected dataHandler(ref: ISOUOperationalAccountingSystem): void {
        if (ref) {
            this.data = ref;
            this.data?.flowIn?.sort((a, b) => a?.order - b?.order);
            this.data?.section?.forEach((value) => {
                value?.flowOut?.sort((a, b) => a?.order - b?.order);
            });
            this.data?.lightProducts?.sort((a, b) => a?.order - b?.order);
            this.data?.section?.sort((a, b) => a?.order - b?.order);

            if (!this.isSection) {
                this.isSection = this.data?.section[0];
                this.data.section[0].isEnable = true;
            } else {
                this.data?.section.forEach((value) => {
                    if (value.name === this.isSection.name) {
                        this.isSection = value;
                        value.isEnable = true;
                    }
                });
            }
        }
    }

    changeSection(section: ISOUSection): void {
        this.isSection = section;
        this.data.section.map((value) => {
            value.isEnable = value.name === section.name;
        });
    }
}
