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

    public isLoad$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

    private emptyTransferGlobal: ITransfer = {
        uid: null,
        sourceName: null,
        destinationName: null,
        sourceProduct: null,
        destinationProduct: null,
        startTime: null,
        endTime: null,
        sourceMass: null,
        destinationMass: null,
        sourceClient: null,
        destinationClient: null,
        deltaMass: null,
        isActive: true,
        operationType: 'New',
    };

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
        this.isLoad$.next(true);
        if (this.localScreenState$.getValue() !== 'operation') {
            this.openScreen('operation');
        }
        const chooseTransfer = this.transfers$.getValue().find(el => el.uid === uid);
        chooseTransfer.operationType = 'Exist';
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
        this.currentTransfer$.next(chooseTransfer);
        this.isLoad$.next(false);
    }

    public async createTransfer(): Promise<void> {
        const transfers = this.transfers$.getValue();
        transfers.forEach(item => item.isActive = false);
        this.transfers$.next(transfers);
        const objects = this.objectsAll$.getValue();
        objects.forEach(item => item.isActive = false);
        this.objectsSource$.next(objects);
        this.objectsReceiver$.next(objects);
        const emptyTransfer: ITransfer = {...this.emptyTransferGlobal};
        this.currentTransfer$.next(emptyTransfer);
    }

    public async chooseObject(objectName: string, isSource: boolean): Promise<void> {
        let currentTransfer = this.currentTransfer$.getValue();
        if (currentTransfer.operationType === 'Exist') {
            this.materialController.openSnackBar('Для изменения объектов операции, создайте новую операцию!', 'snackbar-red');
            return;
        }
        this.isLoad$.next(true);
        if (isSource) {
            const objectsDestination = await this.getObjects(this.client, objectName, 'exit');
            const objectDestination = objectsDestination?.find(item => item.objectName === currentTransfer.destinationName);
            let objectsSource = this.objectsSource$.getValue();
            let isComparable: boolean = false;
            if (objectDestination) {
                const objectsSourceTemp = await this.getObjects(this.client, objectDestination.objectName, 'enter');
                if (objectsSourceTemp.find(item => item.objectName === objectName)) {
                    isComparable = true;
                    objectsSource = objectsSourceTemp;
                }
            }
            objectsSource.forEach(item => item.isActive = false);
            objectsSource.find(item => item.objectName === objectName).isActive = true;
            objectsDestination.forEach(item => item.isActive = false);
            if (objectDestination) {
                objectDestination.isActive = true;
            }
            console.log(objectsSource);
            console.log(objectsDestination);
            this.objectsSource$.next(objectsSource);
            this.objectsReceiver$.next(objectsDestination);
            if (!isComparable) {
                if (currentTransfer.destinationName) {
                    this.materialController.openSnackBar('Источник и приемник не совместимы!', 'snackbar-red');
                }
            }
            if (isComparable) {
            } else {
                const tempTransfer = {...this.emptyTransferGlobal};
                tempTransfer.uid = currentTransfer.uid;
                tempTransfer.startTime = currentTransfer.startTime;
                tempTransfer.endTime = currentTransfer.endTime;
                tempTransfer.operationType = currentTransfer.operationType;
                currentTransfer = {...tempTransfer};
            }
            currentTransfer.sourceName = objectName;
            currentTransfer.sourceProduct = (await this.getAvailableProducts(objectName))[0];
            currentTransfer.sourceClient = this.client;
        } else {
            const objectsSource = await this.getObjects(this.client, objectName, 'enter');
            const objectSource = objectsSource?.find(item => item.objectName === currentTransfer.destinationName);
            let objectsDestination = this.objectsReceiver$.getValue();
            let isComparable: boolean = false;
            if (objectSource) {
                const objectsDestinationTemp = await this.getObjects(this.client, objectSource.objectName, 'exit');
                if (objectsDestinationTemp.find(item => item.objectName === objectName)) {
                    isComparable = true;
                    objectsDestination = objectsDestinationTemp;
                }
            }
            objectsDestination.forEach(item => item.isActive = false);
            objectsDestination.find(item => item.objectName === objectName).isActive = true;
            objectsSource.forEach(item => item.isActive = false);
            if (objectSource) {
                objectSource.isActive = true;
            }
            console.log(objectsSource);
            console.log(objectsDestination);
            this.objectsSource$.next(objectsSource);
            this.objectsReceiver$.next(objectsDestination);
            if (!isComparable) {
                if (currentTransfer.sourceName) {
                    this.materialController.openSnackBar('Источник и приемник не совместимы!', 'snackbar-red');
                }
            }
            if (isComparable) {
            } else {
                const tempTransfer = {...this.emptyTransferGlobal};
                tempTransfer.uid = currentTransfer.uid;
                tempTransfer.startTime = currentTransfer.startTime;
                tempTransfer.endTime = currentTransfer.endTime;
                tempTransfer.operationType = currentTransfer.operationType;
                currentTransfer = {...tempTransfer};
            }
            currentTransfer.destinationName = objectName;
            currentTransfer.destinationProduct = (await this.getAvailableProducts(objectName))[0];
            currentTransfer.destinationClient = this.client;
        }
        this.isLoad$.next(false);
        currentTransfer.isActive = true;
        this.currentTransfer$.next(currentTransfer);
        console.log(currentTransfer);
    }

    public setTime(isSource: boolean, dateTime: Date): void {
        const currentTransfer = this.currentTransfer$.getValue();
        if (isSource) {
            currentTransfer.startTime = dateTime;
        } else {
            currentTransfer.endTime = dateTime;
        }
        this.currentTransfer$.next(currentTransfer);
    }

    public setProduct(isSource: boolean, productName: string): void {
        const currentTransfer = this.currentTransfer$.getValue();
        if (isSource) {
            currentTransfer.sourceProduct = productName;
        } else {
            currentTransfer.destinationProduct = productName;
        }
        this.currentTransfer$.next(currentTransfer);
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
    ): Promise<void> {
        let requestUrl = `${this.restUrl}/api/petroleum-flow-transfers/transfer?`;
        if (startTme) { requestUrl += `startTime=${startTme}`; }
        if (endTime) { requestUrl += `startTime=${endTime}`; }
        requestUrl += `&client=${client}`;
        requestUrl += `&isOpen=${isOpen}`;
        const transfers = await this.getTransfersAsync(requestUrl);
        transfers.map(item => {
            item.startTime = new Date(item.startTime);
            item.endTime = new Date(item.endTime);
        });
        this.transfers$.next(transfers);
    }

    public async saveTransfer(): Promise<void> {
        const currentTransfer = this.currentTransfer$.getValue();
        console.log(currentTransfer);
        if (currentTransfer.operationType === 'Exist') {
            await this.saveTransferAsync(currentTransfer);
        } else {
            await this.createTransferAsync(currentTransfer);
        }
        await this.getTransfers(null, null, true, this.client);
    }

    public async getObjects(client: string, object: string = null, direction: ObjectDirection = null): Promise<IPetroleumObject[]> {
        if (!object || !direction) {
            return await this.getObjectsAsync(client);
        }
        return await this.getReferencesAsync(client, object, direction);
    }

    public async getAvailableProducts(objectName: string): Promise<string[]> {
        const ans = await this.http.get<string[]>(`${this.restUrl}/api/petroleum-flow-clients/objects/${objectName}/products`).toPromise();
        console.log(objectName);
        console.log(ans);
        return ans;
    }

    public async deleteTransfer(uid: string): Promise<void> {
        await this.deleteTransferAsync(uid);
        const transfers: ITransfer[] = this.transfers$.getValue();
        const idx: number = transfers.findIndex(item => item.uid === uid);
        transfers.splice(idx, 1);
        transfers.forEach(item => item.isActive = false);
        transfers[0].isActive = true;
        this.transfers$.next(transfers);
        this.currentTransfer$.next(transfers[0]);
    }

    private async saveTransferAsync(transfer: ITransfer): Promise<void> {
        this.http.put(`${this.restUrl}/api/petroleum-flow-transfers/transfer/`, transfer).toPromise();
    }

    private async createTransferAsync(transfer: ITransfer): Promise<void> {
        this.http.post(`${this.restUrl}/api/petroleum-flow-transfers/transfer/`, transfer).toPromise();
    }

    private async deleteTransferAsync(uid: string): Promise<void> {
        this.http.delete(`${this.restUrl}/api/petroleum-flow-transfers/transfer/${uid}`).toPromise();
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
