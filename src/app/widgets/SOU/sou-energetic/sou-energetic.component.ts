import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { ISouEnergetic } from '../../../dashboard/models/SOU/sou-energetic.model';
import { BehaviorSubject } from 'rxjs';
import { DATA_SOURCE } from './sou-energetic.mock';

@Component({
    selector: 'evj-sou-energetic',
    templateUrl: './sou-energetic.component.html',
    styleUrls: ['./sou-energetic.component.scss'],
})
export class SouEnergeticComponent extends WidgetPlatform implements OnInit {
    public data$: BehaviorSubject<ISouEnergetic> = new BehaviorSubject<ISouEnergetic>(null);
    private set data(value: ISouEnergetic) {
        this.data$.next(value);
    }

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        this.widgetInit();
        this.data = DATA_SOURCE;
    }

    protected dataHandler(ref: ISouEnergetic): void {}
}
