import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { ICard } from './../../dashboard/models/NK/nk-tank-information.model';
import { WidgetService } from './../../dashboard/services/widget.service';
import { Inject, Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'evj-nk-tank-information',
    templateUrl: './nk-tank-information.component.html',
    styleUrls: ['./nk-tank-information.component.scss']
})
export class NkTankInformationComponent extends WidgetPlatform implements OnInit, OnDestroy {
    cardsData: ICard[];

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private http: HttpClient
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.http.get<ICard[]>('assets/mock/NK/cards.mock.json')
            .subscribe(data => {
                this.cardsData = [...data];
                console.log(this.cardsData);
            });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(): void {

    }
}
