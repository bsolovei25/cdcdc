import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'evj-ejs-event',
    templateUrl: './ejs-event.component.html',
    styleUrls: ['./ejs-event.component.scss']
})
export class EjsEventComponent implements OnInit {

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
    }

    async loadStylesheet(): Promise<string> {
        return await this.http
            .get<string>('theme/iframe-style.scss', {responseType: 'text' as 'json'})
            .toPromise();
    }
    async loadVariables(): Promise<string> {
        return await this.http
            .get<string>('theme/variables.scss', {responseType: 'text' as 'json'})
            .toPromise();
    }

    async changeStyles(): Promise<void> {
        const stylesheet = await this.loadStylesheet();
        const variables = await this.loadVariables();
        const iFrame = frames['frame'];
        const doc = iFrame.contentDocument;
        doc.body.innerHTML += `<style>${variables}</style>`;
        doc.body.innerHTML += `<style>${stylesheet}</style>`;

        // doc.getElementById('id').on('click', () => {
        //     console.log('click event');
        // });

        const inputList = doc.querySelectorAll('input');
        inputList.forEach((el) => el.style.cssText =
            'background: var(--color-bg-card) !important;' +
            'border: none !important;' +
            'color: white !important;' +
            'box-shadow: none !important;'
        );

        const textareaList = doc.querySelectorAll('textarea');
        textareaList.forEach((el) => el.style.cssText =
            'background: var(--color-bg-card) !important;' +
            'border: none !important;' +
            'color: white !important;'
        );
    }
}
