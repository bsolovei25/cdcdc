import { AfterViewInit, Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../../services/new-widget.service';
import { PlatformLocation } from '@angular/common';
import { UnityLoader } from '../../dispatcher-screen/UnityLoader';

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

    constructor(public widgetService: NewWidgetService, platformLocation: PlatformLocation) {
        const location = (platformLocation as any).location;
        this.baseUrl = location.origin + location.pathname.replace('dashboard', '');
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.InitUnity();
    }

    ngOnDestroy(): void {
        console.log('destroy_unity');
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

    @HostListener('document:UnityMotionAccounting_Start', ['$event', '$event.detail.param1'])
    public async OnUnityStart(event, param1): Promise<void> {
        this.isStart = true;
        if (!this.unityInstance) {
            return;
        }
        this.wsConnect();
    }

    private wsConnect(): void {}

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
