import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UserSettingsService } from '../../../../services/user-settings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IGroupScreens } from '../group-selector.component';

@Component({
    selector: 'evj-group-selector-overlay',
    templateUrl: './group-selector-overlay.component.html',
    styleUrls: ['./group-selector-overlay.component.scss'],
})
export class GroupSelectorOverlayComponent implements OnInit {
    public iconForm: FormGroup = new FormGroup({
        icon: new FormControl(),
    });
    private iconForm$: Observable<any> = this.iconForm.valueChanges;
    @Output() changed: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(private userSettingsService: UserSettingsService) {}

    ngOnInit(): void {
        // this.userSettingsService.getIcons();
        // this.iconForm$.subscribe(item => {
        //     console.log(item);
        //     return item;
        // });
    }

    public getFile(event: FileList): void {
        const file: File = event?.[0];
        this.userSettingsService.addIcons(file);
    }

    public closeOverlay(): void {
        this.changed.emit(false);
    }
}
