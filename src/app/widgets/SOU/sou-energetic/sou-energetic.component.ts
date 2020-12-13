import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    ISouEnergetic,
    ISouEnergeticOptions,
} from '../../../dashboard/models/SOU/sou-energetic.model';
import { BehaviorSubject } from 'rxjs';
import { SouMvpMnemonicSchemeService } from '../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

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

    private readonly options: ISouEnergeticOptions[] = [
        {
            manufacture: 'Производство №1',
            unit: 'АВТ-10',
        },
        {
            manufacture: 'Производство №4',
            unit: 'Изомалк-2',
        },
    ];

    constructor(
        private mnemonicSchemeService: SouMvpMnemonicSchemeService,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        this.widgetInit();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.mnemonicSchemeService.selectedInstallation$.asObservable().subscribe((ref) => {
                this.setWsOptions(this.options[ref]);
            })
        );
    }

    protected dataHandler(ref: ISouEnergetic): void {
        this.data = ref;
    }

    private setWsOptions(options: ISouEnergeticOptions): void {
        this.widgetService.setChannelLiveDataFromWsOptions(this.id, options);
    }
}
