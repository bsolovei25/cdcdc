import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'evj-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements OnInit {

  @Input() public items: {id: number, value: string}[] = [
    {
      id: 0,
      value: 'Да'
    },
    {
      id: 1,
      value: 'Нет'
    }
  ];

  public selectedValue = this.items[0];

  constructor(

  ) { }

  ngOnInit(): void {
  }

  changeUnit(event: MatSelectChange) {
    console.log(event);

  }

  public compareFn(a, b): boolean {
    return a?.id === b?.id;
  }

}
