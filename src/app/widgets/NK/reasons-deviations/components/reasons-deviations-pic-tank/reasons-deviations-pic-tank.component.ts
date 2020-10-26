import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IReasonsTankers } from 'src/app/dashboard/models/LCO/reasons-deviations';

declare var d3: any;

@Component({
  selector: 'evj-reasons-deviations-pic-tank',
  templateUrl: './reasons-deviations-pic-tank.component.html',
  styleUrls: ['./reasons-deviations-pic-tank.component.scss']
})
export class ReasonsDeviationsPicTankComponent implements OnInit, AfterViewInit {
  @ViewChild('reasonsPic') oilIcon: ElementRef;
  @Input() public data: IReasonsTankers;

  public tankersPicture: any; //d3

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.drawPicture(this.oilIcon?.nativeElement);
  }

  public drawPicture(el): void {
    this.tankersPicture = d3
      .select(el)
      .append('svg')
      .attr('min-width', '100px')
      .attr('height', '100%')
      .attr('width', '100%')
      .attr('class', 'textProduct')
      .attr('viewBox', '0 0 120 120');

    const x1 = -100;
    const x3 = -48;
    const y = 110;

    const tug = 'assets/pic/Icons3D/Tug.png';
    const tube = 'assets/pic/Icons3D/Tube.png';
    const cis = 'assets/pic/Icons3D/Cistern.png';
    const work = 'assets/pic/Icons3D/work.svg';

    const pictureContainer = this.tankersPicture
      .append('image')
      .attr('xlink:href', 'assets/icons/widgets/oil-control-all/reasons-deviations/background-pic.svg')
      .attr('height', '110px')
      .attr('width', '95px')
      .attr('class', 'textProduct')
      .attr('x', x1 + y)
      .attr('y', '15');

    if (this.data.type === 'Work') {
      const pictureWork = this.tankersPicture
        .append('image')
        .attr(
          'xlink:href',
          work
        )
        .attr('height', '25px')
        .attr('width', '60px')
        .attr('class', 'textProduct')
        .attr('x', '27')
        .attr('y', '57');
    } else {
      const pictureIcon = this.tankersPicture
        .append('image')
        .attr(
          'xlink:href',
          this.data.type === 'Tug' ? tug : this.data.type === 'Tube' ? tube : cis
        )
        .attr('height', '50px')
        .attr('width', '50px')
        .attr('class', 'textProduct')
        .attr('x', '33')
        .attr('y', '42');
    }


    const planText1 = this.tankersPicture
      .append('text')
      .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .attr('x', x3 + y)
      .attr('class', 'textProduct')
      .attr('y', '30')
      .attr('text-anchor', 'middle')
      .attr('fill', 'var(--color-border-active)')
      .text(this.data.value);
  }

}
