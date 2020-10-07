import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { IOilFilter } from 'src/app/dashboard/models/oil-operations';
import { PopoverRef} from '@shared/components/popover-overlay/popover-overlay.ref';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IOilFilterInput {
    title: string;
    data: IOilFilter[];
}

@Component({
  selector: 'evj-oil-operations-filter',
  templateUrl: './oil-operations-filter.component.html',
  styleUrls: ['./oil-operations-filter.component.scss']
})
export class OilOperationsFilterComponent implements OnInit {
  @Output()
  public closeFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public activeItemId: number;

  public filterTitle: string;

  constructor(
      private popoverRef: PopoverRef,
      @Inject(MAT_DIALOG_DATA) public data: IOilFilterInput,
  ) {
      this.popoverRef.overlay.backdropClick().subscribe(() => {
          this.popoverRef.close('backdropClick', null);
      });
      if (this.popoverRef.data) {
          this.data = this.popoverRef.data.data;
          this.filterTitle = this.popoverRef.data.title;
      }
  }

  public ngOnInit(): void {
  }

  public onOptionSelect(item: IOilFilter): void {
    if (this.activeItemId === item.id) {
      this.activeItemId = null;
    } else {
      this.activeItemId = item.id;
    }
  }

  public close(): void {
      this.popoverRef.close('close', null);
  }

  public onSaveClick(): void {
    this.closeFilter.emit(false);
  }
}
