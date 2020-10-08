import { AfterViewInit, Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { PlatformLocation } from '@angular/common';
import { UnityLoader } from '@shared/functions/UnityLoader';
import { PetroleumScreenService } from 'src/app/dashboard/services/widgets/petroleum-screen.service';
import { ITankInfo } from 'src/app/dashboard/models/petroleum-products-movement.model';

@Component({
    selector: 'evj-petroleum-unity-info',
    templateUrl: './petroleum-unity-info.component.html',
    styleUrls: ['./petroleum-unity-info.component.scss'],
})
export class PetroleumUnityInfoComponent implements OnInit, AfterViewInit, OnDestroy {
    private baseUrl: string;
    private unityInstance: any;
    public isStart: boolean;

    public title: string;
    private subscriptions: Subscription[] = [];

    private canvas: HTMLCanvasElement;

    static itemCols: number = 15;
    static itemRows: number = 15;

    public previewTitle: string;

    constructor(public widgetService: WidgetService,
                private platformLocation: PlatformLocation,
                private petroleumService: PetroleumScreenService,
    ) {
        const location = (platformLocation as any).location;
        this.baseUrl = location.origin + location.pathname.replace('dashboard', '');
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.InitUnity();
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

    @HostListener('document:UnityMotionAccountingInfo_Start', ['$event', '$event.detail.param1'])
    public async OnUnityStart(event, param1): Promise<void> {
        this.isStart = true;
        if (!this.unityInstance) {
            return;
        }
        this.petroleumService.currentTankParam.subscribe((ref) => this.NextInfoHandler(ref.objectInfo));
    }

    private async NextInfoHandler(ref: ITankInfo): Promise<void> {
        if (ref.minValue === ref.maxValue) {

            return;
        }
        this.CallUnityScript('Scripts', 'LoadInfo', JSON.stringify(ref));
    }

    private async InitUnity(): Promise<void> {
        console.log('unity start');
        window['UnityLoader'] = UnityLoader;
        this.loadProject(`${this.baseUrl}assets/unity/motion-accounting-info/web_build.json`);
    }

    private CallUnityScript(objName: string, funName: string, ...args): void {
        if (this.isStart && this.unityInstance) {
            this.unityInstance.SendMessage(objName, funName, ...args);
        }
    }

    private loadProject(path: string): void {
        this.unityInstance = UnityLoader.instantiate(
            'unityContainer_unity-movement-accounting-info',
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
