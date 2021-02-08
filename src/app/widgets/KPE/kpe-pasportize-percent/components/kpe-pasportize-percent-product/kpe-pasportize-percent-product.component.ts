import { Component, Input, OnInit } from '@angular/core';
import { IKpePasportizeProduct } from '../../kpe-pasportize-percent.component';

@Component({
    selector: 'evj-kpe-pasportize-percent-product',
    templateUrl: './kpe-pasportize-percent-product.component.html',
    styleUrls: ['./kpe-pasportize-percent-product.component.scss'],
})
export class KpePasportizePercentProductComponent implements OnInit {
    @Input() data: IKpePasportizeProduct;
    constructor() {}

    ngOnInit(): void {}
}
