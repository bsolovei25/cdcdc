import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'evj-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    fullscreen: boolean = false;

    constructor() { }

    ngOnInit() {
        document.addEventListener('fullscreenchange', () => {
            this.fullscreen = document.fullscreenElement ? true : false;
        });
    }
}
