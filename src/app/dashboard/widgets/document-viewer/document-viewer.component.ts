import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evj-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {

    // public readonly src: string = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    public readonly src: string = 'https://cloud.mail.ru/public/NAzt/FJpjdhFpZ/3%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F/Politologia_Albom_skhem_Makarenkov_E_V_Sushkov.pdf';
    public page: number = 2;
    public totalPages: number;

    constructor() { }

    ngOnInit(): void {
    }

    public afterLoadComplete(pdfData: any): void {
        console.log(pdfData);
        this.totalPages = pdfData.numPages;
    }
}
