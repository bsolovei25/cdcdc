import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'evj-aps-expandable-bottom-frame',
    templateUrl: './expandable-bottom-frame.component.html',
    styleUrls: ['./expandable-bottom-frame.component.scss'],
})
export class ExpandableBottomFrameComponent implements OnInit {
    ngOnInit(): void {}

    public onClick(): void {
        console.log('click');
    }
}
