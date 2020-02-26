import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'evj-admin-worker-settings',
    templateUrl: './admin-worker-settings.component.html',
    styleUrls: ['./admin-worker-settings.component.scss'],
})
export class AdminWorkerSettingsComponent implements OnInit {
    public searchIcon: string = 'assets/icons/search-icon.svg';

    constructor() {}

    public ngOnInit(): void {}
}
