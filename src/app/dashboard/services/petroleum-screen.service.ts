import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../../services/appConfigService';
import {
    IPetroleumObject,
    ITransfer,
    ObjectDirection
} from '../models/petroleum-products-movement.model';
import { MaterialControllerService } from './material-controller.service';

@Injectable({
    providedIn: 'root',
})
export class PetroleumScreenService {

    private readonly restUrl: string;

    public client: string = null;

    public transfers$: BehaviorSubject<ITransfer[]> = new BehaviorSubject<ITransfer[]>([]);

    public objectsAll$: BehaviorSubject<IPetroleumObject[]> = new BehaviorSubject<IPetroleumObject[]>([]);
    public objectsSource$: BehaviorSubject<IPetroleumObject[]> = new BehaviorSubject<IPetroleumObject[]>([]);
    public objectsReceiver$: BehaviorSubject<IPetroleumObject[]> = new BehaviorSubject<IPetroleumObject[]>([]);

    private currentTransfer$: BehaviorSubject<ITransfer> = new BehaviorSubject<ITransfer>(null);
    public currentTransfer: Observable<ITransfer> = this.currentTransfer$
        .asObservable()
        .pipe(filter(item => item != null));

    private localScreenState$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public screenState$: Observable<string> = this.localScreenState$
        .asObservable()
        .pipe(filter((item) => item !== null));

    constructor(
        private http: HttpClient,
        private configService: AppConfigService,
        private materialController: MaterialControllerService,
    ) {
        this.restUrl = configService.restUrl;
    }

    public openScreen(screen: string): void {
        this.localScreenState$.next(screen);
        console.log(screen);
    }

    public async chooseTransfer(uid: string): Promise<void> {
        if (this.localScreenState$.getValue() !== 'operation') {
            this.openScreen('operation');
        }
        const chooseTransfer = this.transfers$.getValue().find(el => el.uid === uid);
        this.currentTransfer$.next(chooseTransfer);
        const tempTransfers = this.transfers$.getValue();
        tempTransfers.forEach(item => item.isActive = false);
        tempTransfers.find(item => item.uid === uid).isActive = true;
        this.transfers$.next(tempTransfers);
        const objectsReceiver = await this.getObjects(this.client, chooseTransfer.sourceName, 'enter');
        const objectsSource = await this.getObjects(this.client, chooseTransfer.destinationName, 'exit');
        objectsSource.forEach(item => item.isActive = false);
        objectsReceiver.forEach(item => item.isActive = false);
        if (
            objectsSource.find(item => item.objectName === chooseTransfer.sourceName) &&
            objectsReceiver.find(item => item.objectName === chooseTransfer.destinationName)
        ) {
            objectsSource
                .find(item => item.objectName === chooseTransfer.sourceName)
                .isActive = true;
            objectsReceiver
                .find(item => item.objectName === chooseTransfer.destinationName)
                .isActive = true;
        } else {
            this.materialController.openSnackBar('Источник и приемник не совместимы!', 'snackbar-red');
        }
        this.objectsReceiver$.next(objectsReceiver);
        this.objectsSource$.next(objectsSource);
    }

    public async createTransfer(): Promise<void> {
        const objects = this.objectsAll$.getValue();
        this.objectsSource$.next(objects);
        this.objectsReceiver$.next(objects);
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

    public async getObjects(client: string, object: string = null, direction: ObjectDirection = null): Promise<IPetroleumObject[]> {
        if (!object || !direction) {
            return await this.getObjectsAsync(client);
        }
        return await this.getReferencesAsync(client, object, direction);
    }

    private async getTransfersAsync(requestUrl: string): Promise<ITransfer[]> {
        console.log(requestUrl);
        return this.http.get<ITransfer[]>(requestUrl).toPromise();
    }

    private async getObjectsAsync(client: string): Promise<IPetroleumObject[]> {
        return this.http
            .get<IPetroleumObject[]>(`${this.restUrl}/api/petroleum-flow-clients/clients/${client}/objects/`)
            .toPromise();
    }

    private async getReferencesAsync(client: string, object: string, direction: ObjectDirection): Promise<IPetroleumObject[]> {
        return this.http
            .get<IPetroleumObject[]>(`${this.restUrl}/api/petroleum-flow-clients/clients/${client}/objects/${object}/relations/${direction}`)
            .toPromise();
    }
}
