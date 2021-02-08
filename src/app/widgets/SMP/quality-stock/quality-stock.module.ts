import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualityStockComponent } from './quality-stock.component';
import { QualityStockCircleComponent } from './components/quality-stock-circle/quality-stock-circle.component';
import { QualityStockSecurityComponent } from './components/quality-stock-security/quality-stock-security.component';
import { SharedModule } from '../../../@shared/shared.module';

@NgModule({
    declarations: [QualityStockComponent, QualityStockCircleComponent, QualityStockSecurityComponent],
    imports: [CommonModule, SharedModule],
})
export class QualityStockModule {
    enterComponent = QualityStockComponent;
}
