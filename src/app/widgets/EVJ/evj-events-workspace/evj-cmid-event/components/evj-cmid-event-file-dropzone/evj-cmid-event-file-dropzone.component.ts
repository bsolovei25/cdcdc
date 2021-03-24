import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'evj-cmid-event-file-dropzone',
    templateUrl: './evj-cmid-event-file-dropzone.component.html',
    styleUrls: ['./evj-cmid-event-file-dropzone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvjCmidEventFileDropzoneComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
