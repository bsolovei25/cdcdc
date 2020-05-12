import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { ITypeProduct } from '../../product-groups.component';
import { SpaceNumber } from '@shared/pipes/number_space.pipe';

@Component({
  selector: 'evj-product-groups-middle',
  templateUrl: './product-groups-middle.component.html',
  styleUrls: ['./product-groups-middle.component.scss']
})
export class ProductGroupsMiddleComponent implements OnInit {
  public readonly RADIUS = 29;

  @Input() public data: ITypeProduct;
  @Input() public indexBlock: number;
  @Input() public imageType: string;
  @Input() public groupName: string;
  @Input() performance: number;
  perf: number;

  @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

  constructor(
      private spacePipe: SpaceNumber,
    //   private userSettings: NewUserSettingsService,
    //   private dataService: GetDataService
  ) {}

  ngOnInit() {
      this.d3Circle(this.data, this.myCircle.nativeElement);
  }

  ngAfterViewInit() {}

  public d3Circle(data, el): void {
      let newValue: string = this.spacePipe.transform(data.productValue);
      let critical_newValue: string = this.spacePipe.transform(data.productDeviation);

      let button1 = data.deviationInventory === 1 ? true : false;
      let button2 = data.deviationQuality === 1 ? true : false;
      let button3 = data.deviationShip === 1 ? true : false;

      let imageActive =
          'assets/icons/widgets/SMP/product-group-planning/icons_circle/' + this.imageType + '_a.svg';
      let image =
          'assets/icons/widgets/SMP/product-group-planning/icons_circle/' + this.imageType + '.svg';

      //  this.perf = this.perfermanceCount(data.productValue, data.productDeviation);

      const mass = [data.performance, 100 - data.performance];
      let color: any;

      if (
          data.productValue === 0 &&
          (data.productDeviation > 0 || data.productDeviation < 0) &&
          data.performance === 0
      ) {
          color = d3.scaleOrdinal().range(['orange']);
      } else if (data.performance === 0) {
          color = d3.scaleOrdinal().range(['var(--color-text-sub-heading)']);
      } else if (data.performance === 100) {
          color = d3.scaleOrdinal().range(['var(--color-border-active)']);
      } else {
          //   color = d3.scaleOrdinal().range(['var(--color-border-active)', 'orange']);
          color = d3.scaleOrdinal().range(['var(--color-border-active)', 'orange']);
      }

      const canvas = d3
          .select(el)
          .append('svg')
          .attr('min-width', '100px')
          .attr('width', '100%')
          .attr('viewBox', '0 0 200 100');

      let background_cube = canvas
          .append('rect')
          .attr('fill', 'rgb(25,30,43')
          .attr('x', 110)
          .attr('y', 20)
          .attr('width', 100)
          .attr('height', 70)
          .attr('rx', 5);

      let background = canvas
          .append('image')
          .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/background_circle.svg')
          .attr('height', '75px')
          .attr('width', '100%')
          .attr('x', '-20')
          .attr('y', '10');

      let group = canvas.append('g').attr('transform', 'translate(31, 47)');
      // .attr("viewBox", "0 20 280 200");

      const arc = d3
          .arc()
          .innerRadius(32)
          .outerRadius(this.RADIUS);

      const pie = d3
          .pie()
          .value((d) => {
              return d;
          })
          .sort(() => null);

      const arcs = group
          .selectAll('.arc')
          .data(pie(mass))
          .enter()
          .append('g')
          .attr('class', 'arc');

      arcs.append('path')
          .attr('d', arc)
          .attr('fill', (d) => color(d.index));

      if (data.productDeviation !== 0 && data.productValue !== 0) {
          let value = canvas
              .append('text')
              .attr('fill', 'white')
              .attr('font-size', '18px')
              .attr('x', '85')
              .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
              .attr('y', '50')
              .text(newValue);

          let criticalValue = canvas
              .append('text')
              .attr('fill', 'orange')
              .attr('font-size', '18px')
              .attr('x', '85')
              .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
              .attr('y', '75')
              .text(critical_newValue);

          let icon = group
              .append('image')
              .attr('xlink:href', imageActive)
              .attr('height', '25px')
              .attr('width', '25px')
              .attr('x', '-11.5')
              .attr('y', '-12');
      } else if (data.productDeviation !== 0) {
          let value = canvas
              .append('text')
              .attr('fill', 'white')
              .attr('font-size', '18px')
              .attr('x', '85')
              .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
              .attr('y', '50')
              .text(newValue);

          let criticalValue = canvas
              .append('text')
              .attr('fill', 'orange')
              .attr('font-size', '18px')
              .attr('x', '85')
              .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
              .attr('y', '75')
              .text(critical_newValue);

          let icon = group
              .append('image')
              .attr('xlink:href', imageActive)
              .attr('height', '25px')
              .attr('width', '25px')
              .attr('x', '-11.5')
              .attr('y', '-12');
      } else if (data.productValue !== 0) {
          let icon = group
              .append('image')
              .attr('xlink:href', image)
              .attr('height', '25px')
              .attr('width', '25px')
              .attr('x', '-11.5')
              .attr('y', '-12');

          let value = canvas
              .append('text')
              .attr('fill', 'white')
              .attr('font-size', '20px')
              .attr('x', '78')
              .attr('dominant-baseline', 'middle')
              .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
              .attr('y', '56')
              .text(newValue);
      } else {
          let icon = group
              .append('image')
              .attr('xlink:href', image)
              .attr('height', '25px')
              .attr('width', '25px')
              .attr('x', '-11.5')
              .attr('y', '-12');

          let value = canvas
              .append('text')
              .attr('fill', 'var(--color-text-sub-heading)')
              .attr('font-size', '20px')
              .attr('x', '85')
              .attr('dominant-baseline', 'middle')
              .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
              .attr('y', '57')
              .text(critical_newValue);
      }

      if (button1 === true) {
          let button1 = canvas
              .append('image')
              .attr(
                  'xlink:href',
                  'assets/icons/widgets/SMP/product-group-planning/button_icon_1_a.svg'
              )
              .attr('height', '58px')
              .attr('width', '60px')
              .attr('x', '151')
              .attr('y', '27');
      } else {
          let button1 = canvas
              .append('image')
              .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/button_icon_1.svg')
              .attr('height', '58px')
              .attr('width', '60px')
              .attr('x', '151')
              .attr('y', '27');
      }

      if (data.ProductValue === 0) {
          let text = canvas
              .append('text')
              .attr('fill', 'var(--color-text-sub-heading)')
              .attr('font-size', '18px')
              .attr('x', '70')
              .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
              .attr('y', '15')
              .text(data.productName);
      } else {
          let text = canvas
              .append('text')
              .attr('fill', 'white')
              .attr('font-size', '18px')
              .attr('x', '70')
              .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
              .attr('y', '15')
              .text(data.productName);
      }

      if (button2 === true) {
          let button2 = canvas
              .append('image')
              .attr(
                  'xlink:href',
                  'assets/icons/widgets/SMP/product-group-planning/button_icon_2_a.svg'
              )
              .attr('height', '39px')
              .attr('width', '39px')
              .attr('x', '195')
              .attr('y', '22');
      } else {
          let button2 = canvas
              .append('image')
              .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/button_icon_2.svg')
              .attr('height', '39px')
              .attr('width', '39px')
              .attr('x', '195')
              .attr('y', '22');
      }

      if (button3 === true) {
          let button3 = canvas
              .append('image')
              .attr(
                  'xlink:href',
                  'assets/icons/widgets/SMP/product-group-planning/button_icon_3_a.svg'
              )
              .attr('height', '39px')
              .attr('width', '39px')
              .attr('x', '195')
              .attr('y', '52');
      } else {
          let button3 = canvas
              .append('image')
              .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/button_icon_3.svg')
              .attr('height', '39px')
              .attr('width', '39px')
              .attr('x', '195')
              .attr('y', '52');
      }
  }

  public goToGant(): void {
    //   this.userSettings.LoadScreen(1);
    //   const currentState = this.dataService.states$.getValue();
    //   currentState.chooseProduct = this.data.productName;
    //   currentState.productGroup = this.groupName.toUpperCase();
    //   this.dataService.states$.next(currentState);
  }

  perfermanceCount(value: number, performance: number) {
      const plan: number = performance > 0 ? value : value - performance;

      return plan === 0 ? 0 : (value / plan) * 100;
  }

}
