import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild,
  OnDestroy, OnChanges, Inject } from '@angular/core';

@Component({
  selector: 'evj-ozsm-resources-circle-diagram',
  templateUrl: './ozsm-resources-circle-diagram.component.html',
  styleUrls: ['./ozsm-resources-circle-diagram.component.scss']
})
export class OzsmResourcesCircleDiagramComponent extends WidgetPlatform<unknown>
  implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  listen: any;

  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  constructor(
    protected widgetService: WidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string,
    private renderer: Renderer2
  ) {
    super(widgetService, isMock, id, uniqId);
  }

  ngAfterViewInit(): void {
    this.horizontalScroll(this.scrollContainer);
  }

  horizontalScroll(scrollContainer: ElementRef): void {
    this.listen = this.renderer.listen(scrollContainer.nativeElement, 'wheel', e => {

    const delta: number = e.deltaY || e.detail || e.wheelDelta;
    scrollContainer.nativeElement.scrollLeft += delta;
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  ngOnDestroy(): void {
      super.ngOnDestroy();
      this.listen();
  }

  dataHandler(): void {}

}
