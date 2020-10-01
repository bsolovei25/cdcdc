import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import {
    IPetroleumObject, ITankAttribute, ITankInfo, ITankParam,
    ITransfer, ITransferFilter,
    ObjectDirection, ObjectType, TransfersFilter
} from '../../models/petroleum-products-movement.model';
import { SnackBarService } from '../snack-bar.service';
import { IDatesInterval, WidgetService } from '../widget.service';
import { IAlertWindowModel } from '@shared/models/alert-window.model';

@Injectable({
    providedIn: 'root',
})
export class PetroleumScreenService {
    private readonly restUrl: string;

    public client: string = null;

    public isLoad$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public transfers$: BehaviorSubject<ITransfer[]> = new BehaviorSubject<ITransfer[]>([]);

    public objectsAll$: BehaviorSubject<IPetroleumObject[]> = new BehaviorSubject<
        IPetroleumObject[]
    >([]);
    public objectsSource$: BehaviorSubject<IPetroleumObject[]> = new BehaviorSubject<
        IPetroleumObject[]
    >([]);
    public objectsReceiver$: BehaviorSubject<IPetroleumObject[]> = new BehaviorSubject<
        IPetroleumObject[]
    >([]);
    private currentTankParam$: BehaviorSubject<ITankParam> = new BehaviorSubject<ITankParam>(null);
    public  currentTankParam: Observable<ITankParam> = this.currentTankParam$
        .asObservable()
        .pipe(filter((item) => item != null));

    private currentTransfer$: BehaviorSubject<ITransfer> = new BehaviorSubject<ITransfer>(null);
    public currentTransfer: Observable<ITransfer> = this.currentTransfer$
        .asObservable()
        .pipe(filter((item) => item != null));

    private localScreenState$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public screenState$: Observable<string> = this.localScreenState$
        .asObservable()
        .pipe(filter((item) => item !== null));

    public alertWindow$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<IAlertWindowModel>(null);

    public currentTransfersFilter$: BehaviorSubject<TransfersFilter> = new BehaviorSubject<TransfersFilter>('all');

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

    public currentFilter: ITransferFilter = {
        textFilter: null,
        sortFilter: null,
    };

    constructor(
        private http: HttpClient,
        private configService: AppConfigService,
        private widgetService: WidgetService,
        private materialController: SnackBarService,
    ) {
        this.restUrl = configService.restUrl;
    }

    public openScreen(screen: string): void {
        this.localScreenState$.next(screen);
        // console.log(screen);
    }

    public async chooseTransfer(uid: string, toFirst: boolean = false): Promise<void> {
        this.isLoad$.next(true);
        try {
            if (this.localScreenState$.getValue() !== 'operation') {
                this.openScreen('operation');
            }
            const tempTransfers = this.transfers$.getValue();
            const chooseTransfer = tempTransfers.find((el) => el.uid === uid);
            if (!chooseTransfer) {
                this.isLoad$.next(false);
                return;
            }
            tempTransfers.forEach((item) => (item.isActive = false));
            chooseTransfer.operationType = 'Exist';
            chooseTransfer.isActive = true;
            if (toFirst) {
                const idx = tempTransfers.findIndex(item => item === chooseTransfer);
                tempTransfers.unshift(...tempTransfers.splice(idx, 1));
            }
            this.transfers$.next(tempTransfers);
            this.currentTransfer$.next(chooseTransfer);

            const objectsReceiver = await this.getObjects(
                this.client,
                chooseTransfer.destinationName
            );
            const objectsSource = await this.getObjects(
                this.client,
                chooseTransfer.sourceName
            );
            objectsSource.forEach((item) => (item.isActive = true));
            objectsReceiver.forEach((item) => (item.isActive = true));
            this.objectsReceiver$.next(objectsReceiver);
            this.objectsSource$.next(objectsSource);
        } catch (e) {
            console.error(e);
        }
        this.isLoad$.next(false);
    }

    public async createTransfer(): Promise<void> {
        const transfers = this.transfers$.getValue();
        transfers.forEach((item) => (item.isActive = false));
        this.transfers$.next(transfers);
        const objects = this.objectsAll$.getValue();
        objects.forEach((item) => (item.isActive = false));
        this.objectsSource$.next(objects);
        this.objectsReceiver$.next(objects);
        const emptyTransfer: ITransfer = { ...this.emptyTransferGlobal };
        emptyTransfer.startTime = new Date();
        this.currentTransfer$.next(emptyTransfer);
    }

    public async chooseObject(objectName: string, isSource: boolean): Promise<void> {
        const currentTransfer = this.currentTransfer$.getValue();
        if (currentTransfer.operationType === 'Exist') {
            this.materialController.openSnackBar(
                'Для изменения объектов операции, создайте новую операцию!',
                'snackbar-red'
            );
            return;
        }
        if ((currentTransfer.destinationName &&
            currentTransfer.destinationName !== '') &&
            (currentTransfer.sourceName &&
            currentTransfer.sourceName !== '')
        ) {
            this.materialController.openSnackBar(
                'Для изменения объектов операции, сбросьте текущую операцию!',
                'snackbar-red'
            );
            return;
        }
        this.isLoad$.next(true);
        if (isSource) {
            if (!currentTransfer.destinationName || currentTransfer.destinationName === '') {
                const objectsDestination = await this.getObjects(this.client, objectName, 'exit');
                this.objectsReceiver$.next(objectsDestination);
            }
            const objectsSource = this.objectsSource$.getValue();
            objectsSource.forEach((item) => (item.isActive = false));
            objectsSource.find((item) => item.objectName === objectName).isActive = true;
            this.objectsSource$.next(objectsSource);
            currentTransfer.sourceName = objectName;
            currentTransfer.sourceProduct = (await this.getAvailableProducts(objectName))[0];
            currentTransfer.sourceClient = this.client;
        } else {
            if (!currentTransfer.sourceName || currentTransfer.sourceName === '') {
                const objectsSource = await this.getObjects(this.client, objectName, 'exit');
                this.objectsSource$.next(objectsSource);
            }
            const objectsDestination = this.objectsReceiver$.getValue();
            objectsDestination.forEach((item) => (item.isActive = false));
            objectsDestination.find((item) => item.objectName === objectName).isActive = true;
            this.objectsReceiver$.next(objectsDestination);
            currentTransfer.destinationName = objectName;
            currentTransfer.destinationProduct = (await this.getAvailableProducts(objectName))[0];
            currentTransfer.destinationClient = this.client;
        }
        this.isLoad$.next(false);
        currentTransfer.isActive = true;
        this.currentTransfer$.next(currentTransfer);
        // console.log(currentTransfer);
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

    public async setClient(widgetId: string): Promise<void> {
        this.client = (await this.getClientAsync(widgetId))?.data ?? null;
        // console.log(this.client);
    }

    private async getClientAsync(widgetId: string): Promise<{ data: string }> {
        return this.http
            .get<{ data: string }>(`${this.restUrl}/api/petroleum-flow-clients?guid=${widgetId}`)
            .toPromise();
    }

    public async reGetTransfers(dates: IDatesInterval): Promise<void> {
        let isOpen: boolean;
        switch (this.currentTransfersFilter$.getValue()) {
            case 'all':
                isOpen = false;
                break;
            case 'open':
                isOpen = true;
                break;
        }
        await this.getTransfers(dates?.fromDateTime ?? this.getTodaysPeriod().fromDatetime, dates?.toDateTime ?? this.getTodaysPeriod().toDatetime, isOpen, this.client);
        const currentTransfer = this.currentTransfer$.getValue();
        const transfers = this.transfers$.getValue();
        this.transfers$.next(transfers);
        if (currentTransfer?.uid) {
            const currentTransferTemp = transfers.find((item) => item?.uid === currentTransfer?.uid);
            if (currentTransferTemp) {
                currentTransferTemp.isActive = true;
                this.currentTransfer$.next(currentTransferTemp);
            }
        }
        this.filterTransfersByColumn(
            this.currentFilter?.textFilter?.key,
            this.currentFilter?.textFilter?.value);
        this.sortTransfersByColumn(
            this.currentFilter?.sortFilter?.key,
            this.currentFilter?.sortFilter?.type,
            this.currentFilter?.sortFilter?.isUp);
    }

    public async getTransfers(
        startTime: Date,
        endTime: Date,
        isOpen: boolean,
        client: string
    ): Promise<void> {
        let requestUrl = `${this.restUrl}/api/petroleum-flow-transfers/transfer?`;
        if (startTime) {
            requestUrl += `startTime=${startTime.toISOString()}`;
        }
        if (endTime) {
            requestUrl += `&endTime=${endTime.toISOString()}`;
        }
        requestUrl += `&client=${client}`;
        requestUrl += `&isOpen=${isOpen}`;
        const transfers = await this.getTransfersAsync(requestUrl);
        transfers.map((item) => {
            if (item.startTime) {
                item.startTime = new Date(item.startTime);
            }
            if (item.endTime) {
                item.endTime = new Date(item.endTime);
            }
        });
        this.transfers$.next(transfers);
    }

    public async saveTransfer(): Promise<void> {
        const currentTransfer = this.currentTransfer$.getValue();
        // console.log(currentTransfer);
        let uid: string;
        try {
            if (currentTransfer.operationType === 'Exist') {
                const ans = await this.saveTransferAsync(currentTransfer);
                uid = currentTransfer.uid;
            } else {
                uid = await this.createTransferAsync(currentTransfer);
            }
            await this.reGetTransfers(this.widgetService.currentDates$.getValue());
            await this.chooseTransfer(uid);
            this.materialController.openSnackBar('Сохранено');
        } catch (err) {
            if (err.status !== 477 && err.status !== 403) {
                this.materialController.openSnackBar('Ошибка валидации!', 'snackbar-red');
            }
        }
    }

    public async getObjects(
        client: string,
        object: string = null,
        direction: ObjectDirection = null
    ): Promise<IPetroleumObject[]> {
        try {
            object = object?.replace(/\//g, '@') ?? null;
            if (!object && !direction) {
                return await this.getObjectsAsync(client);
            } else if (!direction) {
                // console.log('getObject');
                return [await this.getObjectAsync(client, object)];
            }
            const allObjects = [
                ...this.objectsAll$.getValue(),
                ...this.objectsReceiver$.getValue(),
                ...this.objectsSource$.getValue()
            ];
            const objectType = allObjects.find(el => el.objectName === object)?.objectType ?? null;
            return await this.getReferencesAsync(client, object, objectType, direction);
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async getTankAttributes(objectName: string): Promise<ITankAttribute[]> {
        objectName = objectName?.replace(/\//g, '@') ?? null;
        if (!objectName || objectName === '') {
            return [];
        }
        try {
            const attributes: ITankAttribute[] = await this.http.get<ITankAttribute[]>(
                `${this.restUrl}/api/petroleum-flow-clients/objects/${objectName}/attr`
            ).toPromise();
            attributes.forEach((item) => item.paramSaveDateTime = new Date(item.paramDateTime));
            return attributes;
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async setTankAttributes(objectAttribute: ITankAttribute): Promise<void> {
        this.isLoad$.next(true);
        try {
            const objectName = this.currentTankParam$.getValue().objectName;
            await this.http.post(`${this.restUrl}/api/petroleum-flow-values/${objectName}`, objectAttribute).toPromise();
            const attributes: ITankAttribute[] = await this.getTankAttributes(objectName);
            const currentTankParam = this.currentTankParam$.getValue();
            currentTankParam.objectAttributes = attributes;
            this.currentTankParam$.next(currentTankParam);
            const objects = await this.getObjects(this.client);
            this.objectsAll$.next(objects);
        } catch {
            this.materialController.openSnackBar('Ошибка сохранения параметра!', 'snackbar-red');
        }
        this.isLoad$.next(false);
    }

    public async setTankParam(objectName: string): Promise<void> {
        this.isLoad$.next(true);
        const objectInfo = await this.getTankInfoAsync(objectName);
        const objectAttributes = await this.getTankAttributes(objectName);
        const currentTankParam: ITankParam = {
            objectName,
            objectInfo,
            objectAttributes,
        };
        this.currentTankParam$.next(currentTankParam);
        this.isLoad$.next(false);
    }

    private async getTankInfoAsync(objectName: string): Promise<ITankInfo> {
        try {
            return await this.http.get<ITankInfo>(
                `${this.restUrl}/api/petroleum-flow-clients/objects/${objectName}/tankInfo`
            ).toPromise();
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async getAvailableProducts(objectName: string): Promise<string[]> {
        const ans = await this.http
            .get<string[]>(
                `${this.restUrl}/api/petroleum-flow-clients/objects/${objectName}/products`
            )
            .toPromise();
        // console.log(objectName);
        // console.log(ans);
        return ans;
    }

    public async deleteTransfer(uid: string): Promise<void> {
        await this.deleteTransferAsync(uid);
        const transfers: ITransfer[] = this.transfers$.getValue();
        const idx: number = transfers.findIndex((item) => item.uid === uid);
        transfers.splice(idx, 1);
        transfers.forEach((item) => (item.isActive = false));
        transfers[0].isActive = true;
        this.transfers$.next(transfers);
        this.currentTransfer$.next(transfers[0]);
    }

    private async saveTransferAsync(transfer: ITransfer): Promise<any> {
        return this.http
            .put(`${this.restUrl}/api/petroleum-flow-transfers/transfer/`, transfer)
            .toPromise();
    }

    private async createTransferAsync(transfer: ITransfer): Promise<string> {
        return this.http
            .post<string>(`${this.restUrl}/api/petroleum-flow-transfers/transfer/`, transfer)
            .toPromise();
    }

    private async deleteTransferAsync(uid: string): Promise<void> {
        this.http
            .delete(`${this.restUrl}/api/petroleum-flow-transfers/transfer/${uid}`)
            .toPromise();
    }

    private async getTransfersAsync(requestUrl: string): Promise<ITransfer[]> {
        this.isLoad$.next(true);
        let ans: ITransfer[] = [];
        try {
            ans = await this.http.get<ITransfer[]>(requestUrl).toPromise();
        } catch (e) {
            console.error(e);
        }
        this.isLoad$.next(false);
        return ans;
    }

    private async getObjectsAsync(client: string): Promise<IPetroleumObject[]> {
        return this.http
            .get<IPetroleumObject[]>(
                `${this.restUrl}/api/petroleum-flow-clients/clients/${client}/objects/`
            )
            .toPromise();
    }

    private async getObjectAsync(client: string, objectName: string): Promise<IPetroleumObject> {
        return this.http
            .get<IPetroleumObject>(
                `${this.restUrl}/api/petroleum-flow-clients/objects/${objectName}`
            )
            .toPromise();
    }

    private async getReferencesAsync(
        client: string,
        object: string,
        type: ObjectType,
        direction: ObjectDirection
    ): Promise<IPetroleumObject[]> {
        return this.http
            .get<IPetroleumObject[]>(
                `${this.restUrl}/api/petroleum-flow-clients/clients/${client}/objects/${type}/${object}/relations/${direction}`
            )
            .toPromise();
    }

    public closeAlert(): void {
        this.alertWindow$.next(null);
    }

    private getTodaysPeriod(): { fromDatetime: Date, toDatetime: Date } {
        const currentDatetime: Date = new Date(Date.now());
        const fromDatetime = new Date(
            currentDatetime.getFullYear(),
            currentDatetime.getMonth(),
            currentDatetime.getDate(),
            0,
            0,
            0
        );
        const toDatetime = new Date(
            currentDatetime.getFullYear(),
            currentDatetime.getMonth(),
            currentDatetime.getDate(),
            23,
            59,
            59
        );
        return {
            fromDatetime,
            toDatetime,
        };
    }

    public filterTransfersByColumn(key: string, search: string): void {
        const transfers = this.transfers$.getValue();
        if (!key || key === '') {
            transfers?.forEach((el) => el.isSearchFilter = true);
            return;
        }
        transfers?.forEach(
            (el) => el.isSearchFilter = el[key].toLowerCase().includes(search.toLowerCase()));
        this.currentFilter.textFilter = {
            key,
            value: search,
        };
    }

    // isUp - по возрастанию
    public sortTransfersByColumn(key: string, type: string, isUp: boolean): void {
        if (!key || !type || key === '' || type === '') {
            return;
        }
        const sortOrder: number = isUp ? 1 : -1;
        const transfers = this.transfers$.getValue();
        switch (type) {
            case 'number':
                this.sortTransferNumber(key, sortOrder, transfers);
                break;
            case 'string':
                this.sortTransferString(key, sortOrder, transfers);
                break;
            case 'date':
                this.sortTransferDate(key, sortOrder, transfers);
                break;
            default:
                return;
        }
        this.currentFilter.sortFilter = {
            key, type, isUp
        };
    }

    private sortTransferNumber(key: string, sortOrder: number, transfers: ITransfer[]): void {
        transfers.sort((a, b) => {
            if (a[key] > b[key]) {
                return sortOrder;
            } else if (a[key] < b[key]) {
                return -sortOrder;
            }
            return 0;
        });
    }

    private sortTransferString(key: string, sortOrder: number, transfers: ITransfer[]): void {
        transfers.sort((a, b) => a[key].localeCompare(b[key]) * sortOrder);
    }

    private sortTransferDate(key: string, sortOrder: number, transfers: ITransfer[]): void {
        transfers.sort((a, b) => {
            if (a[key]?.getTime() > b[key]?.getTime() || !a[key]) {
                return sortOrder;
            } else if (a[key]?.getTime() < b[key]?.getTime() || !b[key]) {
                return -sortOrder;
            }
            return 0;
        });
    }
}

// public async chooseObject(objectName: string, isSource: boolean): Promise<void> {
//     let currentTransfer = this.currentTransfer$.getValue();
// if (currentTransfer.operationType === 'Exist') {
//     this.materialController.openSnackBar(
//         'Для изменения объектов операции, создайте новую операцию!',
//         'snackbar-red'
//     );
//     return;
// }
// this.isLoad$.next(true);
// if (isSource) {
//     const objectsDestination = await this.getObjects(this.client, objectName, 'exit');
//     const objectDestination = objectsDestination?.find(
//         (item) => item.objectName === currentTransfer.destinationName
//     );
//     let objectsSource = this.objectsSource$.getValue();
//     let isComparable: boolean = false;
//     if (objectDestination) {
//         const objectsSourceTemp = await this.getObjects(
//             this.client,
//             objectDestination.objectName,
//             'enter'
//         );
//         if (objectsSourceTemp.find((item) => item.objectName === objectName)) {
//             isComparable = true;
//             objectsSource = objectsSourceTemp;
//         }
//     }
//     objectsSource.forEach((item) => (item.isActive = false));
//     objectsSource.find((item) => item.objectName === objectName).isActive = true;
//     objectsDestination.forEach((item) => (item.isActive = false));
//     if (objectDestination) {
//         objectDestination.isActive = true;
//     }
//     console.log(objectsSource);
//     console.log(objectsDestination);
//     this.objectsSource$.next(objectsSource);
//     this.objectsReceiver$.next(objectsDestination);
//     if (!isComparable) {
//         if (currentTransfer.destinationName) {
//             this.materialController.openSnackBar(
//                 'Источник и приемник не совместимы!',
//                 'snackbar-red'
//             );
//         }
//     }
//     if (isComparable) {
//     } else {
//         const tempTransfer = { ...this.emptyTransferGlobal };
//         tempTransfer.uid = currentTransfer.uid;
//         tempTransfer.startTime = currentTransfer.startTime;
//         tempTransfer.endTime = currentTransfer.endTime;
//         tempTransfer.operationType = currentTransfer.operationType;
//         currentTransfer = { ...tempTransfer };
//     }
//     currentTransfer.sourceName = objectName;
//     currentTransfer.sourceProduct = (await this.getAvailableProducts(objectName))[0];
//     currentTransfer.sourceClient = this.client;
// } else {
//     const objectsSource = await this.getObjects(this.client, objectName, 'enter');
//     const objectSource = objectsSource?.find(
//         (item) => item.objectName === currentTransfer.sourceName
//     );
//     let objectsDestination = this.objectsReceiver$.getValue();
//     let isComparable: boolean = false;
//     if (objectSource) {
//         const objectsDestinationTemp = await this.getObjects(
//             this.client,
//             objectSource.objectName,
//             'exit'
//         );
//         if (objectsDestinationTemp.find((item) => item.objectName === objectName)) {
//             isComparable = true;
//             objectsDestination = objectsDestinationTemp;
//         }
//     }
//     objectsDestination.forEach((item) => (item.isActive = false));
//     objectsDestination.find((item) => item.objectName === objectName).isActive = true;
//     objectsSource.forEach((item) => (item.isActive = false));
//     if (objectSource) {
//         objectSource.isActive = true;
//     }
//     console.log(objectsSource);
//     console.log(objectsDestination);
//     this.objectsSource$.next(objectsSource);
//     this.objectsReceiver$.next(objectsDestination);
//     if (!isComparable) {
//         if (currentTransfer.sourceName) {
//             this.materialController.openSnackBar(
//                 'Источник и приемник не совместимы!',
//                 'snackbar-red'
//             );
//         }
//     }
//     if (isComparable) {
//     } else {
//         const tempTransfer = { ...this.emptyTransferGlobal };
//         tempTransfer.uid = currentTransfer.uid;
//         tempTransfer.startTime = currentTransfer.startTime;
//         tempTransfer.endTime = currentTransfer.endTime;
//         tempTransfer.operationType = currentTransfer.operationType;
//         currentTransfer = { ...tempTransfer };
//     }
//     currentTransfer.destinationName = objectName;
//     currentTransfer.destinationProduct = (await this.getAvailableProducts(objectName))[0];
//     currentTransfer.destinationClient = this.client;
// }
// this.isLoad$.next(false);
// currentTransfer.isActive = true;
// this.currentTransfer$.next(currentTransfer);
// console.log(currentTransfer);
// }
