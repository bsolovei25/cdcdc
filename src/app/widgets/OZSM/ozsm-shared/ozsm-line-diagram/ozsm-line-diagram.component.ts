import { Component, Input, OnInit } from '@angular/core';
import { ozsmModel } from '../../../../dashboard/models/OZSM/ozsm-line-diagram.model';

@Component({
  selector: 'evj-ozsm-line-diagram',
  templateUrl: './ozsm-line-diagram.component.html',
  styleUrls: ['./ozsm-line-diagram.component.scss']
})
export class OzsmLineDiagramComponent implements OnInit {
    @Input() item: ozsmModel;
  constructor() { }

  ngOnInit(): void {
  }

}
