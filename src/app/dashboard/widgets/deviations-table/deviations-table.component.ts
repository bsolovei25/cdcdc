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
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
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
            equipment: 'Изомеризация',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'Л-22/4',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'Л-22-2000',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: false
        },
        {
            equipment: 'Л-22/5',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: false
        },
        {
            equipment: 'Реагентное хоз-во',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: false
        },
        {
            equipment: 'ЛЧ-35-11-300М',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'УПБ',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'С-200 КУПН СТО',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'УПС',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'С-400 КУПН ГФУ',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'КЦА',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'ЛЧ-35-11-1000',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'МТБЭ',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'С-300 КУПН',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'ГФУ-2',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'АССБ и КТ',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'Парк Б,Р и ДТ',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'ТАМЭ',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'Т-д транснефть',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'Г-43-107',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'ГОБКК',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'ЖД эстакажы',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
        {
            equipment: 'АВТО эстакажы',
            energy: 0,
            consumption: -150,
            fuel: 0,
            nonCritical: true
        },
    ]

    static itemCols = 15;
    static itemRows = 18;

    constructor(
        private eventService: EventService,
        public widgetService: NewWidgetService,
        @Inject("isMock") public isMock: boolean,
        @Inject("widgetId") public id: string,
        @Inject("uniqId") public uniqId: string
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
