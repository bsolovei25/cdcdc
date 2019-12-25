import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "evj-preloader",
    templateUrl: "./preloader.component.html",
    styleUrls: ["./preloader.component.scss"]
})
export class PreLoaderComponent implements OnInit {

    @Input() isHidden: boolean = false;
    @Input() isLoading: boolean = false;

    constructor() { }

    ngOnInit() { }

}
