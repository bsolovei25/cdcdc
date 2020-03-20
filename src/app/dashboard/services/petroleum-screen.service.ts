import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../../services/appConfigService";

@Injectable({
    providedIn: 'root',
})
export class PetroleumScreenService {

    private readonly restUrl: string;

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

    public async getClient(): Promise<string> {
        const clientArray: string[] = await this.getClientAsync();
        return clientArray[0];
    }

    public async getClientAsync(): Promise<string[]> {
        return this.http.get<string[]>(`${this.restUrl}/api/petrolium-flow-clients/clients`).toPromise();
    }

    public async getTransfers(startTme: Date, endTime: Date, isOpen: boolean): Promise<void> {

    }

    private async getTransfersAsync(startTme: Date, endTime: Date, isOpen: boolean): Promise<void> {

    }
}
