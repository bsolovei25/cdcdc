import {Component, OnDestroy, OnInit, Input, Output, Inject, Injector} from '@angular/core';
import {ManualInputService} from '../../services/manual-input.service';
import {HttpClient} from '@angular/common/http';
import {Machine_MI} from '../../models/manual-input.model';
import {Subscription} from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import {AppConfigService} from 'src/app/services/appConfigService';

@Component({
  selector: 'evj-manual-input',
  templateUrl: './manual-input.component.html',
  styleUrls: ['./manual-input.component.scss']
})

export class ManualInputComponent implements OnInit, OnDestroy {

  static itemCols = 30;
  static itemRows = 20;

  private subscription: Subscription;

  private subscribtion2: Subscription;

  title;

  constructor(
    public manualInputService: ManualInputService,
    public widgetService: NewWidgetService,
    private http: HttpClient,
    configService: AppConfigService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string
    ) {
      this.restUrl = configService.restUrl;
      this.isLoading = true;
      this.subscription = this.widgetService.getWidgetChannel(id).subscribe(data => {
        this.title = data.title;
      });
  }

  public isLoading: boolean;

  private restUrl: string;

  private Data: Machine_MI[] = [];

  private flag: boolean = true;


  ngOnInit() {
    this.showMock(this.isMock);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @Output()
  refresh() {
    this.Data = [];
  }

  setInitData() {
    // console.log(this.restUrl + '/api/mi/load/' + this.id);
    this.http.get(this.restUrl + '/api/mi/load/' + this.id)
      .subscribe((ref: Machine_MI[]) => {
      //  console.log(ref);
      //  console.log("init_rest");

        this.Data = this.manualInputService.LoadData(this.Data, ref);
      });
  }

  onButtonSave() {
    this.manualInputService.BtnSaveValues(this.Data);
   // console.log('buttonClick');
  }

  onChangeValue(id: string) {
    this.manualInputService.ChangeField(id, this.Data);
  }

  onUnfocusValue(id: string) {
    this.manualInputService.CheckLastValue(id, this.Data);
  }

  private wsConnect() {

    this.widgetService.getWidgetLiveDataFromWS(this.id, 'manual-input')
      .subscribe((ref) => {

          this.manualInputService.LoadData(this.Data, ref);
          //console.log("init");
        }
      );
  }
  wsDisconnect() {
    if (!this.subscribtion2) {
      return;
    }

    this.subscribtion2 = this.widgetService.getWidgetLiveDataFromWS(this.id, 'manual-input')
      .subscribe((ref) => {
          this.manualInputService.LoadData(this.Data, ref);
          //console.log("init");
        }
      );
  }

  showMock(show) {
    if (show){
      this.wsDisconnect();
    } else {
      this.setInitData();
      this.wsConnect();
    }
  }
}
