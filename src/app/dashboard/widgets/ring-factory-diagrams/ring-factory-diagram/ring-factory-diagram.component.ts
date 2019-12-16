import { Component, OnInit, Inject, AfterViewInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { RingFactoryWidget } from 'src/app/dashboard/models/widget.model';
import {DOCUMENT} from "@angular/common";
import { map } from 'rxjs/operators';
import 'leader-line';

declare var LeaderLine: any;
declare var d3: any;

@Component({
  selector: 'evj-ring-factory-diagram',
  templateUrl: './ring-factory-diagram.component.html',
  styleUrls: ['./ring-factory-diagram.component.scss']
})
export class RingFactoryDiagramComponent implements OnInit, AfterViewInit {

  @ViewChild('ringFactory', {static:false}) ringFactory: ElementRef;

  @ViewChild('test1', {static:false}) test1: ElementRef;
  @ViewChild('test2', {static:false}) test2: ElementRef;

  @Input() public data: RingFactoryWidget;
   
  public stateRing;
  
  public dataStyle = {
    id_0: { status: 'critical' },
    id_1: { status: 'notCritical' },
  };

  constructor(@Inject(DOCUMENT) private document, private renderer: Renderer2) { 
    
  }
  
  ngOnInit(){
    this.stateRing = this.data.buttons.length;
  }
  ngAfterViewInit(){
    //new LeaderLine(this.test1.nativeElement, this.test2.nativeElement);
    this.draw(this.ringFactory.nativeElement);
  }

  public drawLine(el1, el2){
     return new LeaderLine(el1, el2);
  }

  public draw(el){
    const svg = d3.select(el) 
    svg.append("image")
        .attr("xlink:href","/assets/pic/Icons3D/"+this.data.typeFabric+".png")
        .attr("height", "250px")
        .attr("pointer-events","none")
        .attr("width", "250px")
        .attr("x","170")
        .attr("y","270");
    
    if(this.data.buttons.length){
      const pie:any = el.querySelectorAll('.st0');
      const iconpie:any = el.querySelectorAll('.st1');
      for(let dat of this.data.buttons){
        let datButton = dat.typeButton.toString();
        for (let item of pie){
          let id = item.getAttribute('data-item-id');
          if(datButton === id){
            let status = this.dataStyle['id_0'].status;
            item.classList.add(`-${status}`);
            if(id === "0"){
              svg.append("image")
                .attr("xlink:href","/assets/pic/borderimg.png")
                .attr("height", "250px")
                .attr("width", "250px")
                .attr("x","166")
                .attr("y","400");

              svg.append("text")
                .attr("font-size", "8px")
                .attr("x","160")
                .attr("y","400")
                .attr("fill", "rgb(97,101,128)")
                .text("Критичные /", dat.critical);
              
            }else if(id === "1"){
              svg.append("image")
                .attr("xlink:href","/assets/pic/borderimg.png")
                .attr("height", "250px")
                .attr("width", "250px")
                .attr("x","40")
                .attr("y","190");

              svg.append("text")
                .attr("font-family"," font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr("font-size", "36px")
                .attr("x","70")
                .attr("y","280")
                .attr("fill", "orange")
                .text("-" + dat.critical);

              svg.append("text")
                .attr("font-family"," font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr("font-size", "30px")
                .attr("x","140")
                .attr("y","280")
                .attr("fill", "gray")
                .text("%");
              
              svg.append("text")
                .attr("font-size", "36px")
                .attr("x","200")
                .attr("y","280")
                .attr("fill", "white")
                .text("+" + dat.notcritical);

            }else if(id === "2"){
              svg.append("image")
                .attr("xlink:href","/assets/pic/borderimg.png")
                .attr("height", "250px")
                .attr("width", "250px")
                .attr("x","-550")
                .attr("y","190")
                .attr("transform", "scale(-1,1)");

                svg.append("text")
                .attr("font-family"," font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr("font-size", "36px")
                .attr("x","330")
                .attr("y","280")
                .attr("fill", "orange")
                .text("-" + dat.critical);

              svg.append("text")
                .attr("font-family"," font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr("font-size", "30px")
                .attr("x","400")
                .attr("y","280")
                .attr("fill", "gray")
                .text("%");
              
              svg.append("text")
                .attr("font-size", "36px")
                .attr("x","470")
                .attr("y","280")
                .attr("fill", "white")
                .text("+" + dat.notcritical);

            }else if(id === "3"){
              svg.append("image")
                .attr("xlink:href","/assets/pic/borderimg.png")
                .attr("height", "250px")
                .attr("width", "250px")
                .attr("x","366")
                .attr("y","300");

            }else if(id === "4"){
              svg.append("image")
                .attr("xlink:href","/assets/pic/borderimg.png")
                .attr("height", "250px")
                .attr("width", "250px")
                .attr("x","-550")
                .attr("y","-680")
                .attr("transform","scale(-1)");

                svg.append("text")
                .attr("font-family"," font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr("font-size", "36px")
                .attr("x","330")
                .attr("y","620")
                .attr("fill", "orange")
                .text("-" + dat.critical);

              svg.append("text")
                .attr("font-family"," font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr("font-size", "30px")
                .attr("x","400")
                .attr("y","620")
                .attr("fill", "gray")
                .text("%");
              
              svg.append("text")
                .attr("font-size", "36px")
                .attr("x","470")
                .attr("y","620")
                .attr("fill", "white")
                .text("+" + dat.notcritical);

            }else if(id === "5"){
              svg.append("image")
                .attr("xlink:href","/assets/pic/borderimg.png")
                .attr("height", "250px")
                .attr("width", "250px")
                .attr("x","45")
                .attr("y","-680")
                .attr("transform","scale(1,-1)");

                svg.append("text")
                .attr("font-family"," font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr("font-size", "36px")
                .attr("x","70")
                .attr("y","620")
                .attr("fill", "orange")
                .text("-" + dat.critical);

              svg.append("text")
                .attr("font-family"," font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr("font-size", "30px")
                .attr("x","140")
                .attr("y","620")
                .attr("fill", "gray")
                .text("%");
              
              svg.append("text")
                .attr("font-size", "36px")
                .attr("x","200")
                .attr("y","620")
                .attr("fill", "white")
                .text("+" + dat.notcritical);

            }
          }else{
            let status = this.dataStyle['id_1'].status;
            item.classList.add(`-${status}`);
          }
       
       //   const line = new LeaderLine(info, item);
        }
        for (let item of iconpie){
          let id = item.getAttribute('data-item-id');
          if(datButton === id){
            let status = this.dataStyle['id_0'].status;
            item.classList.add(`-${status}`);
          }else{
            let status = this.dataStyle['id_1'].status;
            item.classList.add(`-${status}`);
          }
        }
      }
    }else{
     
    }
  }
}
