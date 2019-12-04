import {Component, HostListener, Inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UnityLoader } from './UnityLoader.js';
import { PlatformLocation } from '@angular/common';
import {NewWidgetService} from '../../services/new-widget.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'evj-unity-template',
  templateUrl: './unity-template.component.html',
  styleUrls: ['./unity-template.component.scss']
})
export class UnityTemplateComponent implements OnInit {
  private baseUrl: string;
  private unityInstance: any;
  private isStart: boolean;

  private title: string;
  private subscriptions: Subscription[] = [];

  private idContainer: number;

  static itemCols = 15;
  static itemRows = 15;

  constructor(
    public widgetService: NewWidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    platformLocation: PlatformLocation
  ) {
    this.idContainer = this.getRandomInt(1, 20);
    const location = (platformLocation as any).location;
    this.baseUrl = location.origin + location.pathname.replace('dashboard', '');
    this.subscriptions.push(this.widgetService.getWidgetChannel(id).subscribe(data => {
      this.title = data.title;
    }));
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    console.log('destroy_unity');
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
    this.unityInstance.Quit();
  }

  ngAfterViewInit() {
    this.showMock(this.isMock);
    console.log('isMock' + this.isMock);
  }

  private showMock(show) {
    if (!show) {
      this.InitUnity();
    }
  }

  private getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  @HostListener('document:UnityTemplate_Start', ['$event', '$event.detail.param1'])
  private OnUnityStart(event, param1) {
    this.isStart = true;
    this.CallUnityScript('Scripts', 'FromAngular');
  }

  @HostListener('document:UnityTemplate_Click', ['$event'])
  private OnUnityClick(event) {
    console.log('click');
  }

  private InitUnity() {
    window['UnityLoader'] = UnityLoader;
    this.loadProject(`${this.baseUrl}assets/unity/webgl_template/webgl_template.json`);
    setInterval(() => {
      this.resize();
    }, 500);
  }

  private CallUnityScript(funName, ...args) {
    if (this.isStart && this.unityInstance) {
      this.unityInstance.SendMessage(funName, ...args);
    }
  }

  private loadProject(path) {
    console.log('element: ' + document.getElementById('unityContainer' + this.idContainer.toString()));
    this.unityInstance = UnityLoader.instantiate('unityContainer_unity-template', path);
  }

  private resize() {
    const canvas: HTMLCanvasElement = document.getElementById('#canvas') as HTMLCanvasElement;
    if (canvas) {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
  }
}
