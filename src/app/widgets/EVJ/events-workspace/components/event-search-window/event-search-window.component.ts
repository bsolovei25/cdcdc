import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    OnChanges,
    ChangeDetectorRef,
} from '@angular/core';
import {
    ISearchRetrievalWindow,
    IEventsWidgetNotification,
    IRetrievalEventDto,
    IEventsWidgetOptions,
    EventsWidgetNotificationPreview,
} from 'src/app/dashboard/models/events-widget';
import { EventService } from 'src/app/dashboard/services/widgets/event.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/events-workspace.service';

@Component({
    selector: 'evj-event-search-window',
    templateUrl: './event-search-window.component.html',
    styleUrls: ['./event-search-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSearchWindowComponent implements OnInit, OnChanges {
    @Input() public info: ISearchRetrievalWindow;

    public readonly icon: string = 'assets/icons/widgets/events/letter.svg';

    public data: IEventsWidgetNotification;

    public selectId: number = null;

    constructor(
        private cdRef: ChangeDetectorRef,
        public eventService: EventService,
        public ewService: EventsWorkspaceService
    ) {}

    public results: IRetrievalEventDto[] = [];
    public searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public searchTerm: Observable<string> = this.searchTerm$.pipe(
        debounceTime(450),
        distinctUntilChanged()
    );

    ngOnInit(): void {
        this.searchTerm.subscribe((search) => {
            this.search(search);
        });
    }

    ngOnChanges(): void {
        this.data = null;
        if (this.info?.idEvent) {
            this.results = [];
            this.searchTerm$.next('');
            this.cdRef.detectChanges();
        }
    }

    public accept(): void {
        if (this.selectId) {
            this.ewService.createRetrievalLink(this.selectId);
        }
        try {
            this.info.acceptFunction();
        } catch (err) {
            console.error(err);
        } finally {
            this.info.closeFunction();
        }
    }

    public cancel(): void {
        try {
            this.info.closeFunction();
        } catch (err) {
            console.error(err);
        }
    }

    public selectCard(retrieval: IRetrievalEventDto): void {
        retrieval.innerNotificationId === this.selectId
            ? (this.selectId = null)
            : (this.selectId = retrieval.innerNotificationId);
    }

    private getAvailableRetrievalCategories(): number[] {
        return this.ewService.category
            .filter((cat) => {
                if (cat.name !== 'asus' && cat.name !== 'smotr') {
                    return cat;
                }
            })
            .map<number>((cat) => {
                return cat.id;
            });
    }

    private async search(searchString: string): Promise<void> {
        searchString = searchString.trim();
        if (searchString?.length < 3) {
            this.results = [];
            return;
        }
        const options: IEventsWidgetOptions = {
            description: searchString,
            categories: this.getAvailableRetrievalCategories(),
        };
        const tempEvents = await this.eventService.getBatchData(0, options);
        if (tempEvents?.length < 1) {
            this.results = [];
            return;
        }
        this.results = tempEvents.map<IRetrievalEventDto>((eventPreview) => {
            return {
                innerNotificationId: eventPreview.id,
                description: eventPreview.description,
                isAcknowledged: false,
                status: eventPreview.status,
                deadline: eventPreview.eventDateTime,
                fixedByName: eventPreview.responsibleOperator?.displayName ?? 'Нет информации',
                timerPercentage: null,
            };
        });
        console.log(tempEvents);
        this.cdRef.detectChanges();
    }
}
