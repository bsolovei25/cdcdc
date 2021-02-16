import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-stats',
    templateUrl: './sou-mvp-mnemonic-scheme-stats.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-stats.component.scss'],
})
export class SouMvpMnemonicSchemeStatsComponent implements OnInit {
    @Input() popupData: any;
    @Input() chosenSetting: any;
    @Output() closeWindow: EventEmitter<unknown> = new EventEmitter<unknown>();

    constructor() {}

    ngOnInit(): void {}
}
