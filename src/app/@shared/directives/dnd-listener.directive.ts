import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[evjDndListener]'
})
export class DndListenerDirective {
    @Output() onDragOverEvent: EventEmitter<Event> = new EventEmitter<Event>();

    @Output() onDragLeaveEvent: EventEmitter<Event> = new EventEmitter<Event>();

    @Output() onDropEvent: EventEmitter<Event> = new EventEmitter<Event>();

    @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent): void {
        this.onDragOverEvent.emit(evt);
        evt.preventDefault();
        evt.stopPropagation();
    }

    @HostListener('dragleave', ['$event']) onDragLeave(event: Event): void {
        this.onDragLeaveEvent.emit(event);
        event.preventDefault();
        event.stopPropagation();
    }

    @HostListener('drop', ['$event']) onDrop(event: Event): void {
        event.preventDefault();
        this.onDropEvent.emit(event);
    }

}
