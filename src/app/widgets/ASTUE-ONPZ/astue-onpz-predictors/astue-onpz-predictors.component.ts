import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { SelectionModel } from '@angular/cdk/collections';
import {
    AstueOnpzService,
    IAstueOnpzPredictorsOptions
} from '../astue-onpz-shared/astue-onpz.service';

interface IPredictors {
    id: string;
    name: string;
    label: string;
    colorIndex: number;
    isActive?: boolean;
}

@Component({
    selector: 'evj-astue-onpz-predictors',
    templateUrl: './astue-onpz-predictors.component.html',
    styleUrls: ['./astue-onpz-predictors.component.scss']
})
export class AstueOnpzPredictorsComponent extends WidgetPlatform implements OnInit, OnDestroy {

    selectPredictors: SelectionModel<string> = new SelectionModel<string>(true);
    data: IPredictors[] = [];

    constructor(
        protected widgetService: WidgetService,
        private astueOnpzService: AstueOnpzService,
        private cdRef: ChangeDetectorRef,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: { predictors: IPredictors[] }): void {
        console.log(this.selectPredictors.selected);
        // if (this.data.length > 0) {
        //     ref.predictors.forEach(refs => {
        //         this.data.map(value => {
        //             if (refs.id === value.id) {
        //                 value.id = refs.id;
        //                 value.name = refs.name;
        //                 value.label = refs.label;
        //                 this.selectPredictors.selected.forEach((select) => {
        //                     if (value.id === select) {
        //                         value.isActive = true;
        //                     } else {
        //                         value.isActive = false;
        //                     }
        //                 });
        //             }
        //         });
        //     });
        // } else {
        if (this.data.length === 0) {
            this.data = ref.predictors;
        }
        // }
    }

    changeToggle(item: IPredictors): void {
        setTimeout(() => {
            if (this.selectPredictors.selected.length < 3) {
                this.selectPredictors.toggle(item.id);
            } else {
                item.isActive = !item.isActive;
                this.cdRef.detectChanges();
            }
        }, 1000);
        const arr: IAstueOnpzPredictorsOptions[] = [];
        this.selectPredictors.selected.forEach(id => {
            const el = this.data.find(value => value.id === id);
            arr.push({ name: el?.name, id: el?.id, colorIndex: el?.colorIndex });
        });
        this.astueOnpzService.setPredictors(arr);
        this.cdRef.detectChanges();
    }

}
