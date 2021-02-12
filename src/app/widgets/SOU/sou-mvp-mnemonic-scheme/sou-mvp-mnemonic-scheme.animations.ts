import { animate, state, style, transition, trigger } from '@angular/animations';

export const animationsArray = [
    trigger('Branch', [
        state(
            'closed',
            style({
                height: 0,
                opacity: 0,
                overflow: 'hidden',
            })
        ),
        state(
            'opened',
            style({
                height: '110px',
                opacity: 1,
            })
        ),
        transition('closed => opened', animate('200ms ease-in')),
        transition('opened => closed', animate('200ms ease-out')),
    ]),
];
