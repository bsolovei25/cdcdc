import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOzsmCircleDiagram } from '../ozsm-circle-diagram/ozsm-circle-diagram.component';

@Component({
    selector: 'evj-ozsm-triple-diagram-card',
    templateUrl: './ozsm-triple-diagram-card.component.html',
    styleUrls: ['./ozsm-triple-diagram-card.component.scss'],
})
export class OzsmTripleDiagramCardComponent implements OnInit {
    public circleData: IOzsmCircleDiagram = {
        fact: 5208,
        plan: 5208,
        units: 'тн',
    };

    public data: any;

    constructor(private http: HttpClient) {}

    public ngOnInit(): void {
        this.mockDataConnect();
    }

    public async mockDataConnect(): Promise<any> {
        this.data = await this.http.get<any>('assets/mock/OZSM/equalizer-chart.json').toPromise();
        return this.data;
    }
}
