import { Component, OnInit, Input } from '@angular/core';

interface IInputAps {
    title: string;
    value: string;
}

export interface IViewWorkflowWindow {
    title: string;
    valueNearTitle: string;
    inputs: IInputAps[];
    acceptFunction?: () => void;
    closeFunction?: () => void;
}

@Component({
    selector: 'evj-view-workflow-window',
    templateUrl: './view-workflow-window.component.html',
    styleUrls: ['./view-workflow-window.component.scss'],
})
export class ViewWorkflowWindowComponent implements OnInit {
    @Input() public info: IViewWorkflowWindow;

    constructor() {}

    public ngOnInit(): void {}

    public accept(): void {
        try {
            this.info?.acceptFunction();
        } catch (err) {
            console.warn(err);
        } finally {
            this.info.closeFunction();
        }
    }

    public cancel(): void {
        try {
            this.info.closeFunction();
        } catch (err) {
            console.warn(err);
        } finally {
            this.info.closeFunction();
        }
    }
}
