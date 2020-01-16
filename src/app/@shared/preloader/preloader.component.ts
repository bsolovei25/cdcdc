import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.scss'],
})
export class PreLoaderComponent implements OnInit {
    @Input() isHidden: boolean = false;
    isLoad: boolean = false;

    @Input() set isLoading(data) {
        if (data) {
            this.isLoad = data;
        } else {
            this.isHidden = true;
            setTimeout(() => {
                this.isLoad = data;
            }, 3000);
        }
    }

    constructor() {}

    ngOnInit() {}
}
