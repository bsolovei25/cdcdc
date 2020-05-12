import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'evj-product-groups-right',
  templateUrl: './product-groups-right.component.html',
  styleUrls: ['./product-groups-right.component.scss']
})
export class ProductGroupsRightComponent implements OnInit {

  public readonly RADIUS = 28;

  public pie = 60;

  gaugemap: any = {};

  @Input() public data: IProducts;

  @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

  constructor(private spacePipe: SpaceNumber) {}

  ngOnInit() {
      this.d3Block(this.data, this.myCircle.nativeElement);
  }

  public d3Block(data, el): void {
      let color: any;

      if (data.groupDeviationShipPerformance === 0) {
          color = d3.scaleOrdinal().range(['var(--color-text-sub-heading)']);
      } else if (data.groupDeviationShipPerformance === 100) {
          color = d3.scaleOrdinal().range(['white']);
      } else {
          color = d3.scaleOrdinal().range(['orange', '#1b1e27']);
      }

      const canvas = d3
          .select(el)
          .append('svg')
          .attr('min-width', '100px')
          .attr('width', '100%')
          .attr('viewBox', '0 -24 150 115');

      this.d3Circle(data, canvas);
  }

  d3Circle(data, el) {
      let newValue: string = this.spacePipe.transform(data.groupDeviationShip);

      const x = 70;
      const y = 30;

      const indicatorRightPie = this.indicatorGauge(data.groupDeviationShipPerformance);

      this.d3Grauge(data, el, this.gaugemap, indicatorRightPie, x, y);

      let background = el
          .append('image')
          .attr(
              'xlink:href',
              'assets/icons/widgets/product-group-planning/background_right_circle.svg'
          )
          .attr('height', '110px')
          .attr('width', '110px')
          .attr('x', '17')
          .attr('y', '-25');

      let arrow = el
          .append('image')
          .attr('xlink:href', 'assets/icons/widgets/product-group-planning/arrow_critical.svg')
          .attr('height', '35px')
          .attr('width', '35px')
          .attr('x', '140')
          .attr('y', '20');

      let value = el
          .append('text')
          .attr('fill', 'white')
          .attr('font-size', '15px')
          .attr('x', '68')
          .attr('y', '35')
          .attr('text-anchor', 'middle')
          .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
          .text(newValue);

      let valueName = el
          .append('text')
          .attr('fill', 'var(--color-text-sub-heading)')
          .attr('font-size', '18px')
          .attr('x', '70')
          .attr('text-anchor', 'middle')
          .attr('y', '55')
          .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
          .text('тн');
  }

  isInteger(num) {
      return (num ^ 0) === num;
  }

  indicatorGauge(data) {
      let percent = data > 100 ? 100 : data < 0 ? 0 : data;
      return (this.pie * percent) / 100;
  }

  d3Grauge(data, el, gaugemap, indicator, x, y) {
      let svgAll = el;
      var gauge = function(container, configuration) {
          var config = {
              size: 210,
              clipWidth: 200,
              clipHeight: 110,
              ringInset: 20,
              ringWidth: 10,

              pointerWidth: 10,
              pointerTailLength: 5,
              pointerHeadLengthPercent: 0.9,

              minValue: 0,
              maxValue: 60,

              minAngle: 0,
              maxAngle: 360,

              transitionMs: 750,

              majorTicks: 60,
              labelFormat: d3.format('d'),
              labelInset: 10,

              arcColorFn: d3.interpolateHslLong(d3.rgb('red'), d3.rgb('blue')),
          };
          var range = undefined;
          var r = undefined;
          var pointerHeadLength = undefined;
          var value = 0;

          var svg = svgAll;
          var arc = undefined;
          var scale = undefined;
          var ticks = undefined;
          var tickData = undefined;
          var pointer = undefined;

          var donut = d3.pie();

          function deg2rad(deg) {
              return (deg * Math.PI) / 180;
          }

          function newAngle(d) {
              var ratio = scale(d);
              var newAngle = config.minAngle + ratio * range;
              return newAngle;
          }

          function configure(configuration) {
              var prop = undefined;
              for (prop in configuration) {
                  config[prop] = configuration[prop];
              }

              range = config.maxAngle - config.minAngle;
              r = config.size / 1.5;
              pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

              scale = d3
                  .scaleLinear()
                  .range([0, 1])
                  .domain([config.minValue, config.maxValue]);

              ticks = scale.ticks(config.majorTicks);
              tickData = d3.range(config.majorTicks).map(function() {
                  return 1 / config.majorTicks;
              });

              arc = d3
                  .arc()
                  .innerRadius(r + 50 - config.ringWidth - config.ringInset)
                  .outerRadius(r - config.ringInset)
                  .startAngle(function(d, i) {
                      var ratio = d * i;
                      return deg2rad(config.minAngle + ratio * range);
                  })
                  .endAngle(function(d, i) {
                      var ratio = d * (i + 1);
                      return deg2rad(config.minAngle + ratio * range);
                  });
          }
          gaugemap.configure = configure;

          function centerTranslation() {
              return 'translate(' + x + ',' + y + ')';
          }

          function isRendered() {
              return svg !== undefined;
          }
          gaugemap.isRendered = isRendered;

          function render(indicator, pie) {
              var centerTx = centerTranslation();

              var arcs = svg
                  .append('g')
                  .attr('class', 'arc')
                  .attr('transform', centerTx);

              arcs.selectAll('path')
                  .data(tickData)
                  .enter()
                  .append('path')
                  .attr('stroke', 'black')
                  .attr('fill', function(d, i) {
                      if (indicator === pie) {
                          return 'white';
                      } else if (i + 1 <= indicator) {
                          return 'orange';
                      } else if (i + 1 > indicator && i + 1 <= pie) {
                          return '#272a38';
                      }
                  })
                  .attr('d', arc);

              update(indicator === undefined ? 0 : indicator);

              let valueGauge = svg
                  .append('text')
                  .attr('fill', 'white')
                  .attr('font-size', '23px')
                  .attr('x', '148')
                  .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                  .attr('y', '160')
                  .attr('text-anchor', 'middle')
                  .text(data.fact < 0 ? 0 : data.fact);
          }
          gaugemap.render = render;
          function update(newValue, newConfiguration?) {
              if (newConfiguration !== undefined) {
                  configure(newConfiguration);
              }
              var ratio = scale(newValue);
              var newAngle = config.minAngle + ratio * range;
          }
          gaugemap.update = update;

          configure(configuration);
          return gaugemap;
      };

      var powerGauge = gauge(el, {
          size: 100,
          clipWidth: 300,
          clipHeight: 300,
          ringWidth: 58,
          maxValue: 80,
          transitionMs: 4000,
      });
      powerGauge.render(indicator, this.pie);
  }

}
