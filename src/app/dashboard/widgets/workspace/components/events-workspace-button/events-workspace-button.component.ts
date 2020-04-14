import { Component, OnInit, Input } from '@angular/core';

type EventsButton = 'escalate' | 'close' | 'tools';

@Component({
    selector: 'evj-events-workspace-button',
    templateUrl: './events-workspace-button.component.html',
    styleUrls: ['./events-workspace-button.component.scss'],
})
export class EventsWorkspaceButtonComponent implements OnInit {
    @Input() public status: EventsButton;

    public readonly text: { [key in EventsButton]: string } = {
        escalate: 'Эскалировать выше',
        close: 'Закрыть карточку',
        tools: 'Карточка оборудования',
    };
    public readonly iconSrc: { [key in EventsButton]: string } = {
        escalate: 'assets/icons/widgets/workspace/smotr/escalate.svg',
        close: 'assets/icons/widgets/workspace/smotr/close-card.svg',
        tools: 'assets/icons/widgets/workspace/smotr/tools-card.svg',
    };

    constructor() {}

    public ngOnInit(): void {}
}
