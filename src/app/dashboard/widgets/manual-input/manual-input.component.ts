import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {ManualInputService} from '../../services/manual-input.service';
import {WidgetsService} from '../../services/widgets.service';
import {HttpClient} from '@angular/common/http';
import {Machine_MI} from '../../models/manual-input.model';
import {environment} from '../../../../environments/environment';
import {Subscription} from 'rxjs';

@Component({
  selector: 'evj-manual-input',
  templateUrl: './manual-input.component.html',
  styleUrls: ['./manual-input.component.scss']
})
export class ManualInputComponent implements OnInit {

  constructor(public manualInputService: ManualInputService, private widgetsService: WidgetsService, private http: HttpClient) {
    this.restUrl = environment.restUrl;
    this.id = '742c88e4-048b-11ea-98c3-380025fb9022';
    this.name = 'Режимный лист дневной';
    this.isLoading = true;
    this.isMock = true;
  }

  public isLoading: boolean;

  private restUrl: string;

  @Input() public isMock: boolean;

  @Input() public id: string;

  @Input() public name: string;

  private Data: Machine_MI[] = [];

  private subscribtion: Subscription;

  ngOnInit() {
    console.log("init mi");
  }

  setInitData() {
    console.log(this.restUrl + '/api/mi/load/' + this.id);
    this.http.get(this.restUrl + '/api/mi/load/' + this.id)
      .subscribe((ref: Machine_MI[]) => {
        console.log(ref);
        this.Data = this.manualInputService.LoadData(this.Data, ref);
      });
  }

  onButtonSave() {
    this.manualInputService.BtnSaveValues(this.Data);
    console.log('buttonClick');
  }

  onChangeValue(id: string) {
    this.manualInputService.ChangeField(id, this.Data);
  }

  onUnfocusValue(id: string) {
    this.manualInputService.CheckLastValue(id, this.Data);
  }

  wsConnect() {
    this.widgetsService.getWidgetLiveDataFromWS(this.id, 'manual-input')
      .subscribe((ref) => {
          this.manualInputService.LoadData(this.Data, ref);
          console.log("init");
        }
      );
  }
  wsDisconnect() {
    if (!this.subscribtion) {
      return;
    }
    this.subscribtion = this.widgetsService.getWidgetLiveDataFromWS(this.id, 'manual-input')
      .subscribe((ref) => {
          this.manualInputService.LoadData(this.Data, ref);
          console.log("init");
        }
      );
  }


  @Input()
  set showMock(show) {
    this.isMock = show;
    if (this.isMock) {
      this.wsDisconnect();
    } else {
      this.setInitData();
      this.wsConnect();
    }
  }
}
