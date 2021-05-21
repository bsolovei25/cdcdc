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
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { ISouReservoir, ISouManufacture, ISouOptions, ISouUnit } from "@dashboard/models/SOU/sou-streams.model";
import { FormControl, FormGroup } from "@angular/forms";
import { map } from "rxjs/operators";

interface ISouSelectionOptionsForm {
    manufacture: string;
    unit: string;
    reservoir: string;
}

interface ISouSelectionOptions {
    manufactures$: Observable<ISouManufacture[]>;
    units$: Observable<ISouUnit[]>;
    reservoirs$: Observable<ISouReservoir[]>;
}

@Component({
  selector: 'evj-sou-streams',
  templateUrl: './sou-streams.component.html',
  styleUrls: ['./sou-streams.component.scss']
})
export class SouStreamsComponent extends WidgetPlatform implements OnInit, AfterViewChecked  {

    optionsGroup: FormGroup = new FormGroup({
        manufacture: new FormControl(null),
        unit: new FormControl(null),
        reservoir: new FormControl(null)
    });
    options$: BehaviorSubject<ISouOptions> = new BehaviorSubject<ISouOptions>({ manufactures: [] } as ISouOptions);
    selectionOptions: ISouSelectionOptions = {
        manufactures$: this.options$.pipe(
            map((x) => {
                return x.manufactures;
            })
        ),
        units$: combineLatest([this.options$, this.optionsGroup.valueChanges]).pipe(
            map(([options, group]) =>
                options
                    ?.manufactures
                    ?.find((x) => x.name === group?.manufacture)
                    ?.units
                ?? []
            )
        ),
        reservoirs$: combineLatest([this.options$, this.optionsGroup.valueChanges]).pipe(
            map(
                ([options, group]) =>
                    options
                        ?.manufactures
                        ?.find((x) => x.name === group?.manufacture)
                        ?.units
                        ?.find((x) => x.id === group?.unit)
                        ?.reservoirs
                    ?? []
            )
        )
    };
    chosenSetting$: Observable<number>;

    public titlesOfTable: { name: string, widthOfBlock: string }[] = TITLES_OF_TABLE;
    public tableRows: {} = TABLE_CELLS;

    public heightOfTable: string = '400px';
    public heightOfViewPort: string = '335px';

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
        this.cdr.detectChanges();
    }

  protected dataHandler(ref: unknown): void {}
}
