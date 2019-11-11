import { Component,  OnInit, OnDestroy } from '@angular/core';
import {ManualInputService} from '../../services/manual-input.service';
import {WidgetsService} from '../../services/widgets.service';
import {HttpClient} from '@angular/common/http';
import {Machine_MI} from '../../models/manual-input.model';

@Component({
  selector: 'evj-manual-input',
  templateUrl: './manual-input.component.html',
  styleUrls: ['./manual-input.component.scss']
})
export class ManualInputComponent implements OnInit {

  constructor(private manualInputService: ManualInputService, private widgetsService: WidgetsService, private http: HttpClient) {
  }

  public isLoading: boolean;

  ngOnInit() {
    this.http.get('https://localhost:5001/api/mi_init')
      .subscribe((ref: Machine_MI[]) => {
        console.log(ref);
        this.manualInputService.LoadData(ref);
      });
  }

  onButtonSave() {
    this.manualInputService.BtnSaveValues();
    console.log('buttonClick');
  }

  onChangeValue(id: string) {
    this.manualInputService.ChangeField(id);
  }

  onUnfocusValue(id: string) {
    this.manualInputService.CheckLastValue(id);
  }
}
