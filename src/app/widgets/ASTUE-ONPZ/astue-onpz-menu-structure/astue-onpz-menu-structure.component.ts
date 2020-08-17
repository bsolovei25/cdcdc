import {
    Component,
    OnInit,
    Inject,
    OnDestroy,
    HostListener,
    ElementRef,
    ViewChild, AfterViewInit
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

interface IAstueOnpzMenuStructure {
    production: {name: string; id: number}[];
    facility: {name: string; id: number}[];
}

@Component({
    selector: 'evj-astue-onpz-menu-structure',
    templateUrl: './astue-onpz-menu-structure.component.html',
    styleUrls: ['./astue-onpz-menu-structure.component.scss']
})
export class AstueOnpzMenuStructureComponent extends WidgetPlatform implements OnInit, OnDestroy, AfterViewInit {

    public data: any;

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {
        this.data = ref.items;
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
