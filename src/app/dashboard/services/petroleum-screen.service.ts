import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../../services/appConfigService';
import { ITransfer } from '../models/petroleum-products-movement.model';

@Injectable({
    providedIn: 'root',
})
export class PetroleumScreenService {

    private readonly restUrl: string;

    public client: string = null;

    public transfers$: BehaviorSubject<ITransfer[]> = new BehaviorSubject<ITransfer[]>([]);

    constructor(
        public http: HttpClient,
        configService: AppConfigService
    ) {
        this.restUrl = configService.restUrl;
    }

    private localScreenState$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public screenState$: Observable<string> = this.localScreenState$
        .asObservable()
        .pipe(filter((item) => item !== null));

    public openScreen(screen: string): void {
        this.localScreenState$.next(screen);
        console.log(screen);
    }

    public async setClient(): Promise<void> {
        const clientArray: string[] = await this.getClientAsync();
        this.client = clientArray[0];

        console.log(this.client);
    }

    private async getClientAsync(): Promise<string[]> {
        return this.http
            .get<string[]>(`${this.restUrl}/api/petroleum-flow-clients/clients`)
            .toPromise();
    }

    public async getTransfers(
        startTme: Date,
        endTime: Date,
        isOpen: boolean,
        client: string
    ): Promise<ITransfer[]> {
        let requestUrl = `${this.restUrl}/api/petroleum-flow-transfers/transfer?`;
        if (startTme) { requestUrl += `startTime=${startTme}`; }
        if (endTime) { requestUrl += `startTime=${endTime}`; }
        requestUrl += `&client=${client}`;
        requestUrl += `&isOpen=${isOpen}`;
        return await this.getTransfersAsync(requestUrl);
    }

    private async getTransfersAsync(requestUrl: string): Promise<ITransfer[]> {
        console.log(requestUrl);
        return this.http.get<ITransfer[]>(requestUrl).toPromise();
    }
}
