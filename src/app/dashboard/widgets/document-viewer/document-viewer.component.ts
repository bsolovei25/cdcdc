import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evj-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {

    public src: string = 'https://vk.com/away.php?to=https%3A%2F%2Fcloud.mail.ru%2Fpublic%2FNAzt%2FFJpjdhFpZ%2F3%2520%25D1%2581%25D0%25B5%25D0%25BC%25D0%25B5%25D1%2581%25D1%2582%25D1%2580%2F%25D0%259F%25D0%25BE%25D0%25BB%25D0%25B8%25D1%2582%25D0%25BE%25D0%25BB%25D0%25BE%25D0%25B3%25D0%25B8%25D1%258F%2FPolitologia_Albom_skhem_Makarenkov_E_V_Sushkov.pdf&cc_key=';
    public page: number = 2;
    public totalPages: number;

    constructor() { }

    ngOnInit(): void {
        setTimeout(() => this.src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf', 5000);
    }

    public afterLoadComplete(pdfData: any): void {
        console.log(pdfData);
        this.totalPages = pdfData.numPages;
    }
}
