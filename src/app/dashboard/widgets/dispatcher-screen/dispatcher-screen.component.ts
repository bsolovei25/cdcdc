import { Component, HostListener, Inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UnityLoader } from './UnityLoader.js';
import { PlatformLocation } from '@angular/common';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';
import {WidgetSettingsService} from "../../services/widget-settings.service";

@Component({
    selector: 'evj-dispatcher-screen',
    templateUrl: './dispatcher-screen.component.html',
    styleUrls: ['./dispatcher-screen.component.scss'],
})
export class DispatcherScreenComponent implements OnInit, AfterViewInit, OnDestroy {
    private baseUrl: string;
    private unityInstance: any;
    isStart: boolean;

    title: string;
    private subscriptions: Subscription[] = [];

    private canvas: HTMLCanvasElement;

    static itemCols: number = 15;
    static itemRows: number = 15;

    public previewTitle: string;

    constructor(
        public widgetService: NewWidgetService,
        public widgetSettingsService: WidgetSettingsService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        platformLocation: PlatformLocation
    ) {
        const location = (platformLocation as any).location;
        this.baseUrl = location.origin + location.pathname.replace('dashboard', '');
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(id).subscribe((data) => {
                this.title = data.title;
                this.previewTitle = data.widgetType.toString();
                console.log(data.widgetType);
            })
        );
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.showMock(this.isMock);
    }

    ngOnDestroy(): void {
        console.log('destroy_unity');
        if (this.subscriptions) {
            for (const i in this.subscriptions) {
                this.subscriptions[i].unsubscribe();
            }
        }
        if (this.unityInstance) {
            this.unityInstance.Quit(() => console.log('destroy'));
        }
    }

    private showMock(show: boolean): void {
        if (!show) {
            this.InitUnity();
            console.log('init_u');
        }
    }

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
