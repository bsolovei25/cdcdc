import { AfterViewInit, Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { UnityLoader } from '@shared/functions/UnityLoader.js';
import { PlatformLocation } from '@angular/common';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetSettingsService } from 'src/app/dashboard/services/widget-settings.service';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { AsyncRender } from '@shared/functions/async-render.function';

@Component({
    selector: 'evj-dispatcher-screen',
    templateUrl: './dispatcher-screen.component.html',
    styleUrls: ['./dispatcher-screen.component.scss']
})
export class DispatcherScreenComponent extends WidgetPlatform<unknown> implements AfterViewInit, OnDestroy {
    private readonly baseUrl: string;
    private unityInstance: any;
    isStart: boolean;

    private canvas: HTMLCanvasElement;

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

    ngAfterViewInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this.unityInstance) {
            this.unityInstance.Quit(() => console.log('destroy'));
        }
    }

    protected dataConnect(): void {
        setTimeout(() => this.InitUnity(), 100);
    }

    protected dataHandler(ref: any): void {
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.resize();
    }

    @HostListener('document:UnityDispatcherScreen_Start', ['$event', '$event.detail.param1'])
    public async OnUnityStart(event: any, param1: string): Promise<void> {
        this.isStart = true;
        if (!this.unityInstance) {
            return;
        }
        this.wsConnect();
        try {
            const params = await this.widgetSettingsService.getSettings(this.uniqId);
            this.CallUnityScript('Scripts', 'RefreshSettings', JSON.stringify(params));
        } catch (e) {
            console.error(e);
        }
    }

    @HostListener('document:UnityDispatcherScreen_SendSettings', ['$event', '$event.detail.param1'])
    public async OnUnitySendSettings(event: any, param1: string): Promise<void> {
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

    private CallUnityScript(objName: string, funName: string, ...args): void {
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

    @AsyncRender
    private resize(): void {
        this.canvas = document.getElementById('#canvas') as HTMLCanvasElement;
        if (this.canvas) {
            this.canvas.width = this.canvas.parentElement.offsetWidth;
            this.canvas.height = this.canvas.parentElement.offsetHeight;
        }
    }
}
