import { Component, OnDestroy, OnInit } from "@angular/core";
import { PopoverRef } from "@shared/components/popover-overlay/popover-overlay.ref";
import { IMenuItem } from "./evj-events-smpo-reasons-menu-item/evj-events-smpo-reasons-menu-item.component";
import { Subscription } from "rxjs";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

const DEBOUNCE_TIME = 300;

@Component({
  selector: 'evj-events-smpo-reasons-menu',
  templateUrl: './evj-events-smpo-reasons-menu.component.html',
  styleUrls: ['./evj-events-smpo-reasons-menu.component.scss']
})
export class EvjEventsSmpoReasonsMenuComponent implements OnInit, OnDestroy {
    public items: IMenuItem[];
    public selectedItems: Set<IMenuItem> = new Set();
    public searchInput: FormControl = new FormControl('');

    private subscriptions: Subscription[] = [];

    constructor(private popoverRef: PopoverRef) {
        this.popoverRef.overlay.backdropClick().subscribe(() => {
            this.close();
        });

        if (this.popoverRef.data) {
            this.items = this.popoverRef.data;
            this.selectedItems = new Set(this.items.filter((el) => el.isSelected));
        }
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.searchInput.valueChanges
                .pipe(distinctUntilChanged(), debounceTime(DEBOUNCE_TIME))
                .subscribe((query) => this.onSearch(query))
        );
    }

    public trackByIndex(index: number): number {
        return index;
    }

    public close(): void {
        this.popoverRef.close('backdropClick', null);
    }

    public toggleItem(item: IMenuItem): void {
        item.isSelected ? this.deselectItem(item) : this.selectItem(item);
    }

    public selectItem(item: IMenuItem): void {
        item.isSelected = true;
        this.selectedItems.add(item);
    }

    public deselectItem(item: IMenuItem): void {
        item.isSelected = false;
        this.selectedItems.delete(item);
    }

    public accept(): void {
        this.popoverRef.close('close', Array.from(this.selectedItems));
    }

    private onSearch(query: string): void {
        // Добавить получение данных из сервиса
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((x) => x.unsubscribe());
        this.subscriptions = null;
    }

}
