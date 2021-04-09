import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { KpeTableComponent } from '../../kpe-table.component';
import { KpeTableService } from '../../services/kpe-table.service';

@Component({
  selector: 'evj-kpe-select-header',
  templateUrl: './kpe-select-header.component.html',
  styleUrls: ['./kpe-select-header.component.scss']
})
export class KpeSelectHeaderComponent implements OnInit {

  @Input() public items: {id: number, value: string}[] = [];
  @Input() public type: 'average' | 'instant' = 'average';

  public selectedValue = this.items[0];

  constructor(
    private kpeTableService: KpeTableService
  ) { }

  ngOnInit(): void {
  }

  changeUnit(event: MatSelectChange) {
    this.type === 'average' 
    ? this.kpeTableService.selectAverageUnit$.next(event.value)
    : this.kpeTableService.selectInstantUnit$.next(event.value);    
  }

  public compareFn(a, b): boolean {
    return a?.id === b?.id;
  }

}
