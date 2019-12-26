import { Component, HostListener, Inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UnityLoader } from './UnityLoader.js';
import { PlatformLocation } from '@angular/common';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'evj-dispatcher-screen',
  templateUrl: './dispatcher-screen.component.html',
  styleUrls: ['./dispatcher-screen.component.scss']
})
export class DispatcherScreenComponent implements OnInit, AfterViewInit, OnDestroy {

  private baseUrl: string;
  private unityInstance: any;
  isStart: boolean;

  title: string;
  private subscriptions: Subscription[] = [];

  private canvas: HTMLCanvasElement;

  static itemCols = 15;
  static itemRows = 15;

  constructor(
    public widgetService: NewWidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string,
    platformLocation: PlatformLocation
  ) {
    const location = (platformLocation as any).location;
    this.baseUrl = location.origin + location.pathname.replace('dashboard', '');
    this.subscriptions.push(this.widgetService.getWidgetChannel(id).subscribe(data => {
      this.title = data.title;
    }));
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.showMock(this.isMock);
    console.log('isMock' + this.isMock);
  }

  ngOnDestroy() {
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

  private showMock(show) {
    if (!show) {
      this.InitUnity();
      console.log('init_u');
    }
  }

  @HostListener('document:resize', ['$event'])
  OnResize(event) {
    this.resize();
  }

  @HostListener('document:UnityDispatcherScreen_Start', ['$event', '$event.detail.param1'])
  OnUnityStart(event, param1) {
    this.isStart = true;
    if (!this.unityInstance) {
      return;
    }
    this.wsConnect();
  }

  @HostListener('document:UnityTemplate_Click', ['$event'])
  OnUnityClick(event) {
    if (!this.unityInstance) {
      return;
    }
    console.log('click');
  }

  private wsConnect() {
    this.widgetService.getWidgetLiveDataFromWS(this.id, 'dispatcher-screen')
      .subscribe((ref) => {
        this.CallUnityScript('Scripts', 'RefreshValues', JSON.stringify(ref));
      }
      );
  }

  private InitUnity() {
    window['UnityLoader'] = UnityLoader;
    this.loadProject(`${this.baseUrl}assets/unity/dispatcher-screen/web_build.json`);
  }

  private CallUnityScript(objName, funName, ...args) {
    if (this.isStart && this.unityInstance) {
      this.unityInstance.SendMessage(objName, funName, ...args);
    }
  }

  private loadProject(path) {
    this.unityInstance = UnityLoader.instantiate('unityContainer_unity-dispatcher-screen', path);
  }

  private resize() {
    this.canvas = document.getElementById('#canvas') as HTMLCanvasElement;
    if (this.canvas) {
      this.canvas.width = this.canvas.parentElement.offsetWidth;
      this.canvas.height = this.canvas.parentElement.offsetHeight;
    }
  }
}
