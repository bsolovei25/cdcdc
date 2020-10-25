import { AfterViewInit, Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { PlatformLocation } from '@angular/common';
import { UnityLoader } from '@shared/functions/UnityLoader';
import { PetroleumScreenService } from 'src/app/dashboard/services/widgets/petroleum-screen.service';
import { ITransfer, ObjectType } from 'src/app/dashboard/models/NK/petroleum-products-movement.model';

@Component({
    selector: 'evj-petroleum-unity',
    templateUrl: './petroleum-unity.component.html',
    styleUrls: ['./petroleum-unity.component.scss'],
})
export class PetroleumUnityComponent implements OnInit, AfterViewInit, OnDestroy {
    private baseUrl: string;
    private unityInstance: any;
    public isStart: boolean;

    public title: string;
    private subscriptions: Subscription[] = [];

    private canvas: HTMLCanvasElement;

    static itemCols: number = 15;
    static itemRows: number = 15;

    public previewTitle: string;

    constructor(
        private widgetService: WidgetService,
        private platformLocation: PlatformLocation,
        private petroleumService: PetroleumScreenService
    ) {
        const location = (platformLocation as any).location;
        this.baseUrl = location.origin + location.pathname.replace('dashboard', '');
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        // for animation no lags
        setTimeout(() => this.InitUnity(), 200);
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            for (const subscription of this.subscriptions) {
                subscription.unsubscribe();
            }
        }
        if (this.unityInstance) {
            this.unityInstance.Quit(() => console.log('destroy'));
        }
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(event): void {
        this.resize();
    }

    @HostListener('document:UnityMotionAccounting_DeleteTransfer', [
        '$event',
        '$event.detail.param1',
    ])
    public DeleteTransfer(event, param1): void {
        console.log('delete-transfer');
        const windowsParam = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить текущую операцию?',
            acceptText: 'Да',
            cancelText: 'Отменить',
            acceptFunction: () => this.petroleumService.deleteTransfer(param1),
            closeFunction: () => this.petroleumService.closeAlert(),
        };
        this.petroleumService.alertWindow$.next(windowsParam);
    }

    @HostListener('document:UnityMotionAccounting_SaveTransfer', ['$event', '$event.detail.param1'])
    public SaveTransfer(event, param1: string): void {
        console.log('save-transfer');
        const windowsParam = {
            isShow: true,
            questionText: 'Вы уверены, что хотите сохранить изменения в текущей операции?',
            acceptText: 'Да',
            cancelText: 'Отменить',
            acceptFunction: () => this.petroleumService.saveTransfer(),
            closeFunction: () => this.petroleumService.closeAlert(),
        };
        this.petroleumService.alertWindow$.next(windowsParam);
    }

    @HostListener('document:UnityMotionAccounting_CreateTransfer', ['$event'])
    public CreateTransfer(event): void {
        console.log('create-transfer');
        this.petroleumService.createTransfer();
    }

    @HostListener('document:UnityMotionAccounting_SetDefaultTransfer', ['$event'])
    public SetDefaultTransfer(event): void {
        console.log('set-default-transfer');
        const windowsParam = {
            isShow: true,
            questionText: 'Вы уверены, что хотите сбросить создание текущей операции?',
            acceptText: 'Да',
            cancelText: 'Отменить',
            acceptFunction: () => this.petroleumService.createTransfer(),
            closeFunction: () => this.petroleumService.closeAlert(),
        };
        this.petroleumService.alertWindow$.next(windowsParam);
    }

    @HostListener('document:UnityMotionAccounting_SetTime', [
        '$event',
        '$event.detail.param1',
        '$event.detail.param2',
    ])
    public SetTimeTransfer(event, param1: string, param2: number): void {
        const isSource = param1.toLowerCase() === 'true';
        let dateTime = null;
        if (param2) {
            dateTime = new Date(param2);
        }
        this.petroleumService.setTime(isSource, dateTime);
    }

    @HostListener('document:UnityMotionAccounting_SetProduct', [
        '$event',
        '$event.detail.param1',
        '$event.detail.param2',
    ])
    public SetProductTransfer(event, param1: string, param2: string): void {
        const isSource = param1.toLowerCase() === 'true';
        const productName = param2;
        this.petroleumService.setProduct(isSource, productName);
    }

    @HostListener('document:UnityMotionAccounting_Start', ['$event', '$event.detail.param1'])
    public async OnUnityStart(event, param1): Promise<void> {
        this.isStart = true;
        if (!this.unityInstance) {
            return;
        }
        this.petroleumService.currentTransfer.subscribe((ref) => this.NextTransferHandler(ref));
    }

    @HostListener('document:UnityMotionAccounting_ExitScreen', ['$event'])
    returnMenu(event): void {
        this.petroleumService.openScreen('info');
    }

    private async NextTransferHandler(ref: ITransfer): Promise<void> {
        const sourceType: ObjectType =
            this.petroleumService.objectsSource$.getValue()?.find((item) => item.isActive)
                ?.objectType ?? 'Tank';
        const destinationType: ObjectType =
            this.petroleumService.objectsReceiver$.getValue()?.find((item) => item.isActive)
                ?.objectType ?? 'Tank';
        const sourceUnitProducts =
            sourceType === 'Unit'
                ? await this.petroleumService.getAvailableProducts(ref.sourceName)
                : null;
        const destinationUnitProducts =
            sourceType === 'Unit'
                ? await this.petroleumService.getAvailableProducts(ref.destinationName)
                : null;
        const sourceTankParams = sourceType === 'Tank'
            ? await this.petroleumService.getTankAttributes(ref.sourceName)
            : null;
        const destinationTankParams = destinationType === 'Tank'
            ? await this.petroleumService.getTankAttributes(ref.destinationName)
            : null;
        const additional = {
            startTime: new Date(ref.startTime).getTime(),
            endTime: new Date(ref.endTime).getTime(),
            sourceType,
            destinationType,
            sourceUnitProducts,
            destinationUnitProducts,
            sourceTankParams,
            destinationTankParams,
            operationType: ref.operationType ? ref.operationType : 'Exist',
        };
        const req = { ...ref, ...additional };
        console.log(req);
        console.log(JSON.stringify(req));
        this.CallUnityScript('Scripts', 'LoadTransfer', JSON.stringify(req));
    }

    private async InitUnity(): Promise<void> {
        console.log('unity start');
        window['UnityLoader'] = UnityLoader;
        this.loadProject(`${this.baseUrl}assets/unity/motion-accounting/web_build.json`);
    }

    private CallUnityScript(objName, funName, ...args): void {
        if (this.isStart && this.unityInstance) {
            this.unityInstance.SendMessage(objName, funName, ...args);
        }
    }

    private loadProject(path: string): void {
        this.unityInstance = UnityLoader.instantiate(
            'unityContainer_unity-movement-accounting',
            path
        );
    }

    private resize(): void {
        this.canvas = document.getElementById('#canvas') as HTMLCanvasElement;
        if (this.canvas) {
            this.canvas.width = this.canvas.parentElement.offsetWidth;
            this.canvas.height = this.canvas.parentElement.offsetHeight;
        }
    }
}
