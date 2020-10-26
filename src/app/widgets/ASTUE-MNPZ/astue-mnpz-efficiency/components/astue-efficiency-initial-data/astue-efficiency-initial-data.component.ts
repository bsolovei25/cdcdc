import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IAsEfInitialDataBlock } from '../../../../../dashboard/models/ASTUE/astue-efficiency.model';
import { forkJoin, combineLatest, Subscription } from 'rxjs';
import { AstueEfficiencyService } from '../../../../../dashboard/services/widgets/ASTUE/astue-efficiency.service';

@Component({
    selector: 'evj-astue-efficiency-initial-data',
    templateUrl: './astue-efficiency-initial-data.component.html',
    styleUrls: ['./astue-efficiency-initial-data.component.scss']
})
export class AstueEfficiencyInitialDataComponent implements OnInit, OnDestroy {
    public data: IAsEfInitialDataBlock[] = [];

    public isOpen: boolean = false;

    private subscriptions: Subscription[] = [];

    public blockSelection: SelectionModel<IAsEfInitialDataBlock> = new SelectionModel<IAsEfInitialDataBlock>(true);

    constructor(private AsEfService: AstueEfficiencyService) {
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            combineLatest([this.AsEfService.selectionUnit$, this.AsEfService.selectionFlow$]).subscribe(results => {
                this.data = [];
                results?.flat()?.forEach(data => {
                    if (data) {
                        if (data?.periodCounter) {
                        data.initialData.forEach(value => {
                                if (!value.name.includes(data.name)) {
                                    value.name = `${value.name} ${data.name}`;
                                }
                            });
                        }
                        this.data = [...this.data, ...data?.initialData];
                    }
                });
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
    }
}
