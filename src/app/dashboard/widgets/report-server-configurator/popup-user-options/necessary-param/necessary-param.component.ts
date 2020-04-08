import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evj-necessary-param',
  templateUrl: './necessary-param.component.html',
  styleUrls: ['./necessary-param.component.scss']
})
export class NecessaryParamComponent implements OnInit {

  public isRepInput: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  onShowOptions(item): void {
    item.open = !item.open;
  }

  changeSwap(item){

  }

  saveReport(){

  }

}
