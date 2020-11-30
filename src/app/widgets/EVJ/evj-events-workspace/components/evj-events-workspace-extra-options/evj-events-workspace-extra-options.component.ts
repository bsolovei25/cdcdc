import { Component, Input, OnInit } from '@angular/core';
import { IExtraOptionsWindow } from '../../../../../dashboard/models/EVJ/events-widget';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';

@Component({
    selector: 'evj-evj-events-workspace-extra-options',
    templateUrl: './evj-events-workspace-extra-options.component.html',
    styleUrls: ['./evj-events-workspace-extra-options.component.scss']
})
export class EvjEventsWorkspaceExtraOptionsComponent implements OnInit {
    @Input() public info: IExtraOptionsWindow;

    constructor(
        public ewService: EventsWorkspaceService
    ) {
    }

    ngOnInit(): void {
    }

}
