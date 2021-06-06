import { ChangeDetectionStrategy, Component, Input, OnChanges } from "@angular/core";
import { IFactorItems } from "../../cmid-factor-analysis.component";

@Component({
    selector: 'cmid-factor-analysis-items',
    templateUrl: './cmid-factor-analysis-items.component.html',
    styleUrls: ['./cmid-factor-analysis-items.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmidFactorAnalysisItemsComponent implements OnChanges  {
    @Input() hideEmptyItems: boolean;
    @Input() data: IFactorItems[];
    
    public dataHeader;
    public dataContent: IFactorItems[]; 

    ngOnChanges(): void {
        [this.dataHeader, ...this.dataContent] = this.data;
    }

    public filter = li => { 
        if(!this.hideEmptyItems) return true;

        let needShowSubItem = li.list && li.list.some(this.filter);
        if(needShowSubItem) return true;

        let needShow = li.shield !== '-' || li.shield_set !== '-' || li.eco_leaf !== '-' || li.timer_return !== '-';
        if(needShow) return true;
        return needShow;
    }
}