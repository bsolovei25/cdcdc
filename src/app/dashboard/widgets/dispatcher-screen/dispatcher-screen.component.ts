import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { UnityLoader } from './UnityLoader.js';
import { PlatformLocation } from '@angular/common';
import { WidgetService } from '../../services/widget.service';
import { WidgetSettingsService } from '../../services/widget-settings.service';
import { WidgetPlatform } from '../../models/widget-platform';

@Component({
    selector: 'evj-dispatcher-screen',
    templateUrl: './dispatcher-screen.component.html',
    styleUrls: ['./dispatcher-screen.component.scss'],
})
export class DispatcherScreenComponent extends WidgetPlatform implements OnInit, OnDestroy {
    private baseUrl: string;
    private unityInstance: any;
    isStart: boolean;

    private canvas: HTMLCanvasElement;

    public static itemCols: number = 64;
    public static itemRows: number = 30;
    public static minItemCols: number = 50;
    public static minItemRows: number = 30;

    constructor(
        public widgetService: WidgetService,
        public widgetSettingsService: WidgetSettingsService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        platformLocation: PlatformLocation
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'map';
        const location = (platformLocation as any).location;
        this.baseUrl = location.origin + location.pathname.replace('dashboard', '');
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        console.log('destroy_unity');
        if (this.unityInstance) {
            this.unityInstance.Quit(() => console.log('destroy'));
        }
    }

    protected dataConnect(): void {
        this.InitUnity();
    }

    protected dataHandler(ref: any): void { }

    @HostListener('document:resize', ['$event'])
    public OnResize(event): void {
        this.resize();
    }

    @HostListener('document:UnityDispatcherScreen_Start', ['$event', '$event.detail.param1'])
    public async OnUnityStart(event, param1): Promise<void> {
        this.isStart = true;
        if (!this.unityInstance) {
            return;
        }
        this.wsConnect();
        const params = await this.widgetSettingsService.getSettings(this.uniqId);
        this.CallUnityScript('Scripts', 'RefreshSettings', JSON.stringify(params));
    }

    @HostListener('document:UnityDispatcherScreen_SendSettings', ['$event', '$event.detail.param1'])
    public async OnUnitySendSettings(event, param1): Promise<void> {
        this.isStart = true;
        if (!this.unityInstance) {
            return;
        }
        await this.widgetSettingsService.saveSettings(this.uniqId, JSON.parse(param1));
    }

    private wsConnect(): void {
        this.widgetService
            .getWidgetLiveDataFromWS(this.id, 'dispatcher-screen')
            .subscribe((ref) => {
                this.CallUnityScript('Scripts', 'RefreshValues', JSON.stringify(ref));
            });
    }

    private async InitUnity(): Promise<void> {
        window['UnityLoader'] = UnityLoader;
        this.loadProject(`${this.baseUrl}assets/unity/dispatcher-screen/web_build.json`);
    }

    private CallUnityScript(objName, funName, ...args): void {
        if (this.isStart && this.unityInstance) {
            this.unityInstance.SendMessage(objName, funName, ...args);
        }
    }

    private loadProject(path: string): void {
        this.unityInstance = UnityLoader.instantiate(
            'unityContainer_unity-dispatcher-screen',
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
