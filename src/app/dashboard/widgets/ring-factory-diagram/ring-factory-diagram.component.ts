import { Component, OnInit, Inject } from '@angular/core';
import { NewUserSettingsService } from '../../services/new-user-settings.service';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'evj-ring-factory-diagram',
  templateUrl: './ring-factory-diagram.component.html',
  styleUrls: ['./ring-factory-diagram.component.scss']
})
export class RingFactoryDiagramComponent implements OnInit {

  public data = {
    id_0: { status: 'service'   },
    id_1: { status: 'available' },
    id_2: { status: 'reserved'  },
    id_3: { status: 'available' },
    id_4: { status: 'available' },
    id_5: { status: 'reserved'  },
    messages: {
        'available': 'Доступно для аренды',
        'reserved':  'Зарезервировано',
        'service':   'Доступно через 1-2 дня'
    }
};

  static itemCols = 16;
  static itemRows = 10;

  private subscription: Subscription;

  public title="test";
  public code;
  public units;
  public name;

  constructor(
    public widgetService: NewWidgetService,
    public serice: NewUserSettingsService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string

    ) {
      this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe(data => {
        this.title = data.title;
        this.code = data.code;
        this.units = data.units;
        this.name = data.name;

      }); 
  }

  ngOnInit() {  
  //  this.draw();
  }

  public draw(){
    const map = document.getElementById('my-map');
    const buildings:any = map.querySelectorAll('.st0');
  
  
    for (let item of buildings) {
        const id = item.getAttribute('data-item-id');
        const status = this.data[`id_${id}`].status;
    
        item.classList.add(`-${status}`);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
