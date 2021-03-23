import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { OzsmService } from '../../../dashboard/services/widgets/OZSM/ozsm.service';
import { BehaviorSubject } from 'rxjs';
import { IOzsmScenario, OzsmScenarioAgreementStatus } from '../../../dashboard/models/OZSM/ozsm-scenarios.model';

@Component({
    selector: 'evj-ozsm-scenarios',
    templateUrl: './ozsm-scenarios.component.html',
    styleUrls: ['./ozsm-scenarios.component.scss'],
})
export class OzsmScenariosComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public scenarios$: BehaviorSubject<IOzsmScenario[]> = new BehaviorSubject<IOzsmScenario[]>([]);
    public currentScenario$: BehaviorSubject<IOzsmScenario> = new BehaviorSubject<IOzsmScenario>(null);

    public tempLevel: number = 3;

    constructor(
        private ozsmService: OzsmService,
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.getScenarios().then();
        this.scenarios$.subscribe((res) => {
            if (!!this.currentScenario$.getValue() && !res?.length) {
                return;
            }
            this.currentScenario$.next(res[0]);
        });
        this.currentScenario$.subscribe((res) => this.ozsmService.scenarioId$.next(res?.scenarioId));
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public scenarioChange(id: string): void {
        const scenario = this.scenarios$.value.find((x) => x.scenarioId === id);
        if (!scenario) {
            return;
        }
        this.currentScenario$.next(scenario);
    }

    private async getScenarios(): Promise<void> {
        const res = await this.ozsmService.getScenarios();
        this.scenarios$.next(
            res?.map((x) => ({
                name: x.planName,
                scenarioId: x.scenarioID,
                status: this.statusMapper(x.agreementStatus),
            }))
        );
    }

    private statusMapper(status: OzsmScenarioAgreementStatus): number {
        switch (status) {
            case 'notSubmittedForReconciliation':
                return 1;
            case 'underReconciliation':
                return 2;
            case 'underApproval':
                return 3;
            case 'published':
                return 4;
            default:
                return 1;
        }
    }

    protected dataHandler(): void {}
}
