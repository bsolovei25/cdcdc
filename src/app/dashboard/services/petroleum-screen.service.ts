import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../services/appConfigService';
import {
    IPetroleumObject, ITankAttribute, ITankInfo, ITankParam,
    ITransfer,
    ObjectDirection, TransfersFilter
} from '../models/petroleum-products-movement.model';
import { SnackBarService } from './snack-bar.service';

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

    constructor(
        private http: HttpClient,
        private configService: AppConfigService,
        private materialController: SnackBarService
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
        const chooseTransfer = this.transfers$.getValue().find((el) => el.uid === uid);
        if (!chooseTransfer) {
            this.isLoad$.next(false);
            return;
        }
        console.log(uid);
        console.log(chooseTransfer);
        chooseTransfer.operationType = 'Exist';
        const tempTransfers = this.transfers$.getValue();
        tempTransfers.forEach((item) => (item.isActive = false));
        tempTransfers.find((item) => item.uid === uid).isActive = true;
        this.transfers$.next(tempTransfers);
        const objectsReceiver = await this.getObjects(
            this.client,
            chooseTransfer.sourceName,
            'enter'
        );
        const objectsSource = await this.getObjects(
            this.client,
            chooseTransfer.destinationName,
            'exit'
        );
        objectsSource.forEach((item) => (item.isActive = false));
        objectsReceiver.forEach((item) => (item.isActive = false));
        if (
            objectsSource.find((item) => item.objectName === chooseTransfer.sourceName) &&
            objectsReceiver.find((item) => item.objectName === chooseTransfer.destinationName)
        ) {
            objectsSource.find(
                (item) => item.objectName === chooseTransfer.sourceName
            ).isActive = true;
            objectsReceiver.find(
                (item) => item.objectName === chooseTransfer.destinationName
            ).isActive = true;
        } else {
            this.materialController.openSnackBar(
                'Источник и приемник не совместимы!',
                'snackbar-red'
            );
        }
        this.objectsReceiver$.next(objectsReceiver);
        this.objectsSource$.next(objectsSource);
        this.currentTransfer$.next(chooseTransfer);
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
            (currentTransfer.destinationName &&
            currentTransfer.destinationName !== '')
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

    public async reGetTransfers(): Promise<void> {
        let isOpen: boolean;
        switch (this.currentTransfersFilter$.getValue()) {
            case 'all':
                isOpen = false;
                break;
            case 'open':
                isOpen = true;
                break;
        }
        await this.getTransfers(null, null, isOpen, this.client);
        const currentTransfer = this.currentTransfer$.getValue();
        if (!currentTransfer?.uid) {
            return;
        }
        const transfers = this.transfers$.getValue();
        const currentTransferTemp = transfers.find((item) => item?.uid === currentTransfer?.uid);
        if (currentTransferTemp) {
            currentTransferTemp.isActive = true;
            this.currentTransfer$.next(currentTransferTemp);
        }
        this.transfers$.next(transfers);
    }

    public async getTransfers(
        startTme: Date,
        endTime: Date,
        isOpen: boolean,
        client: string
    ): Promise<void> {
        let requestUrl = `${this.restUrl}/api/petroleum-flow-transfers/transfer?`;
        if (startTme) {
            requestUrl += `startTime=${startTme}`;
        }
        if (endTime) {
            requestUrl += `startTime=${endTime}`;
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
        console.log(currentTransfer);
        let uid: string;
        try {
            if (currentTransfer.operationType === 'Exist') {
                const ans = await this.saveTransferAsync(currentTransfer);
                uid = currentTransfer.uid;
            } else {
                uid = await this.createTransferAsync(currentTransfer);
            }
            await this.reGetTransfers();
            await this.chooseTransfer(uid);
            this.materialController.openSnackBar('Сохранено');
        } catch {
            this.materialController.openSnackBar('Ошибка валидации!', 'snackbar-red');
        }
    }

    public async getObjects(
        client: string,
        object: string = null,
        direction: ObjectDirection = null
    ): Promise<IPetroleumObject[]> {
        if (!object || !direction) {
            return await this.getObjectsAsync(client);
        }
        return await this.getReferencesAsync(client, object, direction);
    }

    public async getTankAttributes(objectName: string): Promise<ITankAttribute[]> {
        try {
            let attributes: ITankAttribute[] = await this.http.get<ITankAttribute[]>(
                `${this.restUrl}/api/petroleum-flow-clients/objects/${objectName}/attr`
            ).toPromise();
            const regexp = /[A-Z]/;
            attributes = attributes
                .filter((el) =>
                    (el.paramTitle.toUpperCase().search(regexp) === -1) &&
                    (el.paramValue.toUpperCase().search(regexp) === -1)
                );
            return attributes;
        } catch {
            return [];
        }
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
        return await this.http.get<ITankInfo>(
            `${this.restUrl}/api/petroleum-flow-clients/objects/${objectName}/tankInfo`
        ).toPromise();
    }

    public async getAvailableProducts(objectName: string): Promise<string[]> {
        const ans = await this.http
            .get<string[]>(
                `${this.restUrl}/api/petroleum-flow-clients/objects/${objectName}/products`
            )
            .toPromise();
        console.log(objectName);
        console.log(ans);
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
        console.log(requestUrl);
        return this.http.get<ITransfer[]>(requestUrl).toPromise();
    }

    private async getObjectsAsync(client: string): Promise<IPetroleumObject[]> {
        return this.http
            .get<IPetroleumObject[]>(
                `${this.restUrl}/api/petroleum-flow-clients/clients/${client}/objects/`
            )
            .toPromise();
    }

    private async getReferencesAsync(
        client: string,
        object: string,
        direction: ObjectDirection
    ): Promise<IPetroleumObject[]> {
        return this.http
            .get<IPetroleumObject[]>(
                `${this.restUrl}/api/petroleum-flow-clients/clients/${client}/objects/${object}/relations/${direction}`
            )
            .toPromise();
    }
}

//
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
