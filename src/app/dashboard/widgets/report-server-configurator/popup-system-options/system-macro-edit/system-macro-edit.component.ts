import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'evj-system-macro-edit',
  templateUrl: './system-macro-edit.component.html',
  styleUrls: ['./system-macro-edit.component.scss']
})
export class SystemMacroEditComponent implements OnInit, AfterViewInit {
  @Output() public result: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('macroTable') public block: ElementRef;

  data = [
    { name: 'test1' },
    { name: 'test2' },
    { name: 'test3' },
    { name: 'test4' },
    { name: 'test5' },
    { name: 'test6' },
    { name: 'test7' },
    { name: 'test8' },
    { name: 'test9' },
    { name: 'test10' },
  ];

  public blockOut: any = [];

  public itemChoose: number;

  public addItem: boolean = false;
  public nameItem: string;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.blockNeed();
  }

  clickItem(item) {
    this.itemChoose = item;
  }

  addItemBlock() {
    this.addItem = true;
  }

  addItemAccept() {
    this.addItem = false;
  }

  editItem(item) {
    item.edit = !item.edit;
  }

  close() {
    this.result.emit(true);
  }

  save() {

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  blockNeed(): void {
    if (this.data) {
      const heightTemplate = this.data.length * 40;
      const heightOut = (this.block.nativeElement.clientHeight - heightTemplate) / 40;
      for (let i = 0; i < heightOut - 1; i++) {
        this.blockOut.push(i);
      }
    }
  }

}
