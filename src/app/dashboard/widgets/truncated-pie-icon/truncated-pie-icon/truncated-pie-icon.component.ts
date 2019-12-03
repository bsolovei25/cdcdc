import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { TruncPieWidget } from 'src/app/dashboard/models/widget.model';
import { VirtualTimeScheduler } from 'rxjs';


declare var d3: any;

@Component({
  selector: 'evj-truncated-pie-icon',
  templateUrl: './truncated-pie-icon.component.html',
  styleUrls: ['./truncated-pie-icon.component.scss']
})
export class TruncatedPieIconComponent implements OnInit {

  public RADIUS;

  public procent;

  public pic;
  
  public textcolor;
  
  public arrayWord = [];
  public text1;
  public text2;
  public text3;
  public space = ' ';

  @Input() public data: TruncPieWidget;

  @ViewChild('myCircle', {static:true}) myCircle: ElementRef;

  constructor() {}

  ngOnInit(){
    this.d3Circle(this.data, this.myCircle.nativeElement); 
  }

  public splitWord(word, space){
    this.arrayWord = word.split(space);
    this.text1 = this.arrayWord[0];
    this.text2 = this.arrayWord[1];
    this.text3 = this.arrayWord[2];
  }

  public dataById(index, item): number {
    return item.id;
  }

  private d3Circle(data, el): void {
   
    this.procent = ((data.count * 34)/100);

    const mass = [data.count - data.critical + this.procent, data.critical];

    let color: any;

    this.splitWord(data.name, this.space);
    
    const canvas = d3.select(el).append("svg")
      .attr("min-width", "200px")
      .attr("max-width", "500px")
      .attr("viewBox", "32 20 140 180")

    let group = canvas.append("g")
      .attr("transform", "translate(100 ,100)");
     

    if(data.critical === 0){
        color = d3.scaleOrdinal().range(["rgb(140,153,178)", "rgb(140,153,178)"]);
        this.RADIUS = 46;
    }else{
        color = d3.scaleOrdinal().range(["white", "orange"]);
        this.RADIUS = 46;
    }

    const arc = d3.arc().innerRadius(42).outerRadius(this.RADIUS);

    const pie = d3.pie().value((d) => {
      return d;
    }).sort(() => null);

    const arcs = group.selectAll(".arc").data(pie(mass)).enter().append("g").attr("class", "arc");
  
    arcs.append("path")
      .attr("d", arc)
    
      .attr("fill", (d) => color(d.index));

      if(data.critical === 0){
        this.pic = ('/assets/pic/' + data.image + '.svg');
      }else{
        this.pic = ('/assets/pic/' + data.image + 'act.svg');
      }


      let image = canvas.append("image")
      .attr("xlink:href", this.pic)
      .attr("height", "185px")
      .attr("width", "200px")
      .attr("x","0")
      .attr("y","0")

      let pie_back = canvas.append("image")
      .attr("xlink:href", "/assets/pic/test2.svg")
      .attr("height", "185px")
      .attr("width", "200px")
      .attr("x","0")
      .attr("fill", "rgb(27, 30, 39)")
      .attr("y","5");

      let positive = canvas.append("text")
      .attr("font-size", "11px")
      .attr("x","96")
      .attr("y","135")
      .attr("z-index", "100")
      .attr("fill", (data.critical === 0) ? 'rgb(140,153,178)' : 'white')
      .text(data.critical);

      let text = canvas.append("text")

      if(this.text3){
        text.append("tspan")
        .attr("fill", 'rgb(140,153,178)')
        .attr("font-size", "12px")
        .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
        .attr("x","70")
        .attr("y","160")
        .text(this.text1);

        text.append("tspan")
        .attr("fill", 'rgb(140,153,178)')
        .attr("font-size", "12px")
        .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
        .attr("x","60")
        .attr("y","170")
        .text(this.text2);

      text.append("tspan")
        .attr("fill", 'rgb(140,153,178)')
        .attr("font-size", "12px")
        .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
        .attr("x","70")
        .attr("y","170")
        .text(this.text3);
      
        }else if(this.text2 && (this.text2.length > this.text1.length)){
          
          text.append("tspan")
          .attr("fill", 'rgb(140,153,178)')
          .attr("font-size", "12px")
          .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
          .attr("x","70")
          .attr("y","160")
          .text(this.text1);
  
          text.append("tspan")
          .attr("fill", 'rgb(140,153,178)')
          .attr("font-size", "12px")
          .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
          .attr("x","60")
          .attr("y","170")
          .text(this.text2);

          } else if(this.text2 && (this.text2.length < this.text1.length)){
            text.append("tspan")
          .attr("fill", 'rgb(140,153,178)')
          .attr("font-size", "12px")
          .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
          .attr("x","50")
          .attr("y","160")
          .text(this.text1);
  
          text.append("tspan")
          .attr("fill", 'rgb(140,153,178)')
          .attr("font-size", "12px")
          .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
          .attr("x","80")
          .attr("y","170")
          .text(this.text2);
          }else{
            text.append("tspan")
            .attr("fill", 'rgb(140,153,178)')
            .attr("font-size", "12px")
            .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr("x","60")
            .attr("y","160")
            .text(this.text1);
          }

   
  } 
}
