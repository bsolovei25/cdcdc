import { Component } from '@angular/core';

@Component({
    selector: 'evj-ui-elements',
    templateUrl: './ui-elements.component.html',
    styleUrls: ['./ui-elements.component.scss'],
})
export class UiElementsComponent {
    // snackBar
    snackBar(text: string = 'Выполнено', durection: number = 3000) {
        let snackBar = document.getElementById('snackbar');
        snackBar.className = 'show';
        snackBar.innerText = text;
        setTimeout(function () {
            snackBar.className = snackBar.className.replace('show', '');
        }, durection);
    }
    //-----------
}
