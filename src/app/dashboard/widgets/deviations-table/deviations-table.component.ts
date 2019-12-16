import {
    Component,
    OnInit,
    Inject,
    OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs";
import { EventService } from '../../services/event.service';
import { NewWidgetService } from '../../services/new-widget.service';


export interface IDeviationsTable {
    equipment: string;
    energy: number;
    consumption: number;
    fuel: number;
    nonCritical: boolean;
}

@Component({
    selector: "evj-deviations-table",
    templateUrl: "./deviations-table.component.html",
    styleUrls: ["./deviations-table.component.scss"]
})
export class DeviationsTableComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    public title = '';
    private subscription: Subscription;

    data: IDeviationsTable[] = [
        {
            equipment: 'ЭЛОУ-2',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'С.100 ЭЛОУ-АВТ-6',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'Блок ВТ (АТВБ)',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'Блок ВТ (АТВБ)',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: false
        },
        {
            equipment: 'УПВ',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'АВТ-3',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: false
        },
        {
            equipment: 'ЭЛОУ-2',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'С.100 ЭЛОУ-АВТ-6',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'Блок ВТ (АТВБ)',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: false
        },
        {
            equipment: 'Блок ВТ (АТВБ)',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: false
        },
        {
            equipment: 'УПВ',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: false
        },
        {
            equipment: 'АВТ-3',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
    ]

    static itemCols = 20;
    static itemRows = 5;

    constructor(
        private eventService: EventService,
        public widgetService: NewWidgetService,
        @Inject("isMock") public isMock: boolean,
        @Inject("widgetId") public id: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe(data => {
            this.title = data.title;
        });
    }

    ngOnInit() {

        if (!this.isMock) {
            this.subscription = this.eventService.event$.subscribe((value) => {
                if (value) {

                }
            })
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}
