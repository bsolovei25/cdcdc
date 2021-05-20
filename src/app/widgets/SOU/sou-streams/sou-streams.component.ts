import {
    Component,
    OnInit,
    Inject,
    ViewChild,
    ElementRef,
    AfterViewChecked, ChangeDetectorRef
} from "@angular/core";
import { WidgetService } from "@dashboard/services/widget.service";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";

import { TITLES_OF_TABLE } from "@widgets/SOU/sou-streams/config";
import { TABLE_CELLS } from "@widgets/SOU/sou-streams/mock";


@Component({
  selector: 'evj-sou-streams',
  templateUrl: './sou-streams.component.html',
  styleUrls: ['./sou-streams.component.scss']
})
export class SouStreamsComponent extends WidgetPlatform implements OnInit, AfterViewChecked  {

    public titlesOfTable: { name: string, widthOfBlock: string }[] = TITLES_OF_TABLE;
    public tableRows: {} = TABLE_CELLS;

    public heightOfTable: string = '400px';
    public heightOfViewPort: string = '335px';
    public widthOfTable: string = '1943.2px';
    public widthOfGraphic: number = 70;

    constructor(
        private cdr: ChangeDetectorRef,
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    @ViewChild('widget') child: ElementRef;
    ngAfterViewChecked(): void {
        this.heightOfTable = this.child.nativeElement.clientHeight - 40 + 'px';
        this.heightOfViewPort = this.child.nativeElement.clientHeight - 115 + 'px';

        if (this.child.nativeElement.clientWidth >= 1943.2) {
            const graphic = this.child.nativeElement.clientWidth - 1943.2;
            this.widthOfTable = this.child.nativeElement.clientWidth + 'px';
            this.widthOfGraphic = 70 + graphic;
        } else {
            this.widthOfTable = '1943.2px';
        }
        this.cdr.detectChanges();
    }

  protected dataHandler(ref: unknown): void {}
}
