import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { IOilFilter } from 'src/app/dashboard/models/oil-operations';
import { PopoverRef} from '@shared/components/popover-overlay/popover-overlay.ref';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'evj-oil-operations-filter',
  templateUrl: './oil-operations-filter.component.html',
  styleUrls: ['./oil-operations-filter.component.scss']
})
export class OilOperationsFilterComponent implements OnInit {
  // @Input() public data: IOilFilter[];
  @Output() public closeFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public data1: IOilFilter[] = [
      {
          id: 1,
          name: 'Мазут'
      },
      {
          id: 2,
          name: 'Мазут'
      },
      {
          id: 3,
          name: 'Мазут'
      },
      {
          id: 4,
          name: 'Мазут'
      },
      {
          id: 5,
          name: 'Мазут'
      }
  ];

  public activeItemId: number;

  constructor(
      private popoverRef: PopoverRef,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
      this.popoverRef.overlay.backdropClick().subscribe(() => {
          this.popoverRef.close('backdropClick', null);
      });
      if (this.popoverRef.data) {
          // this.filesToUpload = this.popoverRef.data;
      }
  }

  ngOnInit(): void {
  }

  active(item: IOilFilter): void {
    if (this.activeItemId === item.id) {
      this.activeItemId = null;
    } else {
      this.activeItemId = item.id;
    }
  }

  exit(): void {
    this.closeFilter.emit(false);
  }

  save(): void {
    this.closeFilter.emit(false);
  }

}
