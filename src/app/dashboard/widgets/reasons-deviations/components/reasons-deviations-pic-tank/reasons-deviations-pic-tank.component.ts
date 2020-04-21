import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var d3: any;

@Component({
  selector: 'evj-reasons-deviations-pic-tank',
  templateUrl: './reasons-deviations-pic-tank.component.html',
  styleUrls: ['./reasons-deviations-pic-tank.component.scss']
})
export class ReasonsDeviationsPicTankComponent implements OnInit, AfterViewInit {
  @ViewChild('reasonsPic') oilIcon: ElementRef;
  @Input() public data: any;

  public tankersPicture: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.drawPicture(this.oilIcon.nativeElement);
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

    const tug = './assets/pic/Icons3D/Tug.png';
    const tube = './assets/pic/Icons3D/Tube.png';
    const cis = './assets/pic/Icons3D/Cistern.png';

    const pictureContainer = this.tankersPicture
      .append('image')
      .attr('xlink:href', './assets/icons/widgets/oil-control-all/reasons-deviations/background-pic.svg')
      .attr('height', '130px')
      .attr('width', '105px')
      .attr('class', 'textProduct')
      .attr('x', x1 + y)
      .attr('y', '20');

    const pictureIcon = this.tankersPicture
      .append('image')
      .attr(
        'xlink:href',
        this.data.type === 'Tug' ? tug : this.data.type === 'Tube' ? tube : cis
      )
      .attr('height', '70px')
      .attr('width', '70px')
      .attr('class', 'textProduct')
      .attr('x', '25')
      .attr('y', '50');

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
