import { Component, OnInit } from '@angular/core';
import { Widgets } from '../../models/widget.model';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';

@Component({
  selector: 'evj-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public checkClick = false;

  public checkData = false;

  public typeWidgetChoose;

  private subscription: Subscription;

  widgets: Widgets[];

  public newArrayType = [];

  constructor(
    public widgetService: NewWidgetService,
  ) { 
    this.subscription = this.widgetService.getAvailableWidgets().subscribe(dataW => {
      this.widgets = dataW;
      for(let i of this.widgets){
        this.newArrayType.push(i.widgetType);
      }
      debugger
    });
  }

  ngOnInit() {
  }

  public checkInput(){
    this.checkClick = !this.checkClick;
  }

  public onSearch(data: any) {
    this.typeWidgetChoose = data;
    this.checkData = true;
  }

  public onCheck(data: any) {
    if(data === true){
      this.checkClick = true;
    }else{
      this.checkClick = false;
    }
    console.log(data);
  }


}
