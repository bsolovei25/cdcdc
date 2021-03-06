import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { ISouEnergetic, ISouEnergeticOptions } from '../../../dashboard/models/SOU/sou-energetic.model';
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

    constructor(
        private mnemonicSchemeService: SouMvpMnemonicSchemeService,
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        this.widgetInit();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.mnemonicSchemeService.selectedOptions$.asObservable().subscribe((ref) => {
                this.data = null;
                if (!ref) {
                    return;
                }
                this.setWsOptions(ref);
            })
        );
    }

    protected dataHandler(ref: ISouEnergetic): void {
        this.data = ref;
    }
}
