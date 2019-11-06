import { Component,  OnInit } from '@angular/core';
import {ManualInputService} from '../../services/manual-input.service';

@Component({
  selector: 'evj-manual-input',
  templateUrl: './manual-input.component.html',
  styleUrls: ['./manual-input.component.scss']
})
export class ManualInputComponent implements OnInit {

  constructor(private manualInputService: ManualInputService) { }

  public isLoading: boolean;

  ngOnInit() {
    this.manualInputService.GetData().subscribe(() => {
      this.isLoading = false;
      this.manualInputService.testInit();
      console.log(this.manualInputService.RestAnswer);
    }, err => { console.log(err); });
  }

  onButtonSave() {
    this.manualInputService.SaveValues();
    console.log('buttonClick');
  }

  onChangeValue(id: string) {
    this.manualInputService.ChangeField(id);
  }

  onUnfocusValue(id: string) {
    this.manualInputService.CheckLastValue(id);
  }
}
