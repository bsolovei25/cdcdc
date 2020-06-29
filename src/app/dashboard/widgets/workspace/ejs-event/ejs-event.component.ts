import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventsWorkspaceService } from '../../../services/widgets/events-workspace.service';

@Component({
    selector: 'evj-ejs-event',
    templateUrl: './ejs-event.component.html',
    styleUrls: ['./ejs-event.component.scss']
})
export class EjsEventComponent implements OnInit, OnDestroy {

    private linkInterval: any = null;

    constructor(private http: HttpClient, public ewService: EventsWorkspaceService) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        clearInterval(this.linkInterval);
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

    async iFrameModify(): Promise<void> {
        const stylesheet = await this.loadStylesheet();
        const variables = await this.loadVariables();
        const iFrame = frames['frame'];
        const doc = iFrame.contentDocument;
        doc.body.innerHTML += `<style>${variables}</style>`;
        doc.body.innerHTML += `<style>${stylesheet}</style>`;

        this.styleInput(doc);

        if (this.linkInterval) {
            clearInterval(this.linkInterval);
        }
        this.linkInterval = setInterval(() => this.addLinkTarget(doc), 1500);
    }

    styleInput(doc: HTMLDocument): void {
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

    addLinkTarget(doc: HTMLDocument): void {
        const linkList = doc.querySelectorAll('a');
        linkList.forEach((link) => {
            if (link.getAttribute('target') === 'ejsFrame') {
                return;
            }
            link.setAttribute('target', 'ejsFrame');
            link.setAttribute('href', 'http://localhost:4200/assets/mock/pages/d.html');
        });
    }
}

